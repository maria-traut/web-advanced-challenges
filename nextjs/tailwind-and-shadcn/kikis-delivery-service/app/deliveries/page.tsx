import { getAllDeliveries } from "@/lib/services/deliveriesService";
import DeliveryFilter from "@/components/DeliveryFilter";

export default async function DeliveriesPage() {
  const deliveries = await getAllDeliveries();

  return (
    <>
      <h2 className="text-2xl font-bold">All Deliveries</h2>
      <DeliveryFilter deliveries={deliveries} />
    </>
  );
}
