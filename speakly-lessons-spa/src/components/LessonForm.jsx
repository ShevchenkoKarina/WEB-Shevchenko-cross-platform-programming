import { useState } from "react";

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];
const LANGUAGES = [
    "Англійська",
    "Німецька",
    "Французька",
    "Іспанська",
    "Італійська",
    "Польська",
];

export default function LessonForm({ onAdd }) {
    const [title, setTitle] = useState("");
    const [level, setLevel] = useState(LEVELS[0]);
    const [language, setLanguage] = useState(LANGUAGES[0]);

    function handleSubmit(event) {
        event.preventDefault();
        const added = onAdd({ title, level, language });
        if (added) {
            setTitle("");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mb-4 flex gap-3 max-sm:flex-col">
            <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Введіть тему уроку"
                aria-label="Тема уроку"
                className="flex-1 rounded-lg border border-emerald-300 px-4 py-3 text-base"
            />
            <select
                value={level}
                onChange={(event) => setLevel(event.target.value)}
                aria-label="Рівень"
                className="rounded-lg border border-emerald-300 px-3 py-3 text-base"
            >
                {LEVELS.map((item) => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </select>
            <select
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                aria-label="Мова"
                className="rounded-lg border border-emerald-300 px-3 py-3 text-base"
            >
                {LANGUAGES.map((item) => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </select>
            <button
                type="submit"
                className="cursor-pointer rounded-lg bg-emerald-600 px-5 py-3 text-base text-white hover:bg-emerald-800"
            >
                Додати
            </button>
        </form>
    );
}