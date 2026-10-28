import "./style.css";

const pen = document.getElementById("pen");
pen.addEventListener("click", () => {
  const on = document.body.classList.toggle("pen-on");
  pen.setAttribute("aria-pressed", on);
  pen.classList.remove("pulse");
  pen.textContent = on ? "✎ Ranger le stylo rouge" : "✎ Active le stylo rouge";
});

const say = document.getElementById("say");
if ("speechSynthesis" in window) {
  say.hidden = false;
  say.addEventListener("click", () => {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(
      "Besma. Nom propre féminin. Un. Sourire. Deux. Personne qui monte sur scène avec le trac, et en redescend avec la première place."
    );
    u.lang = "fr-FR";
    u.rate = 0.95;
    const v = speechSynthesis.getVoices().find((x) => x.lang.startsWith("fr"));
    if (v) u.voice = v;
    speechSynthesis.speak(u);
  });
}
