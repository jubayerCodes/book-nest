import mongoose from 'mongoose';

const UserModel = new mongoose.Schema(
    {
        user_name: { type: String },
        user_img: { type: String },
        user_email: { type: String, required: true },
        user_id: { type: String, required: true },
        user_role: { type: String }
    },
    { timestamps: true }
)

if (mongoose.models.User) {
    delete mongoose.models.User;
}

export default mongoose.models.User || mongoose.model('User', UserModel);