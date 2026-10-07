import dns from "dns";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

try {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch {}

const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://bazardoruser:Bazardor1234@cluster0.cntlnq5.mongodb.net/bazardor?retryWrites=true&w=majority";

const client = new MongoClient(uri);
const db = client.db("bazardor");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  secret:
    process.env.BETTER_AUTH_SECRET ||
    "bazardor-super-secret-key-2025-assignment-xyz",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId:
        process.env.GOOGLE_CLIENT_ID ||
        "179111408763-n7clu3fnhu1q5d1l4rlmsimcf7g25htb.apps.googleusercontent.com",
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET ||
        "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",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "Ov23ctXVly5KI6Pbp2e7",
      clientSecret:
        process.env.GITHUB_CLIENT_SECRET ||
        "caf1a28129998ea42ac4e828c9ae648bcd9a4f2b",
    },
  },
});

export type Session = typeof auth.$Infer.Session;