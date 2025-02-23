import dotenv from "dotenv";
dotenv.config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_USER_URI: process.env.MONGODB_USER_URI,
    MONGODB_KUNDALI_URI: process.env.MONGODB_KUNDALI_URI,
  },
};

export default nextConfig;
