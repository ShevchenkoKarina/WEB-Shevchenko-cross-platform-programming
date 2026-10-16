import LessonItem from "./LessonItem.jsx";

export default function LessonList({ lessons, onToggle, onDelete, emptyText }) {
    if (lessons.length === 0) {
        return <p className="text-center text-slate-500">{emptyText}</p>;
    }

    return (
        <ul className="space-y-3">
            {lessons.map((lesson) => (
                <LessonItem
                    key={lesson.id}
                    lesson={lesson}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
}