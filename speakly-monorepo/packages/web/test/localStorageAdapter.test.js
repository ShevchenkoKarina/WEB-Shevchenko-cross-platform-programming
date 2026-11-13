// Тести веб-адаптера. Замість localStorage (його немає в Node.js)
// підставляємо простий об'єкт з методами getItem і setItem.

import { test } from "node:test";
import assert from "node:assert/strict";
import { WordsService } from "@speakly/core";
import { LocalStorageAdapter } from "../localStorageAdapter.js";

function createFakeStorage() {
    const data = {};
    return {
        data,
        getItem: (key) => (key in data ? data[key] : null),
        setItem: (key, value) => {
            data[key] = String(value);
        },
    };
}

test("load повертає порожній масив, якщо сховище порожнє", async () => {
    const adapter = new LocalStorageAdapter(createFakeStorage());

    assert.deepEqual(await adapter.load(), []);
});

test("save записує JSON, а load читає його назад", async () => {
    const storage = createFakeStorage();
    const adapter = new LocalStorageAdapter(storage);
    const words = [{ id: 1, word: "laptop", createdAt: "2026-11-13T10:00:00.000Z" }];

    await adapter.save(words);

    const rawValues = Object.values(storage.data);
    assert.equal(rawValues.length, 1);
    assert.deepEqual(JSON.parse(rawValues[0]), words);
    assert.deepEqual(await adapter.load(), words);
});

test("load повертає [] для пошкодженого JSON та для не-масиву", async () => {
    const storage = createFakeStorage();
    const adapter = new LocalStorageAdapter(storage);
    await adapter.save([{ id: 1, word: "laptop" }]);
    const key = Object.keys(storage.data)[0];

    storage.data[key] = "{broken json";
    assert.deepEqual(await adapter.load(), []);

    storage.data[key] = "{}";
    assert.deepEqual(await adapter.load(), []);
});

test("адаптер працює зі спільним WordsService", async () => {
    const service = new WordsService(new LocalStorageAdapter(createFakeStorage()));

    const result = await service.add("phone");
    const words = await service.list();

    assert.equal(result.ok, true);
    assert.equal(words.length, 1);
    assert.equal(words[0].word, "phone");
});