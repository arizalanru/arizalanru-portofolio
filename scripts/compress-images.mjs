import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const KB = 1024;

// category -> max size in bytes
const CATEGORY_TARGETS = {
  certificate: 300 * KB,
  photo: 200 * KB,
  diagram: 150 * KB,
};

// Explicit categorization (path relative to project root, forward slashes)
const FILES = [
  { file: 'src/assets/certificates/SERTIFIKAT PT SKYLINE SEMESTA.jpg', category: 'certificate' },
  { file: 'src/assets/project/freshscan-ai/03_augmentation_visualization.png', category: 'photo' },
  { file: 'src/assets/project/freshscan-ai/01_dataset_sample_grid.png', category: 'photo' },
  { file: 'src/assets/project/BlibliNexusAI/StaffDashboard.png', category: 'photo' },
  { file: 'src/assets/project/freshscan-ai/Screenshot 2026-02-22 202256.png', category: 'photo' },
  { file: 'src/assets/project/freshscan-ai/07_correct_vs_incorrect.png', category: 'photo' },
  { file: 'src/assets/images/Logo-PUFA-Compsci.PNG', category: 'diagram' },
  { file: 'src/assets/project/Glowingkeun-AI/AnalysisResult.png', category: 'photo' },
  { file: 'src/assets/project/BlibliNexusAI/Thumbnail.png', category: 'photo' },
  { file: 'src/assets/project/Glowingkeun-AI/AnalysisPage.png', category: 'photo' },
  { file: 'src/assets/project/Glowingkeun-AI/History.png', category: 'photo' },
  { file: 'src/assets/project/freshscan-ai/04_training_curves.png', category: 'diagram' },
  { file: 'src/assets/project/Glowingkeun-AI/Home.png', category: 'photo' },
];

async function compressJpeg(buffer, target) {
  // Try quality-only reduction first
  for (const quality of [85, 75, 65, 55, 45, 35, 25]) {
    const out = await sharp(buffer).jpeg({ quality, mozjpeg: true }).toBuffer();
    if (out.length <= target) return { buffer: out, note: `jpeg quality=${quality}` };
    var last = out;
  }
  // Fallback: downscale progressively at moderate quality
  let scale = 0.85;
  for (let i = 0; i < 5; i++) {
    const meta = await sharp(buffer).metadata();
    const width = Math.round(meta.width * scale);
    const out = await sharp(buffer).resize({ width }).jpeg({ quality: 70, mozjpeg: true }).toBuffer();
    if (out.length <= target) return { buffer: out, note: `resized width=${width} quality=70` };
    last = out;
    scale -= 0.15;
  }
  return { buffer: last, note: 'best effort (target not reached)' };
}

async function compressPng(buffer, target) {
  // 1. Try lossless recompression first (higher effort, max compressionLevel)
  const lossless = await sharp(buffer).png({ compressionLevel: 9, effort: 10 }).toBuffer();
  if (lossless.length <= target) return { buffer: lossless, note: 'lossless recompression' };

  // 2. Try palette quantization at decreasing quality
  let best = lossless;
  for (const quality of [90, 80, 70, 60, 50, 40]) {
    const out = await sharp(buffer)
      .png({ palette: true, quality, compressionLevel: 9, effort: 10 })
      .toBuffer();
    if (out.length <= target) return { buffer: out, note: `palette quality=${quality}` };
    best = out;
  }

  // 3. Fallback: downscale progressively combined with palette quantization
  let scale = 0.85;
  for (let i = 0; i < 5; i++) {
    const meta = await sharp(buffer).metadata();
    const width = Math.round(meta.width * scale);
    const out = await sharp(buffer)
      .resize({ width })
      .png({ palette: true, quality: 70, compressionLevel: 9, effort: 10 })
      .toBuffer();
    if (out.length <= target) return { buffer: out, note: `resized width=${width} palette quality=70` };
    best = out;
    scale -= 0.15;
  }
  return { buffer: best, note: 'best effort (target not reached)' };
}

function fmt(bytes) {
  return `${(bytes / KB).toFixed(1)}KB`;
}

async function main() {
  let totalBefore = 0;
  let totalAfter = 0;
  const rows = [];

  for (const { file, category } of FILES) {
    const target = CATEGORY_TARGETS[category];
    const original = await fs.readFile(file);
    const originalSize = original.length;

    if (originalSize <= target) {
      rows.push([file, category, fmt(originalSize), fmt(originalSize), '0%', 'already under target']);
      totalBefore += originalSize;
      totalAfter += originalSize;
      continue;
    }

    const ext = path.extname(file).toLowerCase();
    let result;
    if (ext === '.jpg' || ext === '.jpeg') {
      result = await compressJpeg(original, target);
    } else {
      result = await compressPng(original, target);
    }

    await fs.writeFile(file, result.buffer);

    const reduction = (100 * (1 - result.buffer.length / originalSize)).toFixed(1);
    rows.push([file, category, fmt(originalSize), fmt(result.buffer.length), `${reduction}%`, result.note]);
    totalBefore += originalSize;
    totalAfter += result.buffer.length;
  }

  console.log('');
  for (const [file, category, before, after, reduction, note] of rows) {
    console.log(`[${category}] ${file}\n  ${before} -> ${after} (${reduction})  [${note}]`);
  }
  console.log('');
  console.log(`Total: ${fmt(totalBefore)} -> ${fmt(totalAfter)} (${(100 * (1 - totalAfter / totalBefore)).toFixed(1)}% reduction)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
