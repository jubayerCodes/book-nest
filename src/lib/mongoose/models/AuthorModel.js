import mongoose from 'mongoose';

const AuthorModel = new mongoose.Schema(
    {
        author_name: { type: String, required: true },
        author_status: { type: String, required: true },
        author_featured: { type: Boolean, required: true, default: false },
        author_img: { type: String }

    },
    { timestamps: true }
)

export default mongoose.models.Author || mongoose.model('Author', AuthorModel);