import mongoose from "mongoose";

const PublisherModel = new mongoose.Schema(
    {
        publisher_name: { type: String, required: true },
        publisher_status: { type: String, required: true },
        publisher_featured: { type: String, required: true, default: false }
    }
)

export default mongoose.models.Publisher || mongoose.model("Publisher", PublisherModel);