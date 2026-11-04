// Безпечний «міст» між рендер-процесом і головним процесом.
// Рендер-процес отримує лише дві функції: loadWords та saveWords.

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("wordsAPI", {
    loadWords: () => ipcRenderer.invoke("words:load"),
    saveWords: (words) => ipcRenderer.invoke("words:save", words),
});