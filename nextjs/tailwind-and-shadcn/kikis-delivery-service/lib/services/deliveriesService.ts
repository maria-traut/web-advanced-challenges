import sql from "@/lib/db";

export type DeliveryStatus = "active" | "accepted" | "denied" | "fulfilled";

export type DeliveryRequest = {
  id: string;
  pickup: string;
  destination: string;
  status: DeliveryStatus;
};

export const deliveries: DeliveryRequest[] = [
  { id: "1", pickup: "Bakery", destination: "Clock Tower", status: "active" },
  {
    id: "2",
    pickup: "Harbour",
    destination: "Hillside Cafe",
    status: "accepted",
  },
  { id: "3", pickup: "Bookshop", destination: "Lighthouse", status: "denied" },
  {
    id: "4",
    pickup: "Market Square",
    destination: "Train Station",
    status: "fulfilled",
  },
];

export async function getAllDeliveries(): Promise<DeliveryRequest[]> {
  return sql<DeliveryRequest[]>`SELECT * FROM deliveries`;
}

export async function getDeliveryById(
  id: string,
): Promise<DeliveryRequest | null> {
  const [delivery] = await sql<DeliveryRequest[]>`
    SELECT * FROM deliveries WHERE id = ${id}
  `;
  return delivery ?? null;
}

export async function createDelivery(
  delivery: Pick<DeliveryRequest, "pickup" | "destination">,
): Promise<DeliveryRequest> {
  const [created] = await sql<DeliveryRequest[]>`
    INSERT INTO deliveries (pickup, destination, status)
    VALUES (${delivery.pickup}, ${delivery.destination}, 'active')
    RETURNING *
  `;
  return created;
}

export async function deleteDelivery(id: string): Promise<void> {
  await sql`DELETE FROM deliveries WHERE id = ${id}`;
}
