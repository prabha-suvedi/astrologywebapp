import { compare } from "bcrypt";
import { connectDB } from "@/lib/mongodb"; // named export

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Connect to MongoDB using connectDB for the "userDB" database.
    const connection = await connectDB("userDB");
    
    // If using mongoose.connect(), the returned connection is a Mongoose connection.
    // You can check if a native driver is available via connection.db.
    const db = connection.db ? connection.db() : connection;

    // Using native driver to query the "users" collection.
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ error: "User not found." }),
        { status: 401 }
      );
    }

    // Compare the provided password with the stored password hash.
    const isMatch = await compare(password, user.passwordHash);
    if (!isMatch) {
      return new Response(
        JSON.stringify({ error: "Invalid credentials." }),
        { status: 401 }
      );
    }

    // If we reach here, credentials are valid.
    return new Response(
      JSON.stringify({ message: "Sign in successful!" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Signin error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error." }),
      { status: 500 }
    );
  }
}
