# Mini Apps KOL Analysis Dashboard

Interactive dashboard for tracking KOL campaign performance across Mini Apps partners.

## Files

| File | Purpose |
|---|---|
| `data.js` | **All input data lives here.** Update this file when pulling new numbers from the sheet. |
| `index.html` | Dashboard UI — reads from `data.js`. No edits needed unless adding new sections. |

## How to update data

### 1. Campaign spend (each period)
Source: **Mini Apps KOL Planning** Google Sheet → monthly tabs

In `data.js → campaigns[]`, find the matching period entry and update:
- `totalSGD` / `totalUSD` per partner (from SGD and USD Total columns)
- `boostingSGD` per partner (from Boosting Cost column)
- `kols[]` per partner — add/remove KOL rows as needed
- `kolCostSGD` per KOL (from KOL Cost incl loading fee column)
- `vidsBoosted` per KOL (from No of Vids Boosted column)

To add a new period (e.g. Jul 2026), copy the `Jun 2026` block at the bottom of `campaigns[]` and fill in the numbers.

### 2. Budget
Source: **"Budget at start of quarter"** cell in the sheet (USD section)

```js
quarterlyBudgetUSD: 100_000,  // ← update this
```

### 3. Payment schedule
Source: contracts / PO records — update manually

```js
payments: [
  { partner: "...", kol: "...", amountUSD: 0, dueDate: "YYYY-MM-DD", milestone: "...", status: "pending" },
]
```

`status` values: `"paid"` | `"pending"` | `"overdue"`

Overdue is also auto-detected (pending past due date turns red).

### 4. Funnel data (incrementality)
Source: **Mini Apps PMF Dashboard** Google Sheet → `Funnel_Weekly` tab  
(or run `miniapps_dashboard.py` to refresh it)

Steps:
1. Open `Funnel_Weekly` tab
2. For each partner, average `weus` / `total_orders` / `gmv_usd` for the **4 weeks before** the campaign start → put in `funnel.baseline`
3. Average the same metrics **during** the campaign weeks → put in `funnel.campaign`

```js
funnel: {
  baseline: {
    "HelloRide": { weu: 1200, orders: 340, gmvUSD: 8500 },  // ← fill from Funnel_Weekly
    ...
  },
  campaign: {
    "HelloRide": { weu: 1450, orders: 410, gmvUSD: 10200 },
    ...
  },
}
```

Once populated, the Incrementality section shows correlated deltas and an implied spend ROI.

> ⚠️ **Correlation only** — not true incrementality. Confounded by seasonality, feature launches, and other concurrent activity.

## Keeping data.js private (GitHub Actions secret)

`data.js` is gitignored — real figures never appear in the repo. The deploy workflow
injects it from a GitHub Actions secret at build time.

**One-time setup:**

1. Copy the full contents of your local `data.js`
2. Go to **github.com/dionewoon-ai/KOL-Analysis → Settings → Secrets and variables → Actions**
3. Click **New repository secret**
   - Name: `DATA_JS`
   - Value: paste the full `data.js` contents
4. Click **Add secret**
5. Go to **Actions tab → Deploy to GitHub Pages → Re-run jobs** (or push any commit)

The dashboard will be live at `https://dionewoon-ai.github.io/KOL-Analysis/`.
When you update spend numbers, update both your local `data.js` **and** the `DATA_JS` secret.

> The deployed site itself serves `data.js` publicly — anyone with the URL can view-source
> and see the numbers. What's protected is the git history and the repo code.
> For a fully private dashboard, use the local `open index.html` method instead.

---

## Hosting on GitLab Pages

1. Push this folder to a GitLab repo
2. Add a `.gitlab-ci.yml`:

```yaml
pages:
  stage: deploy
  script:
    - mkdir -p public
    - cp index.html data.js public/
  artifacts:
    paths:
      - public
  only:
    - main
```

3. GitLab Pages will serve `index.html` at `https://<group>.gitlab.io/<repo>/`

## Dashboard sections

| # | Section | Data source |
|---|---|---|
| 1 | Summary KPIs | Computed from campaigns[] |
| 2 | Ad Spend Efficiency | campaigns[].partners — spend, boosting, vids per partner |
| 3 | Spending Cadence | Actual spend vs equal-share budget reference |
| 4 | Partner Recommendations | Rule-based on SGD/vid efficiency and share of wallet |
| 5 | Incrementality | funnel.baseline vs funnel.campaign (populate manually) |
| 6 | Monthly Amortized Spend | campaigns[] spend ÷ months, spread across monthLabels |
| 7 | Payment Schedule | payments[] — due dates and statuses |
