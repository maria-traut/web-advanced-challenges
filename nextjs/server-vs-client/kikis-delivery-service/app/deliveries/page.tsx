import Link from "next/link";
import { getAllDeliveries } from "@/lib/services/deliveriesService";
import DeliveryFilter from "@/components/DeliveryFilter";

export default function DeliveriesPage() {
  const deliveries = getAllDeliveries();

  return (
    <>
      <h2>All Deliveries</h2>
      <DeliveryFilter deliveries={deliveries} />
      <ol>
        {deliveries.map((delivery) => (
          <li key={delivery.id}>
            <Link href={`/deliveries/${delivery.id}`}>
              {delivery.pickup} to {delivery.destination} ({delivery.status})
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}
