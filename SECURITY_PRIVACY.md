# Goal Bridge -- Security & Privacy Review

## Scope

This review addresses the submission requirement to avoid secrets,
unnecessary data collection and unsafe external scripts.

## Checklist

  ---------------------------------------------------------------------------------
  Area              Review                      Status            Evidence / Action
  ----------------- --------------------------- ----------------- -----------------
  Secrets           Check source repository for PENDING           Search repository
                    API keys, passwords and                       before submission
                    private credentials                           

  Data collection   Confirm whether the         PENDING           Review
                    application collects or                       implementation
                    transmits personal data                       and network
                                                                  behavior

  Local storage     If plans are stored         PENDING           Review browser
                    locally, confirm what data                    storage
                    is stored and where                           implementation

  External scripts  Review third-party          PENDING           Review source and
                    scripts/dependencies for                      network requests
                    necessity and origin                          

  Financial         Confirm the                 PENDING           Add screenshot
  disclaimer        educational/informational                     
                    disclaimer is visible                         

  User privacy      Confirm no unnecessary      PENDING           Manual review
                    personal information is                       
                    requested                                     

  Public repository Confirm no private          PENDING           Repository review
                    information is committed                      
  ---------------------------------------------------------------------------------

## Evidence-based note

The supplied Test Evidence workbook does not provide enough information
to prove all security/privacy checks. These checks therefore require
inspection of the live application and repository before final
submission.

## Recommended repository check

Before submission, search the repository for common secret patterns such
as: - API keys - access tokens - passwords - private URLs containing
credentials - `.env` files containing secrets

Do not paste any secret values into this document.

## Author

Terence Keniya
