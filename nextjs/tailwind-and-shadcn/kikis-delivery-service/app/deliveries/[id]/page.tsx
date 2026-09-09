import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getDeliveryById } from "@/lib/services/deliveriesService";
import Link from "next/link";
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
      <Link href="/deliveries">&#8592; Show all deliveries</Link>
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
