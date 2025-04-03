import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

// Define source and destination paths
const source = path.join(__dirname, "../3d-version/dist");
const destination = path.join(__dirname, "public");

// Function to copy directory
async function copyDir(src: string, dest: string) {
  if (!fs.existsSync(src)) {
    console.error(`Source directory "${src}" does not exist.`);
    return;
  }

  await fs.promises.mkdir(dest, { recursive: true });

  const entries = await fs.promises.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.promises.copyFile(srcPath, destPath);
    }
  }
}

// Run the copy process before Next.js starts
copyDir(source, destination)
  .then(() => console.log("Copied dist/ to public/"))
  .catch((err) => console.error("Error copying files:", err));

const assetSource = path.join(__dirname, "../3d-version/assets");
const assetDest = path.join(__dirname, "public/assets");

copyDir(assetSource, assetDest)
  .then(() => console.log("Copied assets/ to public/assets"))
  .catch((err) => console.error("Error copying files:", err));


const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    turbo: true, // Enable TurboPack if needed
  },
};

export default nextConfig;
