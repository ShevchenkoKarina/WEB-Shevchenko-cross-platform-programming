// Прикладна логіка застосунку: додавання, видалення та перегляд слів.
// Сервіс отримує адаптер ззовні (dependency injection), тому однаково працює
// з будь-яким сховищем: браузерним, файлом на диску чи мобільним.

import { validateWord } from "./wordValidation.js";
import { createWord, filterWordsByQuery, sanitizeWords, sortWordsByDate } from "./wordUtils.js";

export class WordsService {
    constructor(adapter, { now = () => new Date() } = {}) {
        this.adapter = adapter;
        this.now = now;
    }

    // Усі слова (за потреби — відфільтровані за запитом), спочатку новіші
    async list(query = "") {
        const words = sanitizeWords(await this.adapter.load());
        return sortWordsByDate(filterWordsByQuery(words, query));
    }

    // Додає слово після перевірки. Повертає { ok, word } або { ok: false, error }
    async add(word) {
        const validation = validateWord(word);

        if (!validation.isValid) {
            return { ok: false, error: validation.error };
        }

        const words = sanitizeWords(await this.adapter.load());
        const now = this.now();
        const lastId = words.reduce((max, item) => Math.max(max, item.id), 0);
        // id має бути унікальним навіть тоді, коли два слова додано в одну мілісекунду
        const newWord = createWord(word, { id: Math.max(now.getTime(), lastId + 1), now });

        await this.adapter.save([...words, newWord]);
        return { ok: true, word: newWord };
    }

    // Видаляє слово за id. Повертає { ok } або { ok: false, error }
    async remove(id) {
        const words = sanitizeWords(await this.adapter.load());
        const rest = words.filter((item) => item.id !== id);

        if (rest.length === words.length) {
            return { ok: false, error: "Слово не знайдено." };
        }

        await this.adapter.save(rest);
        return { ok: true };
    }
}