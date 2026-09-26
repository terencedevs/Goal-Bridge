# Test and Audit Evidence Template

Run these in the deployed app and fill the Actual result, Status, date, browser, and evidence-link columns before submitting.

| # | Test | Expected result | Actual result | Status | Evidence |
|---|---|---|---|---|---|
| 1 | Supplied GoalBridge case | All six outputs update; monthly plan is positive | Outputs changes | Pass | https://photos.app.goo.gl/RaUcRb7aQQUvCsF29 |
| 2 | Set return to 0% | Monthly amount equals funding gap divided by months; no error | Both Equals | Pass | https://photos.app.goo.gl/wLQaTbyRowjXenRX8 |
| 3 | Blank goal name | Friendly validation explains the missing label | Can't Calculate without name | Pass | https://photos.app.goo.gl/CPPgUHCDcAgXoNt96 |
| 4 | Negative goal amount | Friendly validation prevents calculation | Calculation Prevented | Pass | https://photos.app.goo.gl/8yXP8zhBstfXegzE6 |
| 5 | Horizon of zero | Friendly validation prevents calculation | Prevented | Pass | https://photos.app.goo.gl/i9ms1zJwsNf1kcw58 |
| 6 | Inflation of 26% | Friendly validation prevents calculation | Prevented | Pass | https://photos.app.goo.gl/F9WtBmBjgyJJm8Cf8 |
| 7 | Current savings above goal | Results remain finite and funding gap never goes below ₹0 | It's 0 | Pass | https://photos.app.goo.gl/WoMZZDh9TurSAWQF7 |
| 8 | Change each numeric input | Results change; no hard-coded values | Changes whole output | Pass | https://photos.app.goo.gl/xWuaK2kaqxmbVB5P6 |
| 9 | Mobile viewport (360 px) | No horizontal scroll; controls remain usable | Yes | Pass | https://photos.app.goo.gl/zaucFx3nPJXUUGFC6 |
| 10 | Desktop viewport (1440 px) | Two-column planning layout is readable | Yes | Pass | <img width="1900" height="911" alt="image" src="https://github.com/user-attachments/assets/345506d3-fee0-452d-b4b6-edc52b2115ee" />
 |
| 11 | Keyboard-only navigation | Focus ring is visible; Calculate, Reset, Print work | Workable | Pass | <img width="1900" height="907" alt="image" src="https://github.com/user-attachments/assets/e9ccf1f2-2ffb-4eee-a628-82695272107b" />
 |
| 12 | Second browser/engine | Core calculation and styling work | Explorer | Pass | <img width="1917" height="1078" alt="image" src="https://github.com/user-attachments/assets/afd56611-2292-4c77-9b58-b42438ae391a" />
 |
| 13 | Cash-flow review | Enter income and commitments; plan shows surplus, buffer, and an appropriate fit status | Same in Different browsers | Pass | <img width="1917" height="1078" alt="image" src="https://github.com/user-attachments/assets/6d4659a9-ccbb-4111-95bc-9f4984adddc3" />
 |
| 14 | Saved-plan workspace | Save a plan, refresh the browser, then load the saved plan successfully | It Loads | Pass | <img width="1917" height="1077" alt="image" src="https://github.com/user-attachments/assets/1e925a39-9485-4172-b73f-812cec4770d5" />
 |

## Independent calculation check

For the supplied case, use a spreadsheet with the formulas in the README. Keep unrounded values throughout and compare the final monthly contribution to the app; a small difference can arise if a spreadsheet uses a nominal monthly rate (`annual / 12`) rather than this app's effective monthly rate.

## Defect and improvement log

| Issue found | Impact | Fix | Retest result | Related commit |
|---|---|---|---|---|
| Example: zero annual return divided by the monthly rate | Calculation failure | Added `gap / months` zero-rate branch | 0% test passes |  |
| Example: mobile metric cards crowded at 360 px | Reduced readability | Changed metric grid to two columns | Mobile test passes |  |
