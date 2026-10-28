import "./style.css";

const $ = (id) => document.getElementById(id);
const DUR = 36;
const events = [
  { m: 0, t: "Coup d’envoi. Besma entre en scène. Le Trac est déjà là. Il a pris de l’avance dans les vestiaires." },
  { m: 1, t: "Le Trac tente une frappe sur les mains. Besma l’arrête et continue de parler." },
  { m: 2, t: "Le Trac cherche un mot qui manque. Besma en a vingt en réserve." },
  { m: 3, t: "BUT. Besma conclut son discours. Le Trac n’a pas touché le ballon.", goal: true },
  { m: 4, t: "Coup de sifflet final. Besma 1, Le Trac 0. Le Trac demande qu’on change le règlement." }
];

let timer, shown = false;
const feed = $("feed"), go = $("go"), clock = $("clock");

function add(ev) {
  const li = document.createElement("li");
  if (ev.goal) { li.className = "goal"; $("sa").textContent = "1"; }
  const b = document.createElement("b");
  b.textContent = ev.m + "’";
  const p = document.createElement("p");
  p.textContent = ev.t;
  li.append(b, p);
  feed.append(li);
  li.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

go.addEventListener("click", () => {
  clearInterval(timer);
  feed.innerHTML = "";
  $("sa").textContent = "0";
  $("sb").textContent = "0";
  clock.textContent = "0:00";
  go.disabled = true;
  go.textContent = "Match en cours";
  const t0 = performance.now();
  let i = 0;
  timer = setInterval(() => {
    const s = (performance.now() - t0) / 1000;
    const mm = Math.min(240, Math.floor((s * 240) / DUR));
    clock.textContent = Math.floor(mm / 60) + ":" + String(mm % 60).padStart(2, "0");
    while (i < events.length && s >= (events[i].m * DUR) / 4) add(events[i++]);
    if (s >= DUR + 2) {
      clearInterval(timer);
      go.disabled = false;
      go.textContent = "Revoir le match";
      $("after").classList.add("show");
      if (!shown) {
        shown = true;
        setTimeout(() => $("after").scrollIntoView({ behavior: "smooth" }), 300);
      }
    }
  }, 100);
});

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
  y = wrap(x, "Le Trac a été informé de sa défaite. Il n’a pas fait appel.", 800, y, 1180, 54) + 14;
  wrap(x, "Ce certificat n’a aucune valeur officielle. Ta victoire en a une. Bravo pour ton courage, ton travail et ton français. Ton prénom veut dire sourire, et tu en as fait naître plusieurs aujourd’hui.", 800, y, 1180, 54);
  x.fillStyle = RED; x.beginPath(); x.arc(800, 985, 52, 0, Math.PI * 2); x.fill();
  x.fillStyle = "#fff"; x.font = "700 64px " + F; x.fillText("1", 800, 1007);
  x.fillStyle = INK; x.font = "italic 400 28px " + F;
  x.textAlign = "left"; x.fillText("Fait le 28 octobre 2026", 130, 1000);
  x.textAlign = "right"; x.fillText("Ton supporter, qui a retenu son souffle", 1470, 1000);
}
drawCert();

$("dl").addEventListener("click", async () => {
  await drawCert();
  const a = document.createElement("a");
  a.download = "certificat-besma.png";
  a.href = $("cert").toDataURL("image/png");
  a.click();
});
