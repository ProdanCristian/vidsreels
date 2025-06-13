const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const previewsDir = path.join(__dirname, '../public/previews');
const files = fs.readdirSync(previewsDir).filter(f => f.endsWith('.mp4'));

files.forEach(file => {
  const videoPath = path.join(previewsDir, file);
  const base = path.basename(file, '.mp4');
  const outPath = path.join(previewsDir, `${base}.jpg`);
  // Only create if not exists
  if (!fs.existsSync(outPath)) {
    console.log(`Generating thumbnail for ${file}...`);
    execSync(`ffmpeg -y -i "${videoPath}" -ss 00:00:01.000 -vframes 1 "${outPath}"`);
  }
});
console.log('All thumbnails generated!'); 