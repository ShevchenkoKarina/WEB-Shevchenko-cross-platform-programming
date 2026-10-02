import Word from "../models/Word.js";

export async function getWords(req, res) {
    const words = await Word.find().sort({ createdAt: -1 });
    res.json(words);
}

export async function getWordById(req, res) {
    const word = await Word.findById(req.params.id);

    if (!word) {
        return res.status(404).json({ message: "Слово не знайдено" });
    }

    res.json(word);
}

export async function createWord(req, res) {
    const { word, translation } = req.body;
    const newWord = await Word.create({ word, translation });
    res.status(201).json(newWord);
}

export async function updateWord(req, res) {
    const { word, translation } = req.body;
    const updatedWord = await Word.findByIdAndUpdate(
        req.params.id,
        { word, translation },
        { new: true, runValidators: true }
    );

    if (!updatedWord) {
        return res.status(404).json({ message: "Слово не знайдено" });
    }

    res.json(updatedWord);
}

export async function deleteWord(req, res) {
    const deletedWord = await Word.findByIdAndDelete(req.params.id);

    if (!deletedWord) {
        return res.status(404).json({ message: "Слово не знайдено" });
    }

    res.json({ message: "Слово видалено" });
}