#!/usr/bin/env node
/*
  Usage:
    node scripts/optimize-images.mjs <srcDir> <outDir>

  Example:
    node scripts/optimize-images.mjs public public/optimized

  Requires:
    npm i -D sharp
*/

import fs from 'node:fs/promises';
import path from 'node:path';

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

function isRaster(file) {
  const ext = path.extname(file).toLowerCase();
  return ['.jpg', '.jpeg', '.png'].includes(ext);
}

async function* walk(dir, base = dir) {
  const ents = await fs.readdir(dir, { withFileTypes: true });
  for (const ent of ents) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      // skip output folder if inside src
      if (ent.name === 'optimized') continue;
      yield* walk(p, base);
    } else {
      yield { abs: p, rel: path.relative(base, p) };
    }
  }
}

async function main() {
  const [srcDir = 'public', outDir = 'public/optimized'] = process.argv.slice(2);
  const { default: sharp } = await import('sharp');

  const sizes = [400, 800, 1200, 1600, 2000];
  const tasks = [];

  for await (const f of walk(srcDir, srcDir)) {
    if (!isRaster(f.abs)) continue;
    const basename = path.basename(f.rel, path.extname(f.rel));
    const relDir = path.dirname(f.rel);

    for (const width of sizes) {
      for (const fmt of ['webp', 'avif']) {
        const outSubdir = path.join(outDir, relDir, String(width));
        const outPath = path.join(outSubdir, `${basename}.${fmt}`);
        tasks.push(
          (async () => {
            await ensureDir(outSubdir);
            const img = sharp(f.abs).resize({ width, withoutEnlargement: true });
            if (fmt === 'webp') {
              await img.webp({ quality: 82 }).toFile(outPath);
            } else {
              await img.avif({ quality: 50 }).toFile(outPath);
            }
            process.stdout.write(`✔ ${outPath}\n`);
          })()
        );
      }
    }
  }

  await Promise.all(tasks);
  console.log(`Done. Output in: ${outDir}`);
  console.log('Use with next/image by pointing src to optimized assets or keep using original paths (next/image will serve AVIF/WebP automatically).');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});