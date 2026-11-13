// Інтерфейс адаптера збереження. Ядро знає лише про ці два методи;
// як саме зберігаються дані — вирішує кожна платформа у власному класі-адаптері.

export class WordStorageAdapter {
    // Повертає масив усіх збережених слів
    async load() {
        throw new Error("Метод load() не реалізовано");
    }

    // Зберігає масив слів повністю
    async save(words) {
        throw new Error("Метод save() не реалізовано");
    }
}

// Адаптер у пам'яті: потрібен для тестів та прототипів, нічого не пише на диск
export class MemoryStorageAdapter extends WordStorageAdapter {
    constructor(initialWords = []) {
        super();
        this.words = [...initialWords];
    }

    async load() {
        return [...this.words];
    }

    async save(words) {
        this.words = [...words];
    }
}