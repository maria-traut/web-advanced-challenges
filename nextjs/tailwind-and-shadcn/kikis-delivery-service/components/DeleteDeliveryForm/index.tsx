"use client";

import { removeDelivery } from "@/app/actions";
import { Button } from "@/components/ui/button";

export default function DeleteDeliveryForm({ id }: { id: string }) {
  return (
    <form action={removeDelivery}>
      <input type="hidden" name="id" value={id} />
      <Button type="submit" variant="destructive" size="sm">
        X
      </Button>
    </form>
  );
}
