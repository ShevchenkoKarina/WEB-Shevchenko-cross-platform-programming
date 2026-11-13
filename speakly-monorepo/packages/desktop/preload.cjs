// Preload-скрипт (саме CommonJS, розширення .cjs).
// Відкриває сторінці лише три дозволені функції, а не весь ipcRenderer.

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("wordsAPI", {
    list: (query) => ipcRenderer.invoke("words:list", query),
    add: (word) => ipcRenderer.invoke("words:add", word),
    remove: (id) => ipcRenderer.invoke("words:remove", id),
});