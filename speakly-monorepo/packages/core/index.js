// Публічний API пакета @speakly/core: усе, що доступно клієнтам, експортується звідси.

export {
    MAX_WORD_LENGTH,
    ERROR_EMPTY,
    ERROR_TOO_LONG,
    validateWord,
} from "./wordValidation.js";

export {
    createWord,
    formatWordDate,
    sortWordsByDate,
    filterWordsByQuery,
    sanitizeWords,
} from "./wordUtils.js";

export { WordStorageAdapter, MemoryStorageAdapter } from "./storageAdapter.js";
export { WordsService } from "./wordsService.js";