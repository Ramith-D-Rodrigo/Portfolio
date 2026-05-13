import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define source and destination paths relative to the script location
const rootDir = path.join(__dirname, '..');
const sourceDist = path.join(rootDir, '../3d-version/dist');
const sourceAssets = path.join(rootDir, '../3d-version/assets');
const destPublic = path.join(rootDir, 'public');
const destAssets = path.join(rootDir, 'public/assets');

// Function to copy directory
async function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`Source directory "${src}" does not exist. Skipping...`);
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
      try {
        await fs.promises.copyFile(srcPath, destPath);
      } catch (err) {
        if (err.code === 'EBUSY') {
          console.warn(`File busy, skipping: ${entry.name}`);
        } else {
          throw err;
        }
      }
    }
  }
}

async function sync() {
  console.log('Syncing assets from 3d-version...');
  
  try {
    await copyDir(sourceDist, destPublic);
    console.log('✓ Copied dist/ to public/');
    
    await copyDir(sourceAssets, destAssets);
    console.log('✓ Copied assets/ to public/assets');
    
    console.log('Sync complete.');
  } catch (err) {
    console.error('Error during asset sync:', err);
    process.exit(1);
  }
}

sync();
