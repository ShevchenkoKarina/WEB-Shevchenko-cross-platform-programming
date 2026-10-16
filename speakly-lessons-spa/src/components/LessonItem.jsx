export default function LessonItem({ lesson, onToggle, onDelete }) {
    return (
        <li
            className={`flex items-center justify-between gap-3 rounded-xl px-4 py-3 ${
                lesson.done ? "bg-slate-200" : "bg-emerald-100"
            }`}
        >
            <label className="flex flex-1 cursor-pointer flex-wrap items-center gap-3">
                <input
                    type="checkbox"
                    className="accent-emerald-600"
                    checked={lesson.done}
                    onChange={() => onToggle(lesson.id)}
                />
                <span
                    className={
                        lesson.done
                            ? "break-words text-slate-500 line-through"
                            : "break-words text-slate-800"
                    }
                >
          {lesson.title}
        </span>
                <span className="rounded-md bg-white px-2 py-0.5 text-sm text-slate-600">
          {lesson.language} · {lesson.level}
        </span>
            </label>
            <button
                type="button"
                onClick={() => onDelete(lesson.id)}
                className="cursor-pointer rounded-lg bg-rose-500 px-3.5 py-2 text-white hover:bg-rose-700"
            >
                Видалити
            </button>
        </li>
    );
}