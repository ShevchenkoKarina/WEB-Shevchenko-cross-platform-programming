// script.js
// Інтерфейс веб-клієнта. Уся логіка (перевірка, сортування, пошук, збереження) — у спільному ядрі;
// тут лише робота з DOM та вибір адаптера localStorage.

import { WordsService, formatWordDate } from "@speakly/core";
import { LocalStorageAdapter } from "./localStorageAdapter.js";

const service = new WordsService(new LocalStorageAdapter());

const wordInput = document.getElementById("wordInput");
const addWordButton = document.getElementById("addWordButton");
const searchInput = document.getElementById("searchInput");
const wordsList = document.getElementById("wordsList");
const message = document.getElementById("message");

function showMessage(text, color) {
    message.textContent = text;
    message.style.color = color;
}

async function renderWords() {
    const words = await service.list(searchInput.value);
    wordsList.innerHTML = "";

    words.forEach((item) => {
        const wordItem = document.createElement("li");
        wordItem.className = "word-item";

        const content = document.createElement("div");
        content.className = "word-content";

        const textSpan = document.createElement("span");
        textSpan.className = "word-text";
        textSpan.textContent = item.word;

        const dateSpan = document.createElement("span");
        dateSpan.className = "word-date";
        dateSpan.textContent = formatWordDate(item.createdAt ?? item.id);

        content.append(textSpan, dateSpan);

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Видалити";
        deleteButton.addEventListener("click", async () => {
            await service.remove(item.id);
            await renderWords();
            showMessage("Слово видалено.", "#ef4444");
        });

        wordItem.append(content, deleteButton);
        wordsList.appendChild(wordItem);
    });
}

async function addWord() {
    const result = await service.add(wordInput.value);

    if (!result.ok) {
        showMessage(result.error, "#ef4444");
        return;
    }

    wordInput.value = "";
    await renderWords();
    showMessage("Слово успішно додано.", "#16a34a");
}

addWordButton.addEventListener("click", addWord);
wordInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addWord();
    }
});
searchInput.addEventListener("input", renderWords);

renderWords();