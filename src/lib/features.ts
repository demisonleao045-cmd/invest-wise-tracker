export type Plan = "FREE" | "PRO";

// MVP: always FREE. When you add auth + Mercado Pago, you'll resolve the user's plan here.
export function getCurrentPlan(): Plan {
  return "FREE";
}

export function isPro(): boolean {
  return getCurrentPlan() === "PRO";
}
