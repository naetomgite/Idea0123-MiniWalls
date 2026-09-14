import { readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const wallpapersDirectory = path.resolve('docs/wallpapers');
const outputFile = path.resolve('docs/gallery.json');
const imageExtensions = new Set(['.avif', '.jpeg', '.jpg', '.png', '.webp']);

async function findImages(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return findImages(fullPath);
    return imageExtensions.has(path.extname(entry.name).toLowerCase()) ? [fullPath] : [];
  }));
  return files.flat();
}

function toTitle(filename) {
  return path.basename(filename, path.extname(filename))
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

const images = (await findImages(wallpapersDirectory)).sort((left, right) => left.localeCompare(right));
const gallery = images.map((filename) => ({
  name: toTitle(filename),
  path: path.relative('docs', filename).split(path.sep).map(encodeURIComponent).join('/'),
  type: path.extname(filename).slice(1).toUpperCase(),
}));

await writeFile(outputFile, `${JSON.stringify(gallery, null, 2)}\n`);
console.log(`Generated gallery.json with ${gallery.length} wallpapers.`);
