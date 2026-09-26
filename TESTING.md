# Test and Audit Evidence Template

Run these in the deployed app and fill the Actual result, Status, date, browser, and evidence-link columns before submitting.

| # | Test | Expected result | Actual result | Status | Evidence |
|---|---|---|---|---|---|
| 1 | Supplied GoalBridge case | All six outputs update; monthly plan is positive |  |  |  |
| 2 | Set return to 0% | Monthly amount equals funding gap divided by months; no error |  |  |  |
| 3 | Blank goal name | Friendly validation explains the missing label |  |  |  |
| 4 | Negative goal amount | Friendly validation prevents calculation |  |  |  |
| 5 | Horizon of zero | Friendly validation prevents calculation |  |  |  |
| 6 | Inflation of 26% | Friendly validation prevents calculation |  |  |  |
| 7 | Current savings above goal | Results remain finite and funding gap never goes below ₹0 |  |  |  |
| 8 | Change each numeric input | Results change; no hard-coded values |  |  |  |
| 9 | Mobile viewport (360 px) | No horizontal scroll; controls remain usable |  |  |  |
| 10 | Desktop viewport (1440 px) | Two-column planning layout is readable |  |  |  |
| 11 | Keyboard-only navigation | Focus ring is visible; Calculate, Reset, Print work |  |  |  |
| 12 | Second browser/engine | Core calculation and styling work |  |  |  |
| 13 | Cash-flow review | Enter income and commitments; plan shows surplus, buffer, and an appropriate fit status |  |  |  |
| 14 | Saved-plan workspace | Save a plan, refresh the browser, then load the saved plan successfully |  |  |  |

## Independent calculation check

For the supplied case, use a spreadsheet with the formulas in the README. Keep unrounded values throughout and compare the final monthly contribution to the app; a small difference can arise if a spreadsheet uses a nominal monthly rate (`annual / 12`) rather than this app's effective monthly rate.

## Defect and improvement log

| Issue found | Impact | Fix | Retest result | Related commit |
|---|---|---|---|---|
| Example: zero annual return divided by the monthly rate | Calculation failure | Added `gap / months` zero-rate branch | 0% test passes |  |
| Example: mobile metric cards crowded at 360 px | Reduced readability | Changed metric grid to two columns | Mobile test passes |  |
