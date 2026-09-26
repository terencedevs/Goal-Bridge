# GoalBridge Planning Studio

A private, educational Goal-Based Investment Planner for first-time earners in India. It estimates the monthly contribution needed to work toward a future goal; it does not recommend investments or promise returns.

## Features

- INR-formatted inputs and results, compatible with the supplied GoalBridge demonstration case
- Starts with a blank planning form; results calculate instantly once all required values are valid
- Responsive, keyboard-accessible finance-professional UI with visible focus states and reduced-motion support
- Input validation for missing, negative, extreme, and invalid horizon values
- Effective monthly-rate calculation, including a robust 0% return fallback
- Conservative, base, and optimistic scenario comparison
- Optional cash-flow fit check using monthly take-home income and essential commitments
- Save, reload, and remove up to 12 private goal plans in browser storage; no account, API, or data collection
- Print/save summary and local-only browser persistence
- Download the current assumptions and calculations as a finance-ready CSV record

## Finance model

- Future goal = current goal cost × `(1 + inflation)^years`
- Effective monthly investment rate = `(1 + annual return)^(1/12) − 1`
- Future value of current savings = savings × `(1 + monthly rate)^months`
- Funding gap = max(0, future goal − future value of savings)
- Monthly contribution = `gap × monthly rate / ((1 + monthly rate)^months − 1)`; at 0% return it is `gap / months`

The displayed projected growth is the inflation-adjusted goal amount less current savings and total monthly contributions. All results are rounded for display only; calculations retain precision.

## Run locally

Open `index.html` in a modern browser. No install, build tooling, framework, or external API is required.

## Testing summary

See `TESTING.md` for suggested execution evidence. The calculator is also exposed in the browser console as `GoalBridgeCalculator.calculatePlan()` for independent checks.

## Assumptions and limitations

The inflation and return inputs are illustrative assumptions. Returns may vary, taxes, fees, contribution timing, and withdrawals are not modelled. The scenario range is sensitivity analysis, not a forecast.

## Educational-use disclaimer

This tool is for education and planning only. It is not investment, tax, or financial advice and does not guarantee outcomes.

## Author

Student submission for Capstone Project Nexus.
