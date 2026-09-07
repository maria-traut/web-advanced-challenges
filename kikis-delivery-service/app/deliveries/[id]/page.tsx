import { getDeliveryById } from "@/lib/services/deliveriesService";
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
      <h1>Delivery {id}</h1>
      <p>
        From {delivery.pickup} to {delivery.destination}
      </p>
      <p>Status: {delivery.status}</p>
    </>
  );
}
