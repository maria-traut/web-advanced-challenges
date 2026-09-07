import Link from "next/link";
import { getAllDeliveries } from "@/lib/services/deliveriesService";

export default function DeliveriesPage() {
  const deliveries = getAllDeliveries();

  return (
    <>
      <h1>All Deliveries</h1>
      <ul>
        {deliveries.map((delivery) => (
          <li key={delivery.id}>
            <Link href={`/deliveries/${delivery.id}`}>
              {delivery.pickup} to {delivery.destination} ({delivery.status})
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
