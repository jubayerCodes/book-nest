import mongoose from 'mongoose';

const BookModel = new mongoose.Schema(
    {
        book_title: { type: String, required: true },
        book_cover: { type: String, required: true },
        book_author: { type: String, required: true, ref: "Author" },
        book_price: { type: Number, required: true },
        book_discount: { type: String },
        book_preview: { type: String },
        book_category: { type: String, required: true, ref: "Category" },
        book_summary: { type: String, required: true },
        book_summary: { type: String, required: true },
        book_pages: { type: Number, required: true },
        book_hours: { type: Number, required: true },
        book_words: { type: Number, required: true },
    },
    { timestamps: true }
)

export default mongoose.models.Book || mongoose.model('Book', BookModel);