import { getAllDeliveries } from "@/lib/services/deliveriesService";

export default async function HomePage() {
  const deliveries = await getAllDeliveries();
  const firstDelivery = deliveries[0];

  return (
    <>
      <h2>Fast, reliable deliveries across the city.</h2>
      {firstDelivery.pickup} to {firstDelivery.destination}
    </>
  );
}
