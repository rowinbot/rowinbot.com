# Font licences

Checked 2026-11-26.

## Cabinet Grotesk (display and sans)

Source: Fontshare, Indian Type Foundry. Fontshare's API lists `license_type: itf_ffl` for it (`https://api.fontshare.com/v2/fonts?slugs=cabinet-grotesk`). Licence page: https://www.fontshare.com/licenses/itf-ffl (client-rendered, so the text below was read from a copy of the same "Free Font End User License Agreement", last updated 22 March 2021, at https://git.house-of-lucas.net/al/pages/src/commit/ceb477e51f99b4099e9c5e51f8caa4894d56375c/site/assets/fonts/Rowan_Complete/License/FFL.txt). Re-read the live page before relying on this.

Relevant text, verbatim:

> In addition to direct download, Fontshare also offers these free fonts via Fonthsare API using a code. In this case, the Font Software is delivered directly from the servers used by Indian Type Foundry to the Licensee's website, without the Licensee having to download the Font Software.

> 01. Grant of License. You are hereby granted a non-exclusive, non-assignable, non-transferrable, terminable license to access, download and use the Font Software for your personal or commercial use for an unlimited period of time for free of charge. You may use the font Software in any media (including Print, Web, Mobile, Digital, Apps, ePub, Broadcasting and OEM) at any scale, at any location worldwide.

> 02. Limitations of usage. [...] The Fonts may not - beyond the permitted copies and the uses defined herein - be distributed, duplicated, loaned, resold or licensed in any way [...] This includes [...] uploading them in a public server or making the fonts available on peer-to-peer networks. [...] You are not allowed to transmit the Font Software over the Internet in font serving or for font replacement by means of technologies such as but not limited to EOT, Cufon, sIFR or similar technologies that may be developed in the future without the prior written consent of the Licensor.

Finding: commercial and web use is allowed. Serving the files from our own host is not granted. Section 02 bars "uploading them in a public server" and font serving over the Internet without written consent, and this repository is public. The Fontshare API is the delivery path the licence describes. Decision: Cabinet Grotesk stays on the Fontshare API, loaded from a `<link>` in the document head (`app/root.tsx`). Self-hosting needs written consent from Indian Type Foundry.

## IBM Plex Mono (mono)

Licence: SIL Open Font License 1.1, copyright 2017 IBM Corp. with Reserved Font Name "Plex". Text: `app/assets/fonts/IBM-Plex-OFL.txt`, upstream https://github.com/IBM/plex/blob/master/LICENSE.txt. Self-hosting, redistribution and embedding are permitted. The files in `app/assets/fonts/` are the unmodified latin and latin-ext woff2 subsets served by Google Fonts (v23).
