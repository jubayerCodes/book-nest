import mongoose from 'mongoose';

const CategoryModel = new mongoose.Schema(
    {
        cat_name: { type: String },
        cat_status: { type: String },
        cat_featured: { type: Boolean }
    },
    { timestamps: true }
)

export default mongoose.models.Category || mongoose.model('Category', CategoryModel);