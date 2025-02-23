import { connectUserDB } from "@/app/utils/db";
import User from "@/models/User"; // Ensure your models are properly defined

export async function POST(req) {
    const db = await connectUserDB();
    const userModel = db.model("User", User.schema);
    
    // Your signup logic here...
}
