import { test } from "node:test";
import assert from "node:assert/strict";
import { createWord, formatWordDate, sortWordsByDate, filterWordsByQuery, sanitizeWords } from "../wordUtils.js";

test("createWord обрізає пробіли та зберігає дату створення", () => {
    const now = new Date("2026-11-03T10:00:00.000Z");
    assert.deepEqual(createWord("  apple ", { id: 7, now }), {
        id: 7,
        word: "apple",
        createdAt: "2026-11-03T10:00:00.000Z",
    });
});

test("formatWordDate форматує дату як дд.мм.рррр", () => {
    assert.equal(formatWordDate(new Date(2026, 10, 3, 12, 0)), "03.11.2026");
});

test("formatWordDate повертає порожній рядок для некоректної дати", () => {
    assert.equal(formatWordDate("не дата"), "");
});

test("sortWordsByDate ставить новіші слова першими й не змінює вихідний масив", () => {
    const words = [
        { id: 1, word: "old", createdAt: "2026-01-01T00:00:00.000Z" },
        { id: 2, word: "new", createdAt: "2026-06-01T00:00:00.000Z" },
    ];
    const sorted = sortWordsByDate(words);
    assert.deepEqual(sorted.map((item) => item.id), [2, 1]);
    assert.deepEqual(words.map((item) => item.id), [1, 2]);
});

test("sortWordsByDate підтримує старі записи без createdAt (за id)", () => {
    const words = [
        { id: 100, word: "a" },
        { id: 200, word: "b" },
    ];
    assert.deepEqual(sortWordsByDate(words).map((item) => item.id), [200, 100]);
});

test("filterWordsByQuery шукає без урахування регістру; порожній запит повертає все", () => {
    const words = [
        { id: 1, word: "Apple" },
        { id: 2, word: "cat" },
    ];
    assert.deepEqual(filterWordsByQuery(words, "APP"), [words[0]]);
    assert.deepEqual(filterWordsByQuery(words, "   "), words);
});

test("sanitizeWords відкидає некоректні записи", () => {
    const words = [
        { id: 1, word: "apple" },
        { id: "2", word: "id не число" },
        { id: 3, word: "  " },
        null,
        "рядок",
    ];
    assert.deepEqual(sanitizeWords(words), [{ id: 1, word: "apple" }]);
    assert.deepEqual(sanitizeWords({ id: 1 }), []);
});