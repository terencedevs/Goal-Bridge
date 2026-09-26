# Goal Bridge -- Accessibility Review

## Scope

This checklist covers the accessibility evidence required for the Goal
Bridge submission. The supplied test workbook identifies keyboard
navigation as a manual functional check and the submission brief
requires keyboard navigation, focus visibility and colour-contrast
review.

## Checklist

  -------------------------------------------------------------------------
  Area              What to verify    Status            Evidence
  ----------------- ----------------- ----------------- -------------------
  Keyboard          All important     PENDING           Add screenshot
  navigation        controls can be                     
                    reached using                       
                    Tab/Shift+Tab                       

  Focus visibility  Keyboard focus is PENDING           Add screenshot
                    visibly                             
                    identifiable                        

  Input labels      Inputs have       PENDING           Add screenshot
                    clear, readable                     
                    labels                              

  Result            Calculated        PENDING           Add screenshot
  readability       results can be                      
                    read without                        
                    ambiguity                           

  Button usability  Primary controls  PENDING           Add screenshot
                    are identifiable                    
                    and usable                          

  Colour contrast   Text and          PENDING           Add
                    important                           screenshot/manual
                    controls remain                     review
                    readable against                    
                    their backgrounds                   

  Mobile layout     Content remains   PENDING           Add mobile
                    usable at the                       screenshot
                    tested mobile                       
                    width                               

  Desktop layout    Content remains   PENDING           Add desktop
                    usable at the                       screenshot
                    tested desktop                      
                    width                               

  Reduced motion    If motion is      PENDING           Add evidence if
                    present, verify                     applicable
                    the application's                   
                    reduced-motion                      
                    behavior                            
  -------------------------------------------------------------------------

## Test procedure

1.  Open the deployed Goal Bridge application.
2.  Use the keyboard only and move through the form with `Tab` and
    `Shift+Tab`.
3.  Confirm that the current focus is visible.
4.  Check that labels, inputs, buttons and calculated results are
    readable.
5.  Review the page at the required mobile and desktop widths.
6.  Record actual results rather than assuming compliance.

## Important limitation

This document is a checklist, not proof that the application passed
every accessibility check. The `PENDING` items must be replaced with
actual results after testing.

## Author

Terence Keniya
