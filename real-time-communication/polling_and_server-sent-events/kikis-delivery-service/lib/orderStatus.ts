type PollingStatus = "preparing" | "out for delivery" | "delivered";

const statuses = new Map<string, PollingStatus>();

export function ensureDemoOrder(id: string) {
  if (!statuses.has(id)) {
    statuses.set(id, "preparing");

    setTimeout(() => {
      statuses.set(id, "out for delivery");
    }, 5000);

    setTimeout(() => {
      statuses.set(id, "delivered");
    }, 10000);
  }
}

export function getPollingStatus(id: string) {
  return statuses.get(id);
}
