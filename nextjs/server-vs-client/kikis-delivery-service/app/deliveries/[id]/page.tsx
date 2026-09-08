import { getDeliveryById } from "@/lib/services/deliveriesService";
import Link from "next/link";
export default async function DeliveryDetailPage({
  params,
}: PageProps<"/deliveries/[id]">) {
  const { id } = await params;
  const delivery = getDeliveryById(id);

  if (!delivery) {
    throw new Error(`Delivery ${id} not found`);
  }

  return (
    <>
      <Link href="/deliveries">&#8592; Show all deliveries</Link>
      <h2>Delivery {id}</h2>
      <p>
        From {delivery.pickup} to {delivery.destination}
      </p>
      <p>Status: {delivery.status}</p>
    </>
  );
}
