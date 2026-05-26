# Mini Apps KOL Analysis Dashboard

Interactive dashboard for tracking KOL campaign performance across Mini Apps partners.

## Files

| File | Purpose |
|---|---|
| `data.js` | **All input data lives here.** Campaign spend, timeline dates, funnel output. |
| `index.html` | Dashboard UI — reads from `data.js` only. |
| `scripts/sync_funnel.py` | **Pulls funnel metrics from local PMF xlsx** → writes `funnel{}` in data.js |
| `Mini Apps PMF Dashboard *.xlsx` | Local PMF export (gitignored). Place in `KOL Analysis/` folder. |

## Where funnel data is read from

| What | Where |
|---|---|
| **Xlsx path** | `data.js → funnelSource.pmfDashboardXlsx` |
| **Code that reads xlsx** | `scripts/sync_funnel.py` (Python + openpyxl) |
| **Dashboard (browser)** | Reads pre-computed `funnel{}` from `data.js` — does **not** open the xlsx directly |

When you download a new PMF export (e.g. `Mini Apps PMF Dashboard 25 May.xlsx`):
1. Save it in the `KOL Analysis/` folder
2. Update `funnelSource.pmfDashboardXlsx` in `data.js`
3. Run `python3 scripts/sync_funnel.py`

## Campaign timeline & baseline (edit in data.js)

Section: **`campaignTimeline`** — one block per partner:

```js
"Drivelah": {
  baselineAnchor: "boost",   // "post" | "boost" — which date anchors baseline
  postDate:   "2026-04-10",  // KOL content posted
  boostStart: "2026-04-10",  // paid boost starts
  boostEnd:   "2026-05-10",  // paid boost ends
  kols: ["Dargo"],
},
```

| Rule | Definition |
|---|---|
| **Baseline anchor** | `postDate` if `baselineAnchor: "post"`, else `boostStart` |
| **Baseline** | 4 complete Mon-start weeks immediately **before** anchor week |
| **Uplift window** | Weekly avg over weeks overlapping `boostStart → boostEnd` |

After editing dates, run:
```bash
cd "KOL Analysis"
pip3 install -r scripts/requirements.txt   # once
python3 scripts/sync_funnel.py
```

Output lands in `funnel.baseline`, `funnel.campaign`, and `funnel.meta` (exact weeks used per partner).

## How to update spend data

### 1. Campaign spend (each period)
Source: **Mini Apps KOL Planning** Google Sheet → monthly tabs

Edit `campaigns[]` in `data.js` — totals, KOL rows, boosting costs.

### 2. Budget
```js
quarterlyBudgetUSD: 160_000,
balanceUSD: 100_000,
```

## Keeping data.js private (GitHub Actions secret)

`data.js` is gitignored. Deploy workflow injects it from the `DATA_JS` secret.

After any local update (spend **or** funnel sync), paste full `data.js` into the GitHub secret and re-run deploy.

Live URL: `https://dionewoon-ai.github.io/KOL-Analysis/`

## Dashboard sections

| # | Section | Data source |
|---|---|---|
| 1 | Summary KPIs | `campaigns[]` |
| 2 | Ad Spend Efficiency | `campaigns[].partners` |
| 3 | Spending Cadence | Budget vs spend |
| 4 | Partner Recommendations | Rule-based on efficiency |
| 5 | Incrementality | `funnel{}` via `sync_funnel.py` + `campaignTimeline` |
| 6 | Monthly Amortized Spend | `campaigns[]` ÷ months |
