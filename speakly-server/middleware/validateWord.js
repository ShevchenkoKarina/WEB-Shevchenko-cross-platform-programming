export function validateWord(req, res, next) {
    const { word, translation } = req.body;

    if (!word || !word.trim() || !translation || !translation.trim()) {
        return res.status(400).json({ message: "Поля word та translation обов'язкові" });
    }

    next();
}