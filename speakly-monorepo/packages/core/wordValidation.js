// Правила перевірки слова. Спільні для всіх клієнтів: змінюємо тут — змінюється всюди.
// Чисті функції: не залежать від DOM чи будь-яких платформних API.

export const MAX_WORD_LENGTH = 50;

export const ERROR_EMPTY = "Будь-ласка, введіть слово!";
export const ERROR_TOO_LONG = `Слово не повинно перевищувати ${MAX_WORD_LENGTH} символів.`;

// Перевіряє слово. Повертає { isValid, error }.
export function validateWord(word) {
    if (typeof word !== "string" || word.trim() === "") {
        return { isValid: false, error: ERROR_EMPTY };
    }

    if (word.trim().length > MAX_WORD_LENGTH) {
        return { isValid: false, error: ERROR_TOO_LONG };
    }

    return { isValid: true, error: null };
}