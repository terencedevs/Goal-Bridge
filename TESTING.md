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

| Field             | Details                                                                                                                          |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Issue**         | The application initially displayed predetermined/default values instead of the actual values calculated from the user's inputs. |
| **Impact**        | Users could not clearly see the actual result of their inputs, reducing the usefulness of the calculator.                        |
| **Fix**           | Updated the calculation and output logic so that the calculated values are displayed correctly based on the user's inputs.       |
| **Retest Result** | Tested with different input values and confirmed that the displayed calculated values changed correctly according to the inputs. |
| **GitHub Commit** | `[f6617ac]`                                                                                                             |

| Field             | Details                                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Issue**         | The original website did not provide a short explanation of what SIP (Systematic Investment Plan) is.              |
| **Impact**        | Users unfamiliar with SIP might not understand the purpose of the calculator or the information being displayed.   |
| **Fix**           | Added a short explanation of SIP and relevant information to make the website easier for users to understand.      |
| **Retest Result** | Checked the updated website and confirmed that the SIP explanation is displayed correctly in the relevant section. |
| **GitHub Commit** | `[3ef740e]`                                                                                               |

| Field             | Details                                                                                                                       |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Issue**         | During testing, the Save option was not functioning correctly and did not save the information as intended.                   |
| **Impact**        | Users could not reliably save their information/results, affecting the usability of the application.                          |
| **Fix**           | Corrected the Save functionality so that the relevant information can be saved properly.                                      |
| **Retest Result** | Tested the Save option again and confirmed that the information was saved correctly and the functionality worked as intended. |
| **GitHub Commit** | `[0bd3112]`                                                                                                          |
