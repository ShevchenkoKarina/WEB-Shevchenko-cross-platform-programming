// Допоміжні функції роботи зі словами (чисті функції без побічних ефектів).

// Створює об'єкт слова зі збереженням дати створення
export function createWord(word, { id = Date.now(), now = new Date() } = {}) {
    return { id, word: word.trim(), createdAt: now.toISOString() };
}

// Форматує дату створення у вигляді дд.мм.рррр. Для некоректної дати повертає порожній рядок
export function formatWordDate(value) {
    const date = value instanceof Date ? value : new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "";
    }

    return date.toLocaleDateString("uk-UA", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

// Час створення слова: для старих записів без createdAt використовується id (мітка часу)
function getWordTime(item) {
    const time = new Date(item.createdAt ?? item.id).getTime();
    return Number.isNaN(time) ? 0 : time;
}

// Сортування: спочатку новіші слова. Вихідний масив не змінюється
export function sortWordsByDate(words) {
    return [...words].sort((a, b) => getWordTime(b) - getWordTime(a));
}

// Пошук за підрядком у слові без урахування регістру
export function filterWordsByQuery(words, query = "") {
    const normalizedQuery = query.trim().toLowerCase();

    if (normalizedQuery === "") {
        return words;
    }

    return words.filter((item) => item.word.toLowerCase().includes(normalizedQuery));
}

// Залишає лише коректні записи: об'єкти з числовим id та непорожнім словом
export function sanitizeWords(words) {
    if (!Array.isArray(words)) {
        return [];
    }

    return words.filter(
        (item) =>
            item !== null &&
            typeof item === "object" &&
            typeof item.id === "number" &&
            typeof item.word === "string" &&
            item.word.trim() !== ""
    );
}