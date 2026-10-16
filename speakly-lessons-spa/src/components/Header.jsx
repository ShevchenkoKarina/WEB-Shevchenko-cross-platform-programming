export default function Header({ total, done }) {
    return (
        <header>
            <h1 className="mb-2 text-center text-3xl font-bold text-emerald-600">
                Speakly Lessons SPA
            </h1>
            <p className="mb-5 text-center text-slate-600">
                Усього уроків: {total} · Вивчено: {done}
            </p>
        </header>
    );
}