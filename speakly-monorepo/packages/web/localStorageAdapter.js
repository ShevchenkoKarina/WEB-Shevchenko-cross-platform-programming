// Веб-адаптер збереження: реалізує інтерфейс WordStorageAdapter з ядра через localStorage.
// Сховище передається ззовні (за замовчуванням — localStorage браузера), тому адаптер легко тестувати.

import { WordStorageAdapter } from "@speakly/core";

export const STORAGE_KEY = "speakly-words";

export class LocalStorageAdapter extends WordStorageAdapter {
    constructor(storage = globalThis.localStorage, key = STORAGE_KEY) {
        super();
        this.storage = storage;
        this.key = key;
    }

    async load() {
        const raw = this.storage.getItem(this.key);

        if (raw === null) {
            return [];
        }

        try {
            const data = JSON.parse(raw);
            return Array.isArray(data) ? data : [];
        } catch {
            // Пошкоджений JSON не повинен ламати застосунок
            return [];
        }
    }

    async save(words) {
        this.storage.setItem(this.key, JSON.stringify(words));
    }
}