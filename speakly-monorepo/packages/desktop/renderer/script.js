// Логіка інтерфейсу десктопної версії. Власної перевірки тут немає:
// усе виконує ядро через window.wordsAPI, а текст помилки береться з результату add().

const wordInput = document.getElementById("wordInput");
const addWordButton = document.getElementById("addWordButton");
const searchInput = document.getElementById("searchInput");
const message = document.getElementById("message");
const wordsList = document.getElementById("wordsList");

function showMessage(text, color) {
    message.textContent = text;
    message.style.color = color;
}

async function renderWords() {
    const words = await window.wordsAPI.list(searchInput.value);
    wordsList.innerHTML = "";

    words.forEach((item) => {
        const li = document.createElement("li");
        li.className = "word-item";

        const content = document.createElement("div");
        content.className = "word-content";

        const text = document.createElement("span");
        text.className = "word-text";
        text.textContent = item.word;

        const date = document.createElement("span");
        date.className = "word-date";
        date.textContent = item.dateLabel;

        content.append(text, date);

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Видалити";
        deleteButton.addEventListener("click", async () => {
            const result = await window.wordsAPI.remove(item.id);
            if (result.ok) {
                showMessage("Слово видалено.", "green");
            } else {
                showMessage(result.error, "red");
            }
            await renderWords();
        });

        li.append(content, deleteButton);
        wordsList.appendChild(li);
    });
}

async function addWord() {
    const result = await window.wordsAPI.add(wordInput.value);

    if (!result.ok) {
        showMessage(result.error, "red");
        return;
    }

    wordInput.value = "";
    showMessage("Слово успішно додано та збережено у файл.", "green");
    await renderWords();
}

addWordButton.addEventListener("click", addWord);
wordInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") addWord();
});
searchInput.addEventListener("input", renderWords);

document.addEventListener("DOMContentLoaded", renderWords);