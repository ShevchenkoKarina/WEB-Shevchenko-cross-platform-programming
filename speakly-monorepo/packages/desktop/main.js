// Головний процес Electron (модуль ES).
// Створює вікно, файловий адаптер, сервіс із ядра та реєструє IPC-обробники.

import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { WordsService } from "@speakly/core";
import { FileStorageAdapter } from "./fileStorageAdapter.js";
import { createHandlers } from "./ipcHandlers.js";

// У модулях ES немає __dirname — отримуємо теку файлу з import.meta.url
const __dirname = path.dirname(fileURLToPath(import.meta.url));

function createWindow() {
    const win = new BrowserWindow({
        width: 900,
        height: 700,
        title: "Speakly Desktop",
        webPreferences: {
            preload: path.join(__dirname, "preload.cjs"),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    win.loadFile(path.join(__dirname, "renderer", "index.html"));
}

app.whenReady().then(() => {
    const filePath = path.join(app.getPath("userData"), "words.json");
    const adapter = new FileStorageAdapter(filePath);
    const service = new WordsService(adapter);
    const handlers = createHandlers(service);

    ipcMain.handle("words:list", (_event, query) => handlers.list(query));
    ipcMain.handle("words:add", (_event, word) => handlers.add(word));
    ipcMain.handle("words:remove", (_event, id) => handlers.remove(id));

    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});