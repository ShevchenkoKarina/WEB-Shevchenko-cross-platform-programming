// Файловий адаптер для десктопної версії: зберігає масив слів у JSON-файлі.
// Модуль не підключає electron, тому його можна тестувати звичайним node --test.

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { WordStorageAdapter } from "@speakly/core";

export class FileStorageAdapter extends WordStorageAdapter {
    constructor(filePath) {
        super();
        this.filePath = filePath;
    }

    // Якщо файлу немає або він пошкоджений — повертаємо порожній масив
    async load() {
        try {
            const raw = await readFile(this.filePath, "utf-8");
            const data = JSON.parse(raw);
            return Array.isArray(data) ? data : [];
        } catch {
            return [];
        }
    }

    // Створює теку, якщо її немає, і записує масив у файл
    async save(words) {
        await mkdir(path.dirname(this.filePath), { recursive: true });
        await writeFile(this.filePath, JSON.stringify(words, null, 2), "utf-8");
    }
}