import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getDeliveryById } from "@/lib/services/deliveriesService";

export default async function DeliveryDetailPage({
  params,
}: PageProps<"/deliveries/[id]">) {
  const { id } = await params;
  const delivery = await getDeliveryById(id);

  if (!delivery) {
    throw new Error(`Delivery ${id} not found`);
  }

  return (
    <>
      <h2>Delivery {id}</h2>
      <Card>
        <CardHeader>
          <CardTitle>
            From {delivery.pickup} to {delivery.destination}
          </CardTitle>
        </CardHeader>
        <CardContent>Status: {delivery.status}</CardContent>
      </Card>
    </>
  );
}
