# Form Filler

A one-page web app for agents to fill Great Eastern Life (Malaysia) servicing forms from the ePartner policy copy, then download the official PDF filled in, ready to print and sign.

## Forms

| Form | Use it to |
| --- | --- |
| NBZ-FNOMI-V07-082025 · Nomination | Appoint or change nominees and trustees |
| CSD-PSF01A-V07-082025 · Person changes | Change address, email or phone; correct name, MyKad, date of birth; TIN; change of signature |
| CSD-PSF01-V11-082025 · Contractual changes | Payment mode or method, term, conversion, reduce cover or premium, cancel rider, paid-up, vesting, dates |
| CSD-PSF02-V14-082025 · Contractual changes with health declaration | Increase or add cover, change premium, appeal a loading |

## How it works

- Everything runs in the agent's browser. Customer details are never sent to a server; a half-filled form is kept only in that browser.
- Reading the ePartner PDF and MyKad photos loads open-source readers (pdf.js, Tesseract) from a CDN, so those two features need internet. Filling and downloading the form work offline.
- Health and disclosure questions, dates and signatures are always left for the customer to complete by hand.

## Use

Open the site, pick the form, drop in the policy copy, fill what is changing, and tap **Download filled form**. Check the printout against the source documents before the customer signs.
