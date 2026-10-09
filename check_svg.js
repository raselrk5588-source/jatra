const fs = require('fs');
const html = fs.readFileSync('e:/Project24/jarta/jatra.html', 'utf8');
const wLine = html.split('\n').find(l => l.includes('var W=['));
const m = wLine.match(/var W=\[(.*?)\];/s);
if (m) {
  const w = eval('[' + m[1] + ']');
  let maxX = -1000, mxi = -1;
  w.forEach((p, i) => {
    let tmx = -1000;
    const nums = p.match(/-?\d+\.?\d*/g);
    if (nums) {
      nums.forEach((n, j) => {
        if (j % 2 === 0) { // SVG path X coords are roughly every even index for standard path... but not necessarily. Let's just find the absolute max number that is < 1000
           const num = parseFloat(n);
           if (num > tmx && num < 1000) tmx = num;
        }
      });
    }
    console.log('Path', i, 'Max:', tmx);
    if (tmx > maxX) { maxX = tmx; mxi = i; }
  });
  console.log('Overall Max X/Y value:', Math.round(maxX), 'in path', mxi);
}
