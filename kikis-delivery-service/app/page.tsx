import { getDeliveryById } from "@/lib/services/deliveriesService";
export default function HomePage() {
  const firstDelivery = getDeliveryById("1");
  return (
    <>
      <p>Fast, reliable deliveries across the city.</p>
      {firstDelivery!.pickup} to {firstDelivery!.destination}
    </>
  );
}
