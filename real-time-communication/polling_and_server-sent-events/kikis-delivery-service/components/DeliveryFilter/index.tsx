"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import Link from "next/link";
import { DeliveryRequest } from "@/lib/services/deliveriesService";
import DeleteDeliveryForm from "../DeleteDeliveryForm";
// import StatusTracker from "../StatusTracker";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
export default function DeliveryFilter({
  deliveries,
}: {
  deliveries: DeliveryRequest[];
}) {
  const [status, setStatus] = useState("all");

  const visible =
    status === "all"
      ? deliveries
      : deliveries.filter((delivery) => delivery.status === status);

  return (
    <div className="my-5">
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="mb-5">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="accepted">Accepted</SelectItem>
          <SelectItem value="fulfilled">Fulfilled</SelectItem>
          <SelectItem value="denied">Denied</SelectItem>
        </SelectContent>
      </Select>
      {visible.map((delivery) => (
        <Card key={delivery.id} className="p-4 mb-4">
          <CardHeader className="p-0">
            <div className="flex items-center justify-between gap-4">
              <Link href={`/deliveries/${delivery.id}`}>
                <CardTitle>
                  {delivery.pickup} to {delivery.destination}
                </CardTitle>
              </Link>
              <DeleteDeliveryForm id={delivery.id} />
            </div>

            <CardDescription className="[text-shadow:0_0_20px_white]">
              {delivery.status}
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
