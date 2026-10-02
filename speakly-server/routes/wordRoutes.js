import { Router } from "express";
import {
    getWords,
    getWordById,
    createWord,
    updateWord,
    deleteWord,
} from "../controllers/wordController.js";
import { validateWord } from "../middleware/validateWord.js";

const router = Router();

router.get("/", getWords);
router.get("/:id", getWordById);
router.post("/", validateWord, createWord);
router.put("/:id", validateWord, updateWord);
router.delete("/:id", deleteWord);

export default router;