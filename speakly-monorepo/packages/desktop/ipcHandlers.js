// Обробники IPC-запитів головного процесу. Не підключають electron,
// тому тестуються без запуску вікна. Уся логіка — у WordsService з ядра.

import { ERROR_EMPTY, formatWordDate } from "@speakly/core";

const ERROR_INVALID_ID = "Некоректний ідентифікатор слова.";

// Додає до слова поле dateLabel — дату для показу в інтерфейсі
function withDateLabel(item) {
    return { ...item, dateLabel: formatWordDate(item.createdAt ?? item.id) };
}

export function createHandlers(service) {
    return {
        // Запит має бути рядком; інакше — порожній запит
        async list(query) {
            const safeQuery = typeof query === "string" ? query : "";
            const words = await service.list(safeQuery);
            return words.map(withDateLabel);
        },

        // Слово має бути рядком
        async add(word) {
            if (typeof word !== "string") {
                return { ok: false, error: ERROR_EMPTY };
            }

            const result = await service.add(word);
            return result.ok ? { ok: true, word: withDateLabel(result.word) } : result;
        },

        // id — число (або числовий рядок, який перетворюється на число)
        async remove(id) {
            const isNumeric =
                typeof id === "number" || (typeof id === "string" && id.trim() !== "");
            const numericId = isNumeric ? Number(id) : NaN;

            if (!Number.isFinite(numericId)) {
                return { ok: false, error: ERROR_INVALID_ID };
            }

            return service.remove(numericId);
        },
    };
}