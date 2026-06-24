import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.join(process.cwd(), 'public');

async function optimizePublicImages() {
  const files = ['favicons.png', 'preview.png'];

  for (const file of files) {
    const inputPath = path.join(publicDir, file);
    if (fs.existsSync(inputPath)) {
      const outputFilename = file.replace(/\.png$/i, '.webp');
      const outputPath = path.join(publicDir, outputFilename);

      try {
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);
        console.log(`Converted ${file} to ${outputFilename}`);
      } catch (err) {
        console.error(`Error converting ${file}:`, err);
      }
    } else {
        console.log(`${file} does not exist in public directory.`);
    }
  }
}

optimizePublicImages();
