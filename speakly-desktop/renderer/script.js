
// Логіка рендер-процесу
// усі файлові операції виконуються через window.wordsAPI (preload.js).

const wordInput = document.getElementById("wordInput");
const addWordButton = document.getElementById("addWordButton");
const wordsList = document.getElementById("wordsList");
const message = document.getElementById("message");

let words = [];

function showMessage(text, color) {
    message.textContent = text;
    message.style.color = color;
}

function renderWords() {
    wordsList.innerHTML = "";

    words.forEach((word) => {
        const wordItem = document.createElement("li");
        wordItem.className = "word-item";

        const textSpan = document.createElement("span");
        textSpan.className = "word-text";
        textSpan.textContent = word.text;

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Видалити";

        deleteButton.addEventListener("click", async () => {
            words = words.filter((item) => item.id !== word.id);
            renderWords();
            await window.wordsAPI.saveWords(words);
            showMessage("Слово видалено.", "#ef4444");
        });

        wordItem.appendChild(textSpan);
        wordItem.appendChild(deleteButton);
        wordsList.appendChild(wordItem);
    });
}

async function addWord() {
    const text = wordInput.value.trim();

    if (text === "") {
        showMessage("Будь ласка, введіть слово.", "#ef4444");
        return;
    }

    words.push({ id: Date.now(), text });
    wordInput.value = "";
    renderWords();

    // Зберігаємо оновлений список слів у файл на диску
    await window.wordsAPI.saveWords(words);
    showMessage("Слово успішно додано та збережено у файл.", "#16a34a");
}

addWordButton.addEventListener("click", addWord);

wordInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addWord();
    }
});

// Завантажуємо слова з файлу одразу після запуску вікна
window.addEventListener("DOMContentLoaded", async () => {
    words = await window.wordsAPI.loadWords();
    renderWords();
});