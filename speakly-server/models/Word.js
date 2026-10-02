import mongoose from "mongoose";

const wordSchema = new mongoose.Schema(
    {
        word: {
            type: String,
            required: true,
            trim: true,
        },
        translation: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);

const Word = mongoose.model("Word", wordSchema);

export default Word;