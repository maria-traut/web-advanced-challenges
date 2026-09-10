import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllDeliveries } from "@/lib/services/deliveriesService";

export default async function HomePage() {
  const deliveries = await getAllDeliveries();
  const firstDelivery = deliveries[0];

  return (
    <>
      <h2 className="text-3xl text-blue-500">
        Fast, reliable deliveries across the city.
      </h2>
      {firstDelivery.pickup} to {firstDelivery.destination}
      <Button asChild>
        <Link href="/deliveries">Show all deliveries</Link>
      </Button>
      <Button asChild>
        <Link href="/deliveries/new">+ Add Delivery</Link>
      </Button>
    </>
  );
}
