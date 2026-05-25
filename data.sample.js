// =============================================================================
// data.sample.js — SCHEMA REFERENCE ONLY. No real figures here.
// =============================================================================
// Copy this file to data.js and fill in real values.
// data.js is gitignored — add it as the DATA_JS secret in GitHub Actions
// (repo Settings → Secrets and variables → Actions → New repository secret).
// =============================================================================

const KOL_DATA = {
  quarterlyBudgetUSD: 0,
  campaignCode: "",
  partners: ["Drivelah", "HelloRide", "Jolibox", "Redbus", "Firsty"],

  campaigns: [
    {
      period: "Apr/May 2026",
      months: 2,
      monthLabels: ["Apr 2026", "May 2026"],
      startDate: "2026-04-01",
      endDate: "2026-05-31",
      partners: {
        "Drivelah": {
          totalSGD: 0, totalUSD: 0, boostingSGD: 0,
          kols: [{ name: "", deliverables: "", vidsBoosted: 0, kolCostSGD: 0 }],
        },
        "HelloRide": {
          totalSGD: 0, totalUSD: 0, boostingSGD: 0,
          kols: [{ name: "", deliverables: "", vidsBoosted: 0, kolCostSGD: 0 }],
        },
        "Jolibox": {
          totalSGD: 0, totalUSD: 0, boostingSGD: 0,
          kols: [
            { name: "", deliverables: "", vidsBoosted: 0, kolCostSGD: 0 },
            { name: "", deliverables: "", vidsBoosted: 0, kolCostSGD: 0 },
          ],
        },
        "Redbus": {
          totalSGD: 0, totalUSD: 0, boostingSGD: 0,
          kols: [
            { name: "", deliverables: "", vidsBoosted: 0, kolCostSGD: 0 },
            { name: "", deliverables: "", vidsBoosted: 0, kolCostSGD: 0 },
          ],
        },
        "Firsty": {
          totalSGD: 0, totalUSD: 0, boostingSGD: 0,
          kols: [{ name: "", deliverables: "", vidsBoosted: 0, kolCostSGD: 0 }],
        },
      },
    },
    {
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

  payments: [
    // { partner: "", kol: "", amountUSD: 0, dueDate: "YYYY-MM-DD", milestone: "", status: "pending" },
  ],

  funnel: {
    baseline: {
      "Drivelah":  { weu: null, orders: null, gmvUSD: null },
      "HelloRide": { weu: null, orders: null, gmvUSD: null },
      "Jolibox":   { weu: null, orders: null, gmvUSD: null },
      "Redbus":    { weu: null, orders: null, gmvUSD: null },
      "Firsty":    { weu: null, orders: null, gmvUSD: null },
    },
    campaign: {
      "Drivelah":  { weu: null, orders: null, gmvUSD: null },
      "HelloRide": { weu: null, orders: null, gmvUSD: null },
      "Jolibox":   { weu: null, orders: null, gmvUSD: null },
      "Redbus":    { weu: null, orders: null, gmvUSD: null },
      "Firsty":    { weu: null, orders: null, gmvUSD: null },
    },
  },
};
