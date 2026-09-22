

// Отримуємо поле введення за його id
const noteInput = document.getElementById("noteInput");

// Отримуємо кнопку додавання
const addNoteButton = document.getElementById("addNoteButton");

// Отримуємо список, у який будуть додаватися слова
const notesList = document.getElementById("notesList");

// Отримуємо елемент для повідомлень користувачу
const message = document.getElementById("message");


function showMessage(text, color) {
    message.textContent = text;
    message.style.color = color;
}


function createNoteElement(noteText) {

    const noteItem = document.createElement("li");


    noteItem.className = "note-item";


    const textSpan = document.createElement("span");

    textSpan.className = "note-text";

    textSpan.textContent = noteText;


    const deleteButton = document.createElement("button");


    deleteButton.className = "delete-button";


    deleteButton.textContent = "Видалити";


    deleteButton.addEventListener("click", function () {
        noteItem.remove();
        showMessage("Слово видалено зі словника.", "#ef4444");
    });


    noteItem.appendChild(textSpan);


    noteItem.appendChild(deleteButton);


    return noteItem;
}

function addNote() {
    const noteText = noteInput.value.trim();

    if (noteText === "") {
        showMessage("Будь ласка, введіть слово або переклад.", "#ef4444");
        return;
    }


    const noteElement = createNoteElement(noteText);


    notesList.appendChild(noteElement);


    noteInput.value = "";


    noteInput.focus();


    showMessage("Слово успішно додано до словника!", "#16a34a");
}

addNoteButton.addEventListener("click", addNote);


noteInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addNote();
    }
});