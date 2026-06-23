const timelineEvents = {
  1646: { place: "Leipzig, Germany", title: "A restless mind arrives.", text: "Gottfried Wilhelm Leibniz is born on July 1 in Leipzig." },
  1661: { place: "Leipzig, Germany", title: "University, at fourteen.", text: "Leibniz enters the University of Leipzig and studies philosophy and law." },
  1663: { place: "Leipzig, Germany", title: "A first degree—and a first major work.", text: "He graduates with a bachelor’s degree and writes De Principio Individui, an early work on the principle of individuality." },
  1667: { place: "Altdorf, Germany", title: "Doctor of law.", text: "He earns his doctorate from the University of Altdorf, beginning a career that will move between courts, libraries and mathematics." },
  1672: { place: "Paris, France", title: "A mathematical awakening.", text: "In Paris, Christiaan Huygens guides Leibniz toward deeper study of mathematics and physics." },
  1673: { place: "London, England", title: "The calculating machine.", text: "He visits London and demonstrates his early calculating machine to the Royal Society." },
  1675: { place: "Paris, France", title: "The symbols take shape.", text: "Leibniz begins using calculus notation such as ∫, dx and dy." },
  1676: { place: "Paris → Hanover", title: "Rules for change.", text: "He develops a form of the power rule, then moves to Hanover to work as librarian and court councillor." },
  1684: { place: "Leipzig publication", title: "Differential calculus, in print.", text: "Leibniz publishes Nova Methodus pro Maximis et Minimis, his landmark paper on differential calculus." },
  1686: { place: "Leipzig publication", title: "The integral sign appears.", text: "His paper on integral calculus includes the first printed use of the integral symbol." },
  1716: { place: "Hanover, Germany", title: "A language outlives its inventor.", text: "Leibniz dies on November 14. His notation continues to shape mathematics centuries later." }
};

const cityStories = {
  leipzig: { kicker: "Leipzig · Education", title: "Where the polymath began.", text: "Born and educated in Leipzig, Leibniz entered university at 14. Philosophy and law trained him to search for precise systems of reasoning." },
  paris: { kicker: "Paris · Discovery", title: "Where mathematics came into focus.", text: "In the early 1670s, Leibniz studied mathematics and physics under Christiaan Huygens. This mentorship pushed him toward the problems that became calculus." },
  london: { kicker: "London · Exchange", title: "Where ideas met a scientific network.", text: "Leibniz demonstrated his calculating machine to the Royal Society and interacted with leading scientific figures connected to it, including Robert Hooke, Robert Boyle and John Pell." },
  hanover: { kicker: "Hanover · Working life", title: "Where the work continued.", text: "From 1676, Leibniz lived mostly in Hanover, serving as librarian and court councillor while continuing his mathematical, scientific and philosophical research." }
};

const quizzes = [
  { q: "What does the integral symbol’s shape come from?", options: ["A stretched letter S", "A Roman numeral", "The curve of a graph"], answer: 0, note: "Correct — it comes from a long S for summa, Latin for ‘sum.’" },
  { q: "Which notation do calculus students still use today?", options: ["Newton’s fluxion dot only", "Leibniz’s dy/dx", "Neither system"], answer: 1, note: "Exactly — dy/dx remains the standard notation for a derivative." },
  { q: "Who guided Leibniz’s mathematical studies in Paris?", options: ["Robert Hooke", "Isaac Newton", "Christiaan Huygens"], answer: 2, note: "Right — Huygens helped direct Leibniz toward deeper mathematics and physics." }
];

const superscripts = ["⁰","¹","²","³","⁴","⁵","⁶","⁷","⁸","⁹"];
const progressBar = document.querySelector("#progressBar");
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector("#siteNav");

window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  progressBar.style.width = `${Math.min(100, (scrollY / max) * 100)}%`;
});

menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  nav.classList.toggle("open", !open);
});
nav.addEventListener("click", e => { if (e.target.matches("a")) { nav.classList.remove("open"); menuButton.setAttribute("aria-expanded", "false"); } });

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); } });
}, { threshold: .12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.querySelectorAll(".year-list button").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".year-list button").forEach(b => b.setAttribute("aria-selected", "false"));
    button.setAttribute("aria-selected", "true");
    const year = button.dataset.year;
    const event = timelineEvents[year];
    document.querySelector("#eventPlace").textContent = event.place;
    document.querySelector("#eventYear").textContent = year;
    document.querySelector("#eventTitle").textContent = event.title;
    document.querySelector("#eventText").textContent = event.text;
  });
});

const range = document.querySelector("#powerRange");
range.addEventListener("input", () => {
  const n = Number(range.value);
  document.querySelector("#powerOutput").textContent = n;
  document.querySelector("#sourceEquation").textContent = `d(x${superscripts[n]})`;
  document.querySelector("#resultEquation").textContent = `${n}x${superscripts[n - 1]} dx`;
});

const productRange = document.querySelector("#productRange");
productRange.addEventListener("input", () => {
  const m = Number(productRange.value);
  document.querySelector("#productOutput").textContent = m;
  document.querySelector("#productSource").textContent = `d/dx (x² · x${superscripts[m]})`;
  document.querySelector("#productSteps").textContent = `= 2x · x${superscripts[m]} + x² · ${m}x${superscripts[m - 1]}`;
  document.querySelector("#productResult").textContent = `= ${m + 2}x${superscripts[m + 1]}`;
});

function monomial(coefficient, exponent) {
  if (exponent === 0) return String(coefficient);
  const coefficientText = coefficient === 1 ? "" : String(coefficient);
  const exponentText = exponent === 1 ? "" : superscripts[exponent];
  return `${coefficientText}x${exponentText}`;
}

const quotientRange = document.querySelector("#quotientRange");
quotientRange.addEventListener("input", () => {
  const m = Number(quotientRange.value);
  document.querySelector("#quotientOutput").textContent = m;
  document.querySelector("#quotientSource").textContent = `d/dx (x${superscripts[m]} / x²)`;
  document.querySelector("#quotientSteps").textContent = `= (${m}x${superscripts[m - 1]} · x² − x${superscripts[m]} · 2x) / (x²)²`;
  document.querySelector("#quotientResult").textContent = `= ${monomial(m - 2, m - 3)}`;
});

document.querySelectorAll(".city").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".city").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    const story = cityStories[button.dataset.city];
    document.querySelector("#cityKicker").textContent = story.kicker;
    document.querySelector("#cityTitle").textContent = story.title;
    document.querySelector("#cityText").textContent = story.text;
  });
});

let quizIndex = 0;
let score = 0;
let answered = false;
const question = document.querySelector("#quizQuestion");
const options = document.querySelector("#quizOptions");
const feedback = document.querySelector("#quizFeedback");
const next = document.querySelector("#nextQuestion");

function renderQuiz() {
  const item = quizzes[quizIndex];
  answered = false;
  question.textContent = item.q;
  options.innerHTML = "";
  feedback.textContent = "";
  next.disabled = true;
  document.querySelector("#quizCount").textContent = `Question ${quizIndex + 1} / ${quizzes.length}`;
  item.options.forEach((label, index) => {
    const button = document.createElement("button");
    button.textContent = label;
    button.addEventListener("click", () => answerQuiz(index, button));
    options.appendChild(button);
  });
}

function answerQuiz(choice, button) {
  if (answered) return;
  answered = true;
  const item = quizzes[quizIndex];
  const buttons = [...options.querySelectorAll("button")];
  buttons.forEach(b => b.disabled = true);
  buttons[item.answer].classList.add("correct");
  if (choice === item.answer) { score += 1; feedback.textContent = item.note; }
  else { button.classList.add("wrong"); feedback.textContent = `Not quite. ${item.note.replace("Correct — ", "")}`; }
  document.querySelector("#quizScore").textContent = `Score ${score}`;
  next.disabled = false;
  next.innerHTML = quizIndex === quizzes.length - 1 ? "See result <span>→</span>" : "Next question <span>→</span>";
}

next.addEventListener("click", () => {
  quizIndex += 1;
  if (quizIndex < quizzes.length) return renderQuiz();
  question.textContent = score === 3 ? "A perfect score. Leibniz would approve." : `You scored ${score} out of 3.`;
  options.innerHTML = "";
  feedback.textContent = score === 3 ? "You know your dx from your ∫." : "The notation is still speaking — scroll back for a quick review.";
  next.textContent = "Try again";
  next.disabled = false;
  next.onclick = () => { quizIndex = 0; score = 0; document.querySelector("#quizScore").textContent = "Score 0"; next.onclick = null; renderQuiz(); };
});

renderQuiz();
