import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import LessonForm from "./components/LessonForm.jsx";
import LessonList from "./components/LessonList.jsx";

const STORAGE_KEY = "speakly-lessons";

// Читаємо збережені уроки з localStorage (або порожній масив)
function loadLessons() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [lessons, setLessons] = useState(loadLessons);
  const [message, setMessage] = useState(null);
  const [query, setQuery] = useState("");

  // Зберігаємо уроки щоразу, коли змінюється стан lessons
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lessons));
  }, [lessons]);

  // Повертає true, якщо урок додано, і false, якщо тема порожня
  function addLesson({ title, level, language }) {
    const trimmedTitle = title.trim();

    if (trimmedTitle === "") {
      setMessage({ text: "Введіть тему уроку.", type: "error" });
      return false;
    }

    const newLesson = {
      id: Date.now(),
      title: trimmedTitle,
      level,
      language,
      done: false,
    };
    setLessons([...lessons, newLesson]);
    setMessage({ text: "Урок додано.", type: "success" });
    return true;
  }

  function toggleLesson(id) {
    setLessons(
        lessons.map((lesson) =>
            lesson.id === id ? { ...lesson, done: !lesson.done } : lesson
        )
    );
  }

  function deleteLesson(id) {
    setLessons(lessons.filter((lesson) => lesson.id !== id));
    setMessage({ text: "Урок видалено.", type: "success" });
  }

  const doneCount = lessons.filter((lesson) => lesson.done).length;

  // Відфільтрований список обчислюється «на льоту», у стані не зберігається
  const visibleLessons = lessons.filter((lesson) =>
      lesson.title.toLowerCase().includes(query.trim().toLowerCase())
  );

  const emptyText =
      lessons.length === 0
          ? "Уроків поки немає. Додайте перший!"
          : "За вашим запитом уроків не знайдено.";

  return (
      <div className="min-h-screen bg-emerald-50 px-4 py-8 text-slate-800">
        <main className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-lg">
          <Header total={lessons.length} done={doneCount} />
          <LessonForm onAdd={addLesson} />
          <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Пошук уроку за темою"
              aria-label="Пошук уроку"
              className="mb-4 w-full rounded-lg border border-slate-300 px-4 py-3 text-base"
          />
          {message && (
              <p
                  className={
                    message.type === "error"
                        ? "mb-4 font-bold text-rose-600"
                        : "mb-4 font-bold text-emerald-700"
                  }
              >
                {message.text}
              </p>
          )}
          <LessonList
              lessons={visibleLessons}
              onToggle={toggleLesson}
              onDelete={deleteLesson}
              emptyText={emptyText}
          />
        </main>
      </div>
  );
}