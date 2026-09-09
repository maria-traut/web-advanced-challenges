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
      <p>
        <Link href="/">Homepage</Link>
      </p>
      <p>
        <Button asChild>
          <Link href="/deliveries/new">+ Add Delivery</Link>
        </Button>
      </p>
    </>
  );
}
