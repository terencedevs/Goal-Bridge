"use strict";

const DEFAULTS = { goalName: "", goalAmount: "", years: "", inflation: "", returnRate: "", currentSavings: "", monthlyIncome: "", monthlyCommitments: "" };
const fields = ["goalName", "goalAmount", "years", "inflation", "returnRate", "currentSavings", "monthlyIncome", "monthlyCommitments"];
const form = document.getElementById("plannerForm");
const message = document.getElementById("formMessage");
const currency = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

function readPlan() { return Object.fromEntries(fields.map(id => { const value = document.getElementById(id).value; return [id, id === "goalName" ? value.trim() : (value === "" ? null : Number(value))]; })); }

function validate(plan) {
  if (!plan.goalName) return "Give this goal a short name so the plan is easy to recognise.";
  if (!Number.isFinite(plan.goalAmount) || plan.goalAmount <= 0) return "Enter a goal cost greater than ₹0.";
  if (!Number.isFinite(plan.years) || plan.years < .25 || plan.years > 60) return "Choose a timeframe between 3 months and 60 years.";
  if (!Number.isFinite(plan.inflation) || plan.inflation < 0 || plan.inflation > 25) return "Use an inflation assumption from 0% to 25%.";
  if (!Number.isFinite(plan.returnRate) || plan.returnRate < 0 || plan.returnRate > 30) return "Use a return assumption from 0% to 30%.";
  if (!Number.isFinite(plan.currentSavings) || plan.currentSavings < 0) return "Current savings cannot be negative.";
  if (plan.monthlyIncome !== null && (!Number.isFinite(plan.monthlyIncome) || plan.monthlyIncome < 0)) return "Monthly income cannot be negative.";
  if (plan.monthlyCommitments !== null && (!Number.isFinite(plan.monthlyCommitments) || plan.monthlyCommitments < 0)) return "Monthly commitments cannot be negative.";
  if (plan.currentSavings > plan.goalAmount * 50) return "Check the current savings amount; it appears unusually high for this goal.";
  return "";
}

/** Pure calculation function: values are unrounded until display. */
function calculatePlan(plan, annualReturn = plan.returnRate) {
  const months = Math.round(plan.years * 12);
  const inflationRate = plan.inflation / 100;
  const monthlyRate = Math.pow(1 + annualReturn / 100, 1 / 12) - 1;
  const futureGoal = plan.goalAmount * Math.pow(1 + inflationRate, plan.years);
  const futureSavings = plan.currentSavings * Math.pow(1 + monthlyRate, months);
  const fundingGap = Math.max(0, futureGoal - futureSavings);
  const monthlyContribution = fundingGap === 0 ? 0 : monthlyRate === 0 ? fundingGap / months : fundingGap * monthlyRate / (Math.pow(1 + monthlyRate, months) - 1);
  const totalContribution = monthlyContribution * months;
  const projectedGrowth = Math.max(0, futureGoal - plan.currentSavings - totalContribution);
  return { months, monthlyRate, futureGoal, futureSavings, fundingGap, monthlyContribution, totalContribution, projectedGrowth };
}

function setText(id, value) { document.getElementById(id).textContent = value; }
function resetResults() {
  setText("goalLabel", "your goal"); setText("monthlyContribution", "—"); setText("resultSummary", "Enter your goal details and your plan will update automatically.");
  ["futureGoal", "futureSavings", "fundingGap", "totalContribution", "projectedGrowth", "monthlyRate"].forEach(id => setText(id, "—"));
  setText("startFundingPercent", "—"); document.getElementById("fundingBar").style.width = "0%"; document.getElementById("scenarioCards").innerHTML = ""; document.getElementById("cashflowPanel").hidden = true;
  document.getElementById("calculationStatus").textContent = "Waiting for inputs";
}

function render(plan, result) {
  const fmt = value => currency.format(Math.max(0, value));
  setText("goalLabel", plan.goalName);
  setText("monthlyContribution", Math.round(result.monthlyContribution).toLocaleString("en-IN"));
  setText("resultSummary", result.fundingGap === 0 ? "because your projected savings already cover this inflation-adjusted goal." : `over ${plan.years} ${plan.years === 1 ? "year" : "years"} to aim for your inflation-adjusted goal.`);
  setText("futureGoal", fmt(result.futureGoal)); setText("futureSavings", fmt(result.futureSavings));
  setText("fundingGap", fmt(result.fundingGap)); setText("totalContribution", fmt(result.totalContribution));
  setText("projectedGrowth", fmt(result.projectedGrowth)); setText("monthlyRate", `${(result.monthlyRate * 100).toFixed(2)}%`);
  const funded = result.futureGoal ? Math.min(100, (result.futureSavings / result.futureGoal) * 100) : 0;
  setText("startFundingPercent", `${funded.toFixed(1)}%`);
  const progress = document.querySelector(".progress-track"); progress.setAttribute("aria-valuenow", funded.toFixed(1));
  requestAnimationFrame(() => { document.getElementById("fundingBar").style.width = `${funded}%`; });
  renderScenarios(plan);
  renderCashflow(plan, result);
  document.getElementById("calculationStatus").textContent = "Updated just now";
}

function renderCashflow(plan, result) {
  const panel = document.getElementById("cashflowPanel");
  if (plan.monthlyIncome === null || plan.monthlyCommitments === null) { panel.hidden = true; return; }
  const surplus = plan.monthlyIncome - plan.monthlyCommitments;
  const buffer = surplus - result.monthlyContribution;
  const usage = surplus > 0 ? (result.monthlyContribution / surplus) * 100 : 0;
  const status = document.getElementById("cashflowStatus");
  panel.hidden = false;
  setText("monthlySurplus", currency.format(surplus)); setText("surplusUse", `${Math.max(0, usage).toFixed(0)}%`); setText("monthlyBuffer", currency.format(buffer));
  status.className = "fit-status";
  if (surplus <= 0 || buffer < 0) { status.textContent = "Shortfall"; status.classList.add("over"); setText("cashflowNarrative", "The planned contribution is greater than the cash left after your stated commitments. Revisit the goal amount, horizon, or assumption before acting."); }
  else if (usage > 60) { status.textContent = "Tight fit"; status.classList.add("tight"); setText("cashflowNarrative", "This plan uses more than 60% of the cash you have available after stated commitments. Keep a buffer for variable expenses."); }
  else { status.textContent = "Within surplus"; setText("cashflowNarrative", "The contribution fits within the stated monthly surplus. This is an affordability view, not personalised advice."); }
}

function renderScenarios(plan) {
  const assumptions = [
    { label: "Conservative", rate: Math.max(0, plan.returnRate - 3), className: "" },
    { label: "Your base case", rate: plan.returnRate, className: "base" },
    { label: "Optimistic", rate: Math.min(30, plan.returnRate + 3), className: "" }
  ];
  document.getElementById("scenarioCards").innerHTML = assumptions.map(item => {
    const r = calculatePlan(plan, item.rate);
    return `<article class="scenario-card ${item.className}"><p>${item.label}</p><div class="scenario-rate">${item.rate.toFixed(1)}%</div><small>annual return assumption</small><strong>₹${Math.round(r.monthlyContribution).toLocaleString("en-IN")} / month</strong></article>`;
  }).join("");
}

function getSavedPlans() { try { return JSON.parse(localStorage.getItem("goalbridge-saved-plans")) || []; } catch { return []; } }
function renderSavedPlans() {
  const plans = getSavedPlans(); const list = document.getElementById("savedPlans"); const empty = document.getElementById("savedEmpty");
  list.innerHTML = ""; empty.hidden = plans.length > 0;
  plans.forEach(saved => {
    const row = document.createElement("div"); row.className = "saved-plan";
    const detail = document.createElement("div"); const title = document.createElement("strong"); const note = document.createElement("small");
    title.textContent = saved.goalName; note.textContent = `${currency.format(saved.goalAmount)} · ${saved.years} years · ${currency.format(saved.monthlyContribution)}/month`; detail.append(title, note);
    const load = document.createElement("button"); load.type = "button"; load.textContent = "Load"; load.addEventListener("click", () => { apply(saved); submit(null, false); window.scrollTo({ top: 0, behavior: "smooth" }); });
    const remove = document.createElement("button"); remove.type = "button"; remove.textContent = "Remove"; remove.setAttribute("aria-label", `Remove ${saved.goalName}`); remove.addEventListener("click", () => { localStorage.setItem("goalbridge-saved-plans", JSON.stringify(getSavedPlans().filter(item => item.id !== saved.id))); renderSavedPlans(); });
    row.append(detail, load, remove); list.append(row);
  });
}
function saveCurrentPlan() {
  const plan = readPlan(); const error = validate(plan); if (error) { message.textContent = error; message.classList.add("show"); return; }
  const result = calculatePlan(plan); const record = { ...plan, id: Date.now(), monthlyContribution: result.monthlyContribution };
  localStorage.setItem("goalbridge-saved-plans", JSON.stringify([record, ...getSavedPlans()].slice(0, 12))); renderSavedPlans();
}
function downloadCurrentPlan() {
  const plan = readPlan(); const error = validate(plan);
  if (error) { message.textContent = error; message.classList.add("show"); return; }
  const result = calculatePlan(plan);
  const rows = [["GoalBridge Planning Studio", ""], ["Generated", new Date().toLocaleString("en-IN")], [], ["Goal", plan.goalName], ["Goal amount in today's money", plan.goalAmount], ["Years until needed", plan.years], ["Annual inflation (%)", plan.inflation], ["Annual return assumption (%)", plan.returnRate], ["Current savings", plan.currentSavings], ["Future goal cost", result.futureGoal], ["Future value of savings", result.futureSavings], ["Funding gap", result.fundingGap], ["Monthly contribution", result.monthlyContribution], ["Total contribution", result.totalContribution], ["Projected growth", result.projectedGrowth], ["Effective monthly rate (%)", result.monthlyRate * 100], [], ["Disclaimer", "Educational planning only. This is not investment advice and returns are not guaranteed."]];
  const csv = rows.map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\n");
  const link = document.createElement("a"); link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" })); link.download = `${plan.goalName.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "goalbridge-plan"}.csv`;
  document.body.append(link); link.click(); link.remove(); URL.revokeObjectURL(link.href);
}
function apply(plan) { fields.forEach(id => { document.getElementById(id).value = plan[id]; }); }
function submit(event, focusResult = true) {
  if (event) event.preventDefault();
  const plan = readPlan(); const error = validate(plan);
  if (error) { message.textContent = error; message.classList.add("show"); return false; }
  message.classList.remove("show"); const result = calculatePlan(plan); render(plan, result);
  if (focusResult) { const card = document.getElementById("resultCard"); card.focus({ preventScroll: true }); card.scrollIntoView({ behavior: "smooth", block: "start" }); }
  return true;
}

form.addEventListener("submit", submit);
document.getElementById("resetButton").addEventListener("click", () => { apply(DEFAULTS); message.classList.remove("show"); resetResults(); });
document.getElementById("downloadButton").addEventListener("click", downloadCurrentPlan);
document.getElementById("savePlanButton").addEventListener("click", saveCurrentPlan);
function hasCompleteRequiredInputs() {
  const ids = ["goalName", "goalAmount", "years", "inflation", "returnRate", "currentSavings"];
  return ids.every(id => document.getElementById(id).value.trim() !== "");
}
function autoUpdate() {
  if (!hasCompleteRequiredInputs()) return;
  const plan = readPlan(); const error = validate(plan);
  if (error) { message.textContent = error; message.classList.add("show"); return; }
  message.classList.remove("show"); render(plan, calculatePlan(plan));
}
fields.forEach(id => {
  const control = document.getElementById(id);
  control.addEventListener("input", autoUpdate);
  control.addEventListener("change", autoUpdate);
  control.addEventListener("blur", autoUpdate);
});
apply(DEFAULTS); resetResults(); renderSavedPlans();

// Exposed only for transparent browser-console verification and simple unit checks.
window.GoalBridgeCalculator = { calculatePlan, validate };
