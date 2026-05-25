// =============================================================================
// MINI APPS KOL ANALYSIS — DATA LAYER
// =============================================================================
// This is the only file you need to edit when updating campaign numbers.
//
// DATA SOURCES:
//   1. Campaign spend   → Google Sheet "Mini Apps KOL Planning"
//                         Tabs: "Apr/May 2026", "Jun 2026", etc.
//                         Columns: Partner | KOLs | Deliverables | Vids Boosted
//                                  KOL Cost SGD | Boosting Cost SGD | Total SGD
//                                  KOL Cost USD | Boosting USD | Total USD
//
//   2. Budget & balance → "Budget at start of quarter" / "Balance" cells
//                         in each monthly tab (USD section)
//
//   3. Funnel metrics   → Mini Apps PMF Dashboard Google Sheet
//                         Tab: "Funnel_Weekly" (or run miniapps_dashboard.py)
//                         Columns: week_start | partner_name | weus |
//                                  total_orders | gmv_usd | impression_users
//                         Take 4-week avg BEFORE campaign start → baseline{}
//                         Take avg DURING campaign → campaign{}
//
//   4. Payment schedule → Contracts / PO records — update manually
// =============================================================================

const KOL_DATA = {

  // ── 1. BUDGET ──────────────────────────────────────────────────────────────
  // Source: "Budget at start of quarter" cell in the sheet (USD)
  quarterlyBudgetUSD: 100_000,

  // Campaign code (for reference)
  campaignCode: "S/GS/GZ/28/QPOF5/00MINIAPPPLA",

  // ── 2. PARTNERS ────────────────────────────────────────────────────────────
  // Must match partner_name values in the PMF dashboard (miniapps_dashboard.py)
  partners: ["Drivelah", "HelloRide", "Jolibox", "Redbus", "Firsty"],

  // ── 3. CAMPAIGNS ───────────────────────────────────────────────────────────
  // One entry per tab in the sheet. Add a new object below for each new period.
  campaigns: [
    {
      // ── Apr/May 2026 ──────────────────────────────────────────────────────
      // Source: "Apr/May 2026" tab in Mini Apps KOL Planning sheet
      period: "Apr/May 2026",
      months: 2,                              // campaign spans this many months
      monthLabels: ["Apr 2026", "May 2026"],  // for amortized spend view
      startDate: "2026-04-01",
      endDate: "2026-05-31",

      // Per-partner spend — one entry per partner row group in the tab.
      // totalSGD   = sum of (KOL Cost incl loading fee) + Boosting Cost for that partner
      // totalUSD   = KOL Cost USD column total for that partner
      // kols[]     = one entry per KOL row under that partner
      //   kolCostSGD = "KOL Cost (incl loading fee)" column value for that row
      //   vidsBoosted = "No of Vids Boosted" column
      // boostingSGD = "Boosting Cost" column for that partner group (shared across KOLs)
      partners: {
        "Drivelah": {
          totalSGD: 14_855,
          totalUSD: 3_750,
          boostingSGD: 4_855,
          kols: [
            { name: "Darjo", deliverables: "1 TT", vidsBoosted: 1, kolCostSGD: 10_000 },
          ],
        },
        "HelloRide": {
          totalSGD: 13_710,
          totalUSD: 7_500,
          boostingSGD: 9_710,
          kols: [
            { name: "Tiffanie", deliverables: "1 IG sync TT", vidsBoosted: 2, kolCostSGD: 4_000 },
          ],
        },
        "Jolibox": {
          totalSGD: 26_335,   // ← verify: boosting covers both Amanda and Reefkey
          totalUSD: 11_250,   // USD = KOL fees only; boosting billed in SGD ("See in SGD")
          boostingSGD: 15_085, // approximate — confirm exact split from sheet
          kols: [
            { name: "Amanda",  deliverables: "1 IG sync TT", vidsBoosted: 2, kolCostSGD: 9_000 },
            { name: "Reefkey", deliverables: "1 IG sync TT", vidsBoosted: 1, kolCostSGD: 2_250 },
          ],
        },
        "Redbus": {
          totalSGD: 10_763,
          totalUSD: 5_625,
          boostingSGD: 7_263,
          kols: [
            { name: "Melody",  deliverables: "1 TT",         vidsBoosted: 0.5, kolCostSGD: 1_250 },
            { name: "Reefkey", deliverables: "1 IG sync TT", vidsBoosted: 1,   kolCostSGD: 2_250 },
          ],
        },
        "Firsty": {
          totalSGD: 3_678,
          totalUSD: 1_875,
          boostingSGD: 2_428,
          kols: [
            { name: "Melody", deliverables: "1 TT", vidsBoosted: 0.5, kolCostSGD: 1_250 },
          ],
        },
      },
    },

    {
      // ── Jun 2026 ──────────────────────────────────────────────────────────
      // Source: "Jun 2026" tab in Mini Apps KOL Planning sheet
      // ← Fill in amounts when Jun contracts are finalised
      period: "Jun 2026",
      months: 1,
      monthLabels: ["Jun 2026"],
      startDate: "2026-06-01",
      endDate: "2026-06-30",
      partners: {
        "Redbus":    { totalSGD: 0, totalUSD: 0, boostingSGD: 0, kols: [] },
        "Firsty":    { totalSGD: 0, totalUSD: 0, boostingSGD: 0, kols: [] },
        "HelloRide": { totalSGD: 0, totalUSD: 0, boostingSGD: 0, kols: [] },
      },
    },
  ],

  // ── 4. PAYMENT SCHEDULE ────────────────────────────────────────────────────
  // Source: contracts / PO records — update manually.
  // status: "paid" | "pending" | "overdue"
  // amountUSD: payment amount in USD for this milestone
  payments: [
    { partner: "Drivelah",  kol: "Darjo",    amountUSD: 3_750, dueDate: "2026-04-01", milestone: "50% on signing",   status: "pending" },
    { partner: "Drivelah",  kol: "Darjo",    amountUSD: 3_750, dueDate: "2026-05-15", milestone: "50% on delivery",  status: "pending" },
    { partner: "HelloRide", kol: "Tiffanie", amountUSD: 3_750, dueDate: "2026-04-01", milestone: "50% on signing",   status: "pending" },
    { partner: "HelloRide", kol: "Tiffanie", amountUSD: 3_750, dueDate: "2026-05-15", milestone: "50% on delivery",  status: "pending" },
    { partner: "Jolibox",   kol: "Amanda",   amountUSD: 5_625, dueDate: "2026-04-01", milestone: "50% on signing",   status: "pending" },
    { partner: "Jolibox",   kol: "Amanda",   amountUSD: 5_625, dueDate: "2026-05-15", milestone: "50% on delivery",  status: "pending" },
    { partner: "Redbus",    kol: "Melody",   amountUSD: 2_812, dueDate: "2026-04-01", milestone: "50% on signing",   status: "pending" },
    { partner: "Redbus",    kol: "Melody",   amountUSD: 2_813, dueDate: "2026-05-15", milestone: "50% on delivery",  status: "pending" },
    { partner: "Firsty",    kol: "Melody",   amountUSD: 937,   dueDate: "2026-04-01", milestone: "50% on signing",   status: "pending" },
    { partner: "Firsty",    kol: "Melody",   amountUSD: 938,   dueDate: "2026-05-15", milestone: "50% on delivery",  status: "pending" },
  ],

  // ── 5. FUNNEL DATA (incrementality correlation) ────────────────────────────
  // Source: Mini Apps PMF Dashboard → "Funnel_Weekly" tab
  //
  // How to populate:
  //   a) Open the PMF Dashboard sheet (or run miniapps_dashboard.py)
  //   b) Go to the "Funnel_Weekly" tab
  //   c) For each partner, average the 4 weeks BEFORE the campaign → baseline
  //   d) For each partner, average the weeks DURING the campaign → campaign
  //
  // ⚠ Correlation only — not true incrementality. Values are confounded by
  //   seasonality, new features, and concurrent activity.
  funnel: {
    baseline: {  // 4-week avg before 2026-04-01 (i.e. approx Jan–Mar 2026)
      // weu = weekly engaged users | orders = completed orders | gmvUSD = GMV in USD
      "Drivelah":  { weu: null, orders: null, gmvUSD: null },
      "HelloRide": { weu: null, orders: null, gmvUSD: null },
      "Jolibox":   { weu: null, orders: null, gmvUSD: null },
      "Redbus":    { weu: null, orders: null, gmvUSD: null },
      "Firsty":    { weu: null, orders: null, gmvUSD: null },
    },
    campaign: {  // avg DURING Apr/May 2026 campaign (2026-04-01 to 2026-05-31)
      "Drivelah":  { weu: null, orders: null, gmvUSD: null },
      "HelloRide": { weu: null, orders: null, gmvUSD: null },
      "Jolibox":   { weu: null, orders: null, gmvUSD: null },
      "Redbus":    { weu: null, orders: null, gmvUSD: null },
      "Firsty":    { weu: null, orders: null, gmvUSD: null },
    },
  },
};
