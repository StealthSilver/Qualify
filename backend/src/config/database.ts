import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    // Connection options for better reliability
    const options = {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000,
    };

    console.log("Attempting to connect to MongoDB...");
    const conn = await mongoose.connect(mongoURI, options);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📦 Database Name: ${conn.connection.name}`);
  } catch (error: any) {
    console.error("\n❌ Error connecting to MongoDB\n");
    
    if (error.message?.includes("IP")) {
      console.error("🔒 IP Address not whitelisted!");
      console.error("\n📋 To fix this issue:");
      console.error("1. Go to https://cloud.mongodb.com/");
      console.error("2. Navigate to: Network Access (under Security)");
      console.error("3. Click 'Add IP Address'");
      console.error("4. Either:");
      console.error("   - Click 'Add Current IP Address' (recommended)");
      console.error("   - Or enter '0.0.0.0/0' to allow all IPs (development only)");
      console.error("5. Click 'Confirm' and wait 1-2 minutes for changes to apply\n");
    } else {
      console.error("Error details:", error.message);
    }
    
    process.exit(1);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("⚠️  MongoDB disconnected");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});

mongoose.connection.on("connected", () => {
  console.log("🔗 MongoDB connection established");
});
