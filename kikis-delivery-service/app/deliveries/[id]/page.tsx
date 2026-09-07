import { getDeliveryById } from "@/lib/services/deliveriesService";
export default async function DeliveryDetailPage({
  params,
}: PageProps<"/deliveries/[id]">) {
  const { id } = await params;
  const delivery = await getDeliveryById(id);

  if (!delivery) {
    return (
      <>
        <h1>Delivery {id} not found</h1>
      </>
    );
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
