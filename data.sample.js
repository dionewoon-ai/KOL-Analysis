// Schema reference — copy to data.js and fill in real values.

const KOL_DATA = {
  quarterlyBudgetUSD: 0,
  balanceUSD: 0,
  exchangeRateUSD_SGD: 1.27787,
  campaignCode: "",
  partners: ["Drivelah", "HelloRide", "Jolibox", "Redbus", "Firsty"],

  funnelSource: {
    pmfDashboardXlsx: "Mini Apps PMF Dashboard 18 May.xlsx",
    sheets: { funnelWeekly: "Funnel_Weekly", weeklyTrend: "Weekly_Trend" },
    partnerMap: {
      "Drivelah": ["Drivelah"],
      "HelloRide": ["HelloRide"],
      "Jolibox": ["Jolibox Game", "Jolibox Drama"],
      "Redbus": ["RedBus"],
      "Firsty": ["Firsty"],
    },
  },

  campaignTimeline: {
    methodology: {
      baselineWeeks: 4,
      baselineRule: "4-wk avg ending the week before baselineAnchorDate.",
      upliftRule: "Weekly avg during boostStart → boostEnd.",
      baselineAnchorOptions: ["post", "boost"],
    },
    partners: {
      "Drivelah": {
        baselineAnchor: "boost",
        postDate: "YYYY-MM-DD",
        boostStart: "YYYY-MM-DD",
        boostEnd: "YYYY-MM-DD",
        kols: ["KOL name"],
      },
    },
  },

  campaigns: [ /* see data.js */ ],

  funnel: { baseline: {}, campaign: {}, meta: {}, lastSynced: null, pmfDashboardXlsx: "" },
};
