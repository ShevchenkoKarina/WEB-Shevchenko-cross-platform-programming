/*
  Лабораторна робота 1.2: Основи кросплатформності

  Цей JavaScript-файл відповідає за логіку застосунку для вивчення іноземних мов:
  - отримання тексту слова з поля введення;
  - додавання слова до словника;
  - виведення повідомлення користувачу;
  - видалення слів зі списку.
*/

// Отримуємо поле введення за його id
const noteInput = document.getElementById("noteInput");

// Отримуємо кнопку додавання
const addNoteButton = document.getElementById("addNoteButton");

// Отримуємо список, у який будуть додаватися слова
const notesList = document.getElementById("notesList");

// Отримуємо елемент для повідомлень користувачу
const message = document.getElementById("message");

/*
  Функція showMessage показує повідомлення користувачу.

  Параметри:
  text — текст повідомлення;
  color — колір повідомлення.
*/
function showMessage(text, color) {
    message.textContent = text;
    message.style.color = color;
}

/*
  Функція createNoteElement створює HTML-елемент слова.

  Параметр:
  noteText — текст слова, який ввів користувач.
*/
function createNoteElement(noteText) {
    // Створюємо елемент списку <li>
    const noteItem = document.createElement("li");

    // Додаємо CSS-клас для оформлення
    noteItem.className = "note-item";

    // Створюємо елемент для тексту слова
    const textSpan = document.createElement("span");

    // Додаємо CSS-клас для тексту
    textSpan.className = "note-text";

    // Записуємо текст слова
    textSpan.textContent = noteText;

    // Створюємо кнопку для видалення слова
    const deleteButton = document.createElement("button");

    // Додаємо CSS-клас для кнопки видалення
    deleteButton.className = "delete-button";

    // Текст на кнопці
    deleteButton.textContent = "Видалити";

    /*
      Додаємо обробник події click.
      Коли користувач натискає кнопку "Видалити",
      відповідне слово буде видалене зі списку.
    */
    deleteButton.addEventListener("click", function () {
        noteItem.remove();
        showMessage("Слово видалено зі словника.", "#ef4444");
    });

    // Додаємо текст слова всередину елемента <li>
    noteItem.appendChild(textSpan);

    // Додаємо кнопку видалення всередину елемента <li>
    noteItem.appendChild(deleteButton);

    // Повертаємо готовий HTML-елемент
    return noteItem;
}

/*
  Функція addNote додає нове слово до списку.
*/
function addNote() {
    // Отримуємо текст із поля введення та прибираємо зайві пробіли
    const noteText = noteInput.value.trim();

    // Перевіряємо, чи користувач не залишив поле порожнім
    if (noteText === "") {
        showMessage("Будь ласка, введіть слово або переклад.", "#ef4444");
        return;
    }

    // Створюємо новий елемент слова
    const noteElement = createNoteElement(noteText);

    // Додаємо елемент до списку
    notesList.appendChild(noteElement);

    // Очищаємо поле введення після додавання
    noteInput.value = "";

    // Встановлюємо фокус назад у поле введення
    noteInput.focus();

    // Показуємо повідомлення про успішне додавання
    showMessage("Слово успішно додано до словника!", "#16a34a");
}

/*
  Додаємо обробник події click для кнопки.
  Коли користувач натискає кнопку, викликається функція addNote.
*/
addNoteButton.addEventListener("click", addNote);

/*
  Додаємо можливість додавати слово клавішею Enter.
  Це покращує зручність використання застосунку.
*/
noteInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addNote();
    }
});