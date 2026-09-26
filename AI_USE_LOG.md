# Goal Bridge -- AI Use Log

## Purpose

This log documents how AI assistance was used during the Goal Bridge
project workflow. It is intended to accompany the source repository,
test evidence and project report.

> **Evidence note:** The supplied `Goal Bridge Test Evidence.xlsx`
> contains the testing structure and calculation evidence, but it does
> not contain a verbatim history of every AI prompt. Therefore, this
> document records the project activities and decisions that are
> supported by the project workflow; exact prompt wording should be
> added from the user's chat history if required by the evaluator.

## 1. Project planning

AI assistance was used to help structure the Goal Bridge concept,
identify relevant financial inputs/outputs, and organize the submission
requirements.

## 2. UI and feature development

AI assistance was used during development/refinement of the Goal Bridge
interface and supporting functionality. The final implementation should
be treated as the source of truth for what was actually shipped.

## 3. Calculation logic

AI assistance was used to review and structure the documented financial
calculations. The supplied test workbook records the intended formulas
for future goal cost, future value of savings, funding gap, effective
monthly rate, monthly plan/SIP, total contributions, projected growth,
available cash, plan-use percentage and buffer.

## 4. Test-case design

AI assistance was used to help organize test scenarios covering normal
calculations and edge cases such as: - 0% return - zero existing
savings - fully funded goals - high inflation - high return - zero
income - validation/edge conditions

The supplied workbook contains 10 populated calculation cases and a
coverage checklist.

## 5. Verification and independent checking

The supplied workbook was reviewed to build a separate independent
calculation check. The independent workbook intentionally preserves the
Formula Reference rather than silently changing it.

A notable reconciliation issue was identified: the workbook's documented
Projected Growth formula is `Funding Gap − Total Contributions`, while
several Actual Projected Growth values reconcile to
`Future Goal Cost − Existing Savings − Total Contributions`. This
requires direct verification in the live application/source before final
submission.

## 6. Corrections and decision-making

AI assistance was used to identify where documentation, testing evidence
and calculation expectations needed clarification. Human verification is
still required before marking any application behavior as PASS.

## 7. Human verification

AI output was not treated as proof that the live application works. The
final evidence should come from: - actual live-app test execution -
screenshots - independent spreadsheet calculations - browser checks -
accessibility checks - deployment/console checks - documented retests
after fixes

## 8. Final verification checklist

Before submission: - \[ \] All required test cases have actual
results. - \[ \] UI / Functional checks are completed. - \[ \]
Independent calculation check is reviewed. - \[ \] Projected Growth
discrepancy is resolved/documented. - \[ \] At least two real defects or
weaknesses are documented. - \[ \] Fixes are retested and linked to real
GitHub commits. - \[ \] Browser and responsive evidence is attached. -
\[ \] Accessibility evidence is attached. - \[ \] Security/privacy
review is completed.

## Author

Terence Keniya
