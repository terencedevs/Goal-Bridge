# Goal Bridge -- Defect and Improvement Log

## Purpose

This log records weaknesses identified from the supplied Goal Bridge
Test Evidence workbook. It intentionally distinguishes
evidence/documentation weaknesses from confirmed application defects. No
fix is claimed unless it has actually been implemented and retested.

## D01 -- Projected Growth formula/documentation mismatch

**Type:** Calculation/documentation weakness\
**Source:** Supplied `Formula Reference` and `Test Cases` sheets.

**Issue:** The Formula Reference defines Projected Growth as
`Funding Gap − Total Contributions`. However, the Actual Projected
Growth values in several populated cases reconcile to
`Future Goal Cost − Existing Savings − Total Contributions`.

**Affected cases:** TC03, TC04, TC06, TC08, TC09 and TC10.

**Impact:** The expected calculation and the displayed/recorded
application metric may be interpreted differently. This can produce
false test failures or an incorrect description of what the metric
means.

**Required action:** Verify the live application/source implementation.
Decide which definition is authoritative, then update the application or
the documentation so the test oracle and product behavior agree.

**Retest:** PENDING.

**GitHub commit:** Add the real commit hash after the fix is
implemented.

------------------------------------------------------------------------

## D02 -- UI / Functional test evidence is incomplete

**Type:** Testing/documentation weakness

**Issue:** The supplied workbook contains a populated instruction for
manual UI/functional checks, but the `UI / Functional Check` field is
not completed for the supplied calculation cases.

**Impact:** The calculation evidence alone does not demonstrate that
labels, inputs, buttons, saved-plan behavior, CSV export and scenario UI
were manually verified.

**Required action:** Execute the listed manual checks in the live
application and record PASS/FAIL, date, browser and evidence screenshot
for each applicable case.

**Retest:** PENDING until manual testing is completed.

**GitHub commit:** Not required unless the testing process causes a
code/documentation change.

------------------------------------------------------------------------

## D03 -- Independent calculation verification still requires live-app confirmation

**Type:** Verification gap

**Issue:** The independent spreadsheet can reproduce the documented
formulas, but it cannot by itself prove which formula the live
application currently implements.

**Impact:** The Projected Growth discrepancy cannot be closed solely
from the supplied workbook.

**Required action:** Compare the live application's Projected Growth
value against both candidate formulas and then inspect the source
implementation.

**Retest:** PENDING.

**GitHub commit:** Add the real commit hash if the implementation is
changed.

------------------------------------------------------------------------

## Status summary

  -----------------------------------------------------------------------
  ID                      Issue                   Current status
  ----------------------- ----------------------- -----------------------
  D01                     Projected Growth        OPEN -- investigate
                          formula/documentation   
                          mismatch                

  D02                     UI/Functional evidence  OPEN -- execute tests
                          incomplete              

  D03                     Independent check needs OPEN -- verify
                          live-app confirmation   
  -----------------------------------------------------------------------

## Important

Do not change an OPEN item to FIXED/PASS until the actual change and
retest have been completed and, where relevant, linked to a real GitHub
commit.

## Author

Terence Keniya
