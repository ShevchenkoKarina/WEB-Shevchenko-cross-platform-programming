import { test } from "node:test";
import assert from "node:assert/strict";
import { validateWord, MAX_WORD_LENGTH, ERROR_EMPTY, ERROR_TOO_LONG } from "../wordValidation.js";

test("коректне слово проходить перевірку", () => {
    assert.deepEqual(validateWord("apple"), { isValid: true, error: null });
});

test("порожній текст і самі пробіли не проходять перевірку", () => {
    assert.deepEqual(validateWord(""), { isValid: false, error: ERROR_EMPTY });
    assert.deepEqual(validateWord("    "), { isValid: false, error: ERROR_EMPTY });
});

test("не рядок не проходить перевірку", () => {
    assert.equal(validateWord(undefined).isValid, false);
    assert.equal(validateWord(42).isValid, false);
});

test("межа довжини: рівно MAX_WORD_LENGTH символів допустимо, на один більше — ні", () => {
    assert.equal(validateWord("a".repeat(MAX_WORD_LENGTH)).isValid, true);
    assert.deepEqual(validateWord("a".repeat(MAX_WORD_LENGTH + 1)), {
        isValid: false,
        error: ERROR_TOO_LONG,
    });
});

test("пробіли по краях не враховуються у довжині", () => {
    assert.equal(validateWord(`  ${"a".repeat(MAX_WORD_LENGTH)}  `).isValid, true);
});