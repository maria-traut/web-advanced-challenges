"use client";

import { Button } from "@/components/ui/button";
import { addDelivery } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function NewDeliveryPage() {
  return (
    <>
      <h2>Add a Delivery</h2>
      <form action={addDelivery} className="flex flex-col gap-4 my-5">
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
        <Button type="submit" className="self-start" variant="brand">
          Create request
        </Button>
      </form>
    </>
  );
}
