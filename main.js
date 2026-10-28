import "./style.css";

const $ = (id) => document.getElementById(id);

const io = new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}), { threshold: 0.2 });
document.querySelectorAll(".rev").forEach((el) => io.observe(el));

/* Certificat */
const F = '"Newsreader", Georgia, "Times New Roman", serif';
const GREEN = "#0b3d2e", RED = "#c1272d", INK = "#1d2a24";

function wrap(x, text, cx, y, maxW, lh) {
  let line = "";
  for (const w of text.split(" ")) {
    const t = line ? line + " " + w : w;
    if (x.measureText(t).width > maxW && line) { x.fillText(line, cx, y); y += lh; line = w; }
    else line = t;
  }
  x.fillText(line, cx, y);
  return y + lh;
}

async function drawCert() {
  const c = $("cert"), x = c.getContext("2d");
  c.width = 1600; c.height = 1131;
  try {
    await Promise.all([
      document.fonts.load("700 80px Newsreader"),
      document.fonts.load("italic 700 80px Newsreader"),
      document.fonts.load("italic 400 40px Newsreader"),
      document.fonts.load("400 40px Newsreader")
    ]);
  } catch (e) {}
  x.fillStyle = "#fffdf8"; x.fillRect(0, 0, 1600, 1131);
  x.strokeStyle = GREEN; x.lineWidth = 14; x.strokeRect(40, 40, 1520, 1051);
  x.strokeStyle = RED; x.lineWidth = 3; x.strokeRect(68, 68, 1464, 995);
  x.textAlign = "center";
  x.fillStyle = GREEN; x.font = "700 92px " + F;
  x.fillText("Certificat de première place", 800, 200);
  x.fillStyle = INK; x.font = "italic 400 42px " + F;
  x.fillText("décerné à", 800, 285);
  x.font = "italic 700 128px " + F;
  x.fillText("Besma Douqchi", 800, 425);
  x.fillStyle = RED; x.fillRect(600, 470, 400, 4);
  x.fillStyle = INK; x.font = "400 40px " + F;
  let y = 550;
  y = wrap(x, "Pour avoir monté sur scène avec le trac, parlé pendant quatre minutes et en être redescendue avec la première place.", 800, y, 1180, 54) + 14;
  y = wrap(x, "Le Trac a été informé de sa défaite. Il n’a pas fait appel. Le pronostic de son supporter est confirmé.", 800, y, 1180, 54) + 14;
  wrap(x, "Ce certificat n’a aucune valeur officielle. Ta victoire en a une. Bravo pour ton courage, ton travail et ton français. Ton prénom veut dire sourire, et tu en as fait naître plusieurs aujourd’hui.", 800, y, 1180, 54);
  x.fillStyle = RED; x.beginPath(); x.arc(800, 985, 52, 0, Math.PI * 2); x.fill();
  x.fillStyle = "#fff"; x.font = "700 64px " + F; x.fillText("1", 800, 1007);
  x.fillStyle = INK; x.font = "italic 400 28px " + F;
  x.textAlign = "left"; x.fillText("Fait le 28 octobre 2026", 130, 1000);
  x.textAlign = "right"; x.fillText("Ton supporter, qui n’a jamais douté", 1470, 1000);
}
drawCert();

$("dl").addEventListener("click", async () => {
  await drawCert();
  const a = document.createElement("a");
  a.download = "certificat-besma.png";
  a.href = $("cert").toDataURL("image/png");
  a.click();
});
