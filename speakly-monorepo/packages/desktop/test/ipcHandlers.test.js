// Тести обробників головного процесу. Electron не потрібен:
// сервіс працює з MemoryStorageAdapter із ядра.

import { test } from "node:test";
import assert from "node:assert/strict";
import { ERROR_EMPTY, MemoryStorageAdapter, WordsService } from "@speakly/core";
import { createHandlers } from "../ipcHandlers.js";

function createTestHandlers() {
    return createHandlers(new WordsService(new MemoryStorageAdapter()));
}

test("add і list: слово з'являється з полем dateLabel", async () => {
    const handlers = createTestHandlers();

    const result = await handlers.add("laptop");
    const words = await handlers.list("");

    assert.equal(result.ok, true);
    assert.equal(words.length, 1);
    assert.equal(words[0].word, "laptop");
    assert.match(words[0].dateLabel, /^\d{2}\.\d{2}\.\d{4}$/);
});

test("add повертає помилку для порожнього та нетекстового значення", async () => {
    const handlers = createTestHandlers();

    const empty = await handlers.add("   ");
    const notString = await handlers.add(123);
    const nothing = await handlers.add(null);

    assert.equal(empty.ok, false);
    assert.equal(empty.error, ERROR_EMPTY);
    assert.equal(notString.ok, false);
    assert.equal(nothing.ok, false);
    assert.deepEqual(await handlers.list(""), []);
});

test("list ігнорує запит неправильного типу, а рядковий запит фільтрує", async () => {
    const handlers = createTestHandlers();
    await handlers.add("apple");
    await handlers.add("banana");

    assert.equal((await handlers.list(123)).length, 2);
    assert.equal((await handlers.list("APP")).length, 1);
});

test("remove приймає id як число або рядок", async () => {
    const handlers = createTestHandlers();
    const first = await handlers.add("apple");
    const second = await handlers.add("banana");

    const byString = await handlers.remove(String(first.word.id));
    const byNumber = await handlers.remove(second.word.id);

    assert.equal(byString.ok, true);
    assert.equal(byNumber.ok, true);
    assert.deepEqual(await handlers.list(""), []);
});

test("remove відхиляє некоректний id", async () => {
    const handlers = createTestHandlers();

    assert.equal((await handlers.remove("abc")).ok, false);
    assert.equal((await handlers.remove(null)).ok, false);
});

test("remove повідомляє, якщо слова немає", async () => {
    const handlers = createTestHandlers();

    const result = await handlers.remove(999);

    assert.equal(result.ok, false);
    assert.equal(result.error, "Слово не знайдено.");
});