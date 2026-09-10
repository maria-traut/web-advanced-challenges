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
        <SelectTrigger>
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
      <ul>
        {visible.map((delivery) => (
          <li key={delivery.id} className="flex items-center gap-2">
            <Link href={`/deliveries/${delivery.id}`}>
              {delivery.pickup} to {delivery.destination} ({delivery.status})
            </Link>
            <DeleteDeliveryForm id={delivery.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}
