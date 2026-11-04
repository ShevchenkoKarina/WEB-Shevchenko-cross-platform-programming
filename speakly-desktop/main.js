

const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

// Шлях до файлу words.json у системній папці даних застосунку
function getWordsFilePath() {
    return path.join(app.getPath("userData"), "words.json");
}

function createWindow() {
    const win = new BrowserWindow({
        width: 900,
        height: 700,
        title: "Speakly Desktop",
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    win.loadFile(path.join(__dirname, "renderer", "index.html"));
}

// Читання слів із файлу. Якщо файлу немає або він пошкоджений — порожній список
ipcMain.handle("words:load", () => {
    const filePath = getWordsFilePath();

    if (!fs.existsSync(filePath)) {
        return [];
    }

    try {
        return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } catch (error) {
        console.error("Не вдалося прочитати words.json:", error);
        return [];
    }
});

// Запис слів у файл
ipcMain.handle("words:save", (event, words) => {
    fs.writeFileSync(getWordsFilePath(), JSON.stringify(words, null, 2), "utf-8");
    return true;
});

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Закриваємо застосунок, коли закрито всі вікна
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});