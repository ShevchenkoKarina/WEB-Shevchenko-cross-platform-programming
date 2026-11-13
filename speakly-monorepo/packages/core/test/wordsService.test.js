import { test } from "node:test";
import assert from "node:assert/strict";
import { WordsService } from "../wordsService.js";
import { MemoryStorageAdapter } from "../storageAdapter.js";
import { ERROR_EMPTY } from "../wordValidation.js";

const FIXED_NOW = new Date("2026-11-03T10:00:00.000Z");

function createService(initialWords = []) {
    const adapter = new MemoryStorageAdapter(initialWords);
    return { adapter, service: new WordsService(adapter, { now: () => FIXED_NOW }) };
}

test("add зберігає слово в адаптері", async () => {
    const { adapter, service } = createService();
    const result = await service.add("  apple ");
    assert.equal(result.ok, true);
    assert.equal(result.word.word, "apple");
    assert.equal((await adapter.load()).length, 1);
});

test("add не зберігає некоректне слово й повертає повідомлення про помилку", async () => {
    const { adapter, service } = createService();
    assert.deepEqual(await service.add("   "), { ok: false, error: ERROR_EMPTY });
    assert.equal((await adapter.load()).length, 0);
});

test("add видає унікальні id навіть за однакового часу", async () => {
    const { service } = createService();
    const first = await service.add("one");
    const second = await service.add("two");
    assert.notEqual(first.word.id, second.word.id);
});

test("remove видаляє слово за id", async () => {
    const { service } = createService([
        { id: 1, word: "one" },
        { id: 2, word: "two" },
    ]);
    assert.deepEqual(await service.remove(1), { ok: true });
    assert.deepEqual((await service.list()).map((item) => item.id), [2]);
});

test("remove повідомляє, якщо слова немає", async () => {
    const { service } = createService([{ id: 1, word: "one" }]);
    const result = await service.remove(99);
    assert.equal(result.ok, false);
    assert.equal(result.error, "Слово не знайдено.");
});

test("list повертає слова від новіших до старіших і підтримує пошук", async () => {
    const { service } = createService([
        { id: 1, word: "apple", createdAt: "2026-01-01T00:00:00.000Z" },
        { id: 2, word: "cat", createdAt: "2026-06-01T00:00:00.000Z" },
    ]);
    assert.deepEqual((await service.list()).map((item) => item.id), [2, 1]);
    assert.deepEqual((await service.list("app")).map((item) => item.id), [1]);
});

test("list ігнорує пошкоджені записи в сховищі", async () => {
    const { service } = createService([{ id: 1, word: "apple" }, { id: 2 }, null]);
    assert.deepEqual((await service.list()).map((item) => item.id), [1]);
});