import mongoose from "mongoose";

/**
 * Prefer MONGODB_URI when set. Otherwise build from MONGODB_USER + MONGODB_PASSWORD + MONGODB_HOST
 * so the password can be plain text (special characters are encoded automatically).
 * Same Atlas user and cluster — no extra DB user required.
 */
function resolveMongoUri(): string | null {
  const direct = process.env.MONGODB_URI?.trim();
  if (direct) return direct;

  const user = process.env.MONGODB_USER?.trim();
  const password = process.env.MONGODB_PASSWORD;
  const host = process.env.MONGODB_HOST?.trim();
  if (!user || password === undefined || password === "" || !host) return null;

  const db = process.env.MONGODB_DB_NAME?.trim() || "spardha";
  const query =
    process.env.MONGODB_QUERY_STRING?.trim() || "retryWrites=true&w=majority";
  const userEnc = encodeURIComponent(user);
  const passEnc = encodeURIComponent(password);
  return `mongodb+srv://${userEnc}:${passEnc}@${host}/${db}?${query}`;
}

function assertPlausibleMongoUri(uri: string): void {
  const hostMatch = uri.match(/@([^/?]+)/);
  const host = hostMatch?.[1]?.toLowerCase() ?? "";
  if (!host) return;

  const looksLikePlaceholder =
    /^cluster\.mongodb\.net$/i.test(host) ||
    /^CLUSTER\./i.test(hostMatch![1]!) ||
    /YOUR_CLUSTER|PLACEHOLDER|example\.com/i.test(host);

  if (looksLikePlaceholder) {
    throw new Error(
      "MONGODB_URI uses a placeholder host (e.g. CLUSTER or cluster.mongodb.net). In MongoDB Atlas: Database → Connect → Drivers, copy the SRV connection string and set MONGODB_URI on Render to that value (host looks like cluster0.xxxxx.mongodb.net)."
    );
  }
}

export const connectDB = async () => {
  try {
    const mongoURI = resolveMongoUri();

    if (!mongoURI) {
      throw new Error(
        "Set MONGODB_URI, or set MONGODB_USER + MONGODB_PASSWORD + MONGODB_HOST (see .env.example)."
      );
    }

    assertPlausibleMongoUri(mongoURI);

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
    } else if (
      /ENOTFOUND|querySrv|getaddrinfo/i.test(String(error.message ?? ""))
    ) {
      console.error("Error details:", error.message);
      console.error(
        "\n📋 DNS / hostname issue — usually wrong MONGODB_URI host:\n" +
          "1. Atlas → your cluster → Connect → Drivers → copy connection string\n" +
          "2. Replace <password> with your DB user password (URL-encode special characters)\n" +
          "3. Paste the full URI as MONGODB_URI on Render (no line breaks)\n"
      );
    } else if (/bad auth|authentication failed/i.test(String(error.message ?? ""))) {
      console.error("Error details:", error.message);
      console.error(
        "\n🔑 Wrong database user or password in MONGODB_URI:\n" +
          "1. Atlas → Database Access → confirm the user (not your Atlas login email)\n" +
          "2. Edit user → reset password → copy the new password into .env\n" +
          "3. URL-encode the password: @ %40  # %23  : %3A  / %2F  ? %3F  & %26  + %2B  space %20\n" +
          "4. URI shape: mongodb+srv://DB_USERNAME:ENCODED_PASSWORD@cluster0.xxxxx.mongodb.net/spardha?...\n" +
          "5. No angle brackets; no quotes around the URI in .env\n"
      );
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
