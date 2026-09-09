import Link from "next/link";
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
        <Link href="/deliveries/new">+ Add Delivery</Link>
      </p>
    </>
  );
}
