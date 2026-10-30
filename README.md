# Metro Travels & Tours — Accounting (GitHub cloud version)

One web page hosted free on **GitHub Pages**. Your accounting data is saved automatically to a **private GitHub repository** (`data.json`), so every computer you open it on shows the same data. A copy is also kept in each browser, so it **keeps working with no internet** and uploads when you are back online. It can be installed like a program (Chrome/Edge → ⬇ Install).

| File | What it is |
|---|---|
| `index.html`, `sw.js`, `manifest.webmanifest`, `icon-*.png` | the program (no data inside) → **public** website repository |
| `config.js` | optional: your GitHub user name + data repository name |

## One-time setup (about 10 minutes)
1. **Private data repository** — github.com → New repository → name `metro-data` → **Private** → Create (leave it empty; the app creates `data.json` itself).
2. **Access token** — github.com → your photo → Settings → Developer settings → Personal access tokens → *Fine-grained tokens* → Generate. Repository access: **Only select repositories → metro-data**. Permissions: **Contents → Read and write**. Longest expiry. Copy the token (`github_pat_…`).
3. **Website repository** — New **public** repository, e.g. `metro-accounts`. Upload all files from this folder (`index.html`, `sw.js`, `manifest.webmanifest`, `icon-192.png`, `icon-512.png`, `config.js`). Settings → Pages → Deploy from a branch → `main` / root → Save. After a minute it is live at `https://YOUR-USERNAME.github.io/metro-accounts/`.
4. **First open** — the *Cloud storage* box appears: enter user name, `metro-data`, the token → **Save & Connect**. If this browser already holds your data, choose **Upload this computer's data**. Then install the app (⬇ Install / browser menu).

## Every other computer
Open the same address → Save & Connect with the same details (token). The latest data loads automatically.

## Daily use
* The pill at the bottom right shows **☁ Saved to GitHub**, *Saving…*, *Offline — will upload later*, or *Newer data on GitHub*.
* Every change uploads 2–3 seconds after you make it. If another computer saved newer data you get a **Load now** bar. If two computers changed data at the same time you are asked which copy to keep (the other is kept as a safety copy: ☁ pill → *Safety copies…*).
* Still use **BACKUP DATA** now and then for your own file copy. GitHub also keeps every earlier version of `data.json` in the repository history.
* Do not put `data.json` in the public repository. Never share the token.

## Menu & text size
Orange **☰ Menu** button (or Ctrl+B) switches between a slim icon ribbon and the full menu; **A− / A+** (bottom right) changes the text size.
