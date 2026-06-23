import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const assetsDir = path.join(process.cwd(), 'src', 'assets');

async function optimizeImages() {
  const files = fs.readdirSync(assetsDir);

  for (const file of files) {
    if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
      const inputPath = path.join(assetsDir, file);
      const outputFilename = file.replace(/\.(png|jpe?g)$/i, '.webp');
      const outputPath = path.join(assetsDir, outputFilename);

      try {
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);
        console.log(`Converted ${file} to ${outputFilename}`);
      } catch (err) {
        console.error(`Error converting ${file}:`, err);
      }
    }
  }
}

optimizeImages();
