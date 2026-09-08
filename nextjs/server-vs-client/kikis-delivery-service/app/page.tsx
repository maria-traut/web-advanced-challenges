import Link from "next/link";
import { getDeliveryById } from "@/lib/services/deliveriesService";

export default function HomePage() {
  const firstDelivery = getDeliveryById("1");
  return (
    <>
      <h2>Fast, reliable deliveries across the city.</h2>
      {firstDelivery!.pickup} to {firstDelivery!.destination}
      <p>
        <Link href="/deliveries">Show all deliveries</Link>
      </p>
      <p>
        <Link href="/deliveries/new">+ Add Delivery</Link>
      </p>
    </>
  );
}
