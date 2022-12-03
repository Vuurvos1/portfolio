import { createCanvas, loadImage } from 'canvas';
import fs from 'node:fs';
import path from 'node:path';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  // console.log(query);

  // const tileBuffer = await fs.readFileSync('./public/tile.jpg');

  const fontSize = 72;
  const lineHeight = fontSize + 6;

  const imageSize = 800;
  const maxWidth = 540;

  let words = query.content || '';

  // create canvas same width and height as image
  const canvas = createCanvas(imageSize, imageSize);
  const ctx = canvas.getContext('2d');

  const bg = await loadImage('./public/tile.jpg');
  ctx.drawImage(bg, 0, 0, imageSize, imageSize);

  ctx.font = `400 ${fontSize}px Serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#0f1b65';

  // check line amount
  let line = '';
  let lines = [];

  for (let i = 0; i < words.length; i++) {
    let testLine = `${line} ${words[i]}`;
    let testWidth = ctx.measureText(testLine).width;

    if (testWidth > maxWidth) {
      // go to next line
      lines.push(line.trim());
      line = words[i];
    } else {
      line = testLine;
    }
  }

  lines.push(line);

  // fill tile with text
  let startX = 0;
  let startY = imageSize / 2 - ((lines.length - 1) * lineHeight) / 2 + 24;

  for (let i = 0; i < lines.length; i++) {
    startX = imageSize / 2;

    ctx.fillText(lines[i], startX, startY);

    startY += lineHeight;
  }

  event.res.writeHead(200, { 'Content-Type': 'image/png' });
  event.res.end(canvas.toBuffer());

  return event.res;
});
