import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAllDeliveries } from "@/lib/services/deliveriesService";
import DeliveryFilter from "@/components/DeliveryFilter";

export default async function DeliveriesPage() {
  const deliveries = await getAllDeliveries();

  return (
    <>
      <h2 className="text-3xl text-red-500">All Deliveries</h2>
      <DeliveryFilter deliveries={deliveries} />
      <Button asChild>
        <Link href="/">Homepage</Link>
      </Button>

      <Button asChild>
        <Link href="/deliveries/new">+ New Delivery</Link>
      </Button>
    </>
  );
}
