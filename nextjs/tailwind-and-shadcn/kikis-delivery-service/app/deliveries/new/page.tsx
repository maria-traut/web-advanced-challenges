"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { addDelivery } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export default function NewDeliveryPage() {
  return (
    <>
      <Button asChild>
        <Link href="/deliveries">&#8592; Show all deliveries</Link>
      </Button>
      <form action={addDelivery} className="flex flex-col gap-4">
        <div className="grid gap-2">
          <Label htmlFor="pickup">Pickup</Label>
          <Input
            id="pickup"
            type="text"
            name="pickup"
            placeholder="Pickup"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="destination">Destination</Label>
          <Input
            id="destination"
            type="text"
            name="destination"
            placeholder="Destination"
            required
          />
        </div>
        <Button type="submit" className="self-start">
          Create request
        </Button>
      </form>
    </>
  );
}
