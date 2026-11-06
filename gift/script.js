/* =====================================================
   EDIT ONLY THIS BLOCK  (names, reasons, photos, letter)
   ===================================================== */
const CONFIG = {
  to:   "Hetu",          // the birthday person's name
  from: "Jay",            // your name (shown at the end). Use "" to hide.

  // Exactly the reasons shown on the balloons (3 to 6 works best)
  reasons: [
    "Nobody listens the way you do",
    "You make bad days feel lighter",
    "Your smile fixes everything",
    "You always know what to say",
    "Without You life would be so boring",
  ],

  // Photos: put your image files inside the /images folder and list them here.
  // If a file is missing, an emoji is shown instead, so nothing breaks.
  photos: [
    { src: "images/photo1.jpg", caption: "Iconic Selfie Queen 💅",       emoji: "💞" },
    { src: "images/photo2.jpg", caption: "Meri Heroine nu Skincare 💛🤌", emoji: "🌹" },
    { src: "images/photo3.jpg", caption: "I Wish appde ava j hasta raiye",          emoji: "🧿" },
    { src: "images/photo4.jpg", caption: "Best Photo, With Lost Memories 😍",                 emoji: "🌅" },
    { src: "images/photo5.jpg", caption: "Your 1st hair Color 🦸‍♀️",        emoji:"💕" },
    { src: "images/photo6.jpg", caption: "Look how ugly we were, especially Me 😅  ",          emoji: "🌸" },
    { src: "images/photo7.jpg", caption: "Love Uhh ❤️",      emoji: "✨" }
  ],

  // The letter (line breaks are kept)
  letter:
`Happy Birthday ❤️

While looking through our pictures, I realized that there are no perfect words to truly describe how much you mean to me. I started getting sentimental and realized just how blessed I am to have you in my life.

You are one of the most amazing people I have ever known, and I am truly grateful to have you as my sister. You have brought so much joy, love, and happiness into my life, and I honestly cannot imagine my life without you.

Thank you for being born and for being my sister. ❤️

I hope your special day is filled with love, laughter, and everything that makes you happy. You deserve all the happiness in the world, today and always.

I won't write a long letter because I know you probably won't read it anyway 😂, but I just want you to know that you are loved, valued, and appreciated more than words could ever express.

**Happy Birthday, Didi! ❤️**`
};
/* ===================== END OF CONFIG ===================== */


const $ = id => document.getElementById(id);
const scenes = ['s1','s2','s3','s4','s5','s6'];
let cur = 0, pi = 0;

function show(i){
  cur = i;
  scenes.forEach((s,k) => $(s).classList.toggle('on', k === i));
  if (i === 5) confetti();
}
document.querySelectorAll('[data-next]').forEach(b => b.onclick = () => show(cur + 1));

/* fill in text */
$('n1').textContent = CONFIG.to;
$('n6').textContent = CONFIG.to + '!';
$('fr').textContent = CONFIG.from ? 'Made with love, just for you — ' + CONFIG.from + ' 💛' : 'Made with love, just for you 💛';
$('lett').textContent = 'Dear ' + CONFIG.to + ',\n\n' + CONFIG.letter;
document.title = 'For ' + CONFIG.to + ' — a birthday surprise 🎁';

/* cake */
$('cake').onclick = () => {
  $('cake').classList.add('out');
  $('n2').style.display = '';
  burst(innerWidth / 2, innerHeight / 2);
  const song = document.getElementById('song');
  if (song.paused) song.play().catch(() => {});
};

/* balloons */
function buildBalloons(){
  const colors = ['#ff8fa3','#b79cf0','#7fd6e8','#ffc27a','#f6a6d6'];
  const bl = $('bl'); bl.innerHTML = '';
  $('rl').innerHTML = ''; $('n3').style.display = 'none';
  const list = [...CONFIG.reasons], n = list.length || 1;
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  let popped = 0;
  list.forEach((r, i) => {
    const b = document.createElement('div');
    b.className = 'b';
    b.style.cssText = `left:${i * (100 / n) + 2}%;top:${(i % 2) * 40}px;background:${colors[i % 5]};animation-delay:${i * .4}s`;
    b.onclick = () => {
      const q = b.getBoundingClientRect();
      burst(q.left + 28, q.top + 35);
      b.remove();
      const d = document.createElement('div');
      d.className = 'reason';
      d.textContent = 'Reason no. ' + (popped + 1) + ' — ' + r;
      $('rl').appendChild(d);
      if (++popped === n) $('n3').style.display = '';
    };
    bl.appendChild(b);
  });
}

/* memories */
function drawM(){
  const m = CONFIG.photos[pi];
  const box = $('pimg');
  box.innerHTML = '';
  const img = new Image();
  img.alt = m.caption || '';
  img.onload = () => { box.innerHTML = ''; box.appendChild(img); };
  img.onerror = () => { box.textContent = m.emoji || '💞'; };
  box.textContent = m.emoji || '💞';   // shown until the photo loads
  img.src = m.src;
  $('pcap').textContent = m.caption || '';
  $('pc').textContent = (pi + 1) + ' / ' + CONFIG.photos.length;
  $('pol').style.transform = `rotate(${pi % 2 ? 3 : -3}deg)`;
}
$('nx').onclick = () => { pi = (pi + 1) % CONFIG.photos.length; drawM(); };
$('pv').onclick = () => { pi = (pi + CONFIG.photos.length - 1) % CONFIG.photos.length; drawM(); };

/* letter */
$('env').onclick = () => {
  $('env').style.display = 'none';
  $('t5').style.display = 'none';
  $('h5').textContent = '';
  $('lett').style.display = '';
  $('n5').style.display = '';
};

/* replay */
$('rep').onclick = () => {
  const song = document.getElementById('song');
  song.pause(); song.currentTime = 0;
  $('env').style.display = ''; $('t5').style.display = '';
  $('h5').textContent = 'One last thing…';
  $('lett').style.display = 'none'; $('n5').style.display = 'none';
  $('cake').classList.remove('out'); $('n2').style.display = 'none';
  buildBalloons(); pi = 0; drawM(); show(0);
};

/* confetti + twinkling stars */
const cv = $('cf'), cx = cv.getContext('2d'), st = $('star'), sx = st.getContext('2d'), P = [];
function size(){ cv.width = st.width = innerWidth; cv.height = st.height = innerHeight; }
size(); addEventListener('resize', size);
const stars = Array.from({length: 60}, () => ({x: Math.random(), y: Math.random(), r: Math.random() * 1.6 + .3, p: Math.random() * 6}));

function tick(t){
  cx.clearRect(0, 0, cv.width, cv.height);
  for (let i = P.length - 1; i >= 0; i--) {
    const p = P[i];
    p.x += p.vx; p.y += p.vy; p.vy += .12; p.rot += .1; p.life--;
    if (p.life < 0) { P.splice(i, 1); continue; }
    cx.save(); cx.translate(p.x, p.y); cx.rotate(p.rot);
    cx.fillStyle = p.c; cx.globalAlpha = Math.min(1, p.life / 30);
    cx.fillRect(-4, -2, 8, 4); cx.restore();
  }
  sx.clearRect(0, 0, st.width, st.height); sx.fillStyle = '#f6c177';
  stars.forEach(s => {
    sx.globalAlpha = .3 + .5 * Math.abs(Math.sin(t / 1200 + s.p));
    sx.beginPath(); sx.arc(s.x * st.width, s.y * st.height, s.r, 0, 7); sx.fill();
  });
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

function burst(x, y, n = 40){
  const c = ['#ff8fa3','#f6c177','#b79cf0','#7fd6e8','#fff'];
  for (let i = 0; i < n; i++) {
    const a = Math.random() * 6.28, s = Math.random() * 5 + 2;
    P.push({x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 3, rot: 0, c: c[i % 5], life: 70 + Math.random() * 40});
  }
}
function confetti(){
  let k = 0;
  const iv = setInterval(() => {
    burst(Math.random() * innerWidth, innerHeight * .3, 50);
    if (++k > 6) clearInterval(iv);
  }, 350);
}

/* start */
buildBalloons();
drawM();
