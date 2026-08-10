const copyBtn = document.getElementById('copy');
const ipEl = document.getElementById('ip');
copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(ipEl.textContent);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = ipEl.textContent;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
  }
  copyBtn.classList.add('copied');
  copyBtn.textContent = 'Copied!';
  setTimeout(() => {
    copyBtn.classList.remove('copied');
    copyBtn.textContent = 'Copy';
  }, 1800);
});

const players = document.getElementById('players');
const IP = 'x3n0s-server.feathermc.gg';
const PORT = '25565';

async function refresh() {
  try {
    const res = await fetch(`https://api.mcsrvstat.us/3/${IP}:${PORT}`);
    const data = await res.json();
    if (data.online) {
      players.textContent = `${data.players.online}/${data.players.max}`;
    } else {
      players.textContent = 'offline';
    }
  } catch {
    players.textContent = '...';
  }
}
refresh();
setInterval(refresh, 60000);

const canvas = document.getElementById('terrain');
const ctx = canvas.getContext('2d');
let w, h;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

const cols = [];
const NCOLS = 22;
for (let i = 0; i < NCOLS; i++) {
  cols.push({
    x: Math.random() * w,
    y: h,
    width: 40 + Math.random() * 90,
    height: 120 + Math.random() * 200,
    speed: 0.3 + Math.random() * 0.5,
    grass: Math.random() < 0.5,
  });
}

function draw() {
  ctx.clearRect(0, 0, w, h);
  for (const c of cols) {
    const gx = c.x;
    const gy = c.y;
    const wc = c.width;
    const hc = c.height;
    ctx.fillStyle = '#3c2f23';
    ctx.fillRect(gx - wc / 2, gy - hc, wc, hc);
    ctx.fillStyle = '#4a3a2b';
    ctx.fillRect(gx - wc / 2, gy - hc, wc, 10);
    ctx.fillStyle = c.grass ? '#2f6b3a' : '#2b3f6b';
    ctx.fillRect(gx - wc / 2 - 3, gy - hc, wc + 6, 6);
    if (c.grass && Math.random() < 0.4) {
      ctx.fillStyle = '#3f8a4d';
      ctx.fillRect(gx - wc / 4, gy - hc - 6, 8, 8);
      ctx.fillRect(gx + wc / 4, gy - hc - 4, 6, 6);
    }
  }
  requestAnimationFrame(draw);
}
draw();