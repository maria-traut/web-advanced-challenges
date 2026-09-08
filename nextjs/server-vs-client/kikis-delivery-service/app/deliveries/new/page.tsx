"use client";

import Link from "next/link";
import { addDelivery } from "@/app/actions";

export default function NewDeliveryPage() {
  return (
    <>
      <Link href="/deliveries">&#8592; Show all deliveries</Link>
      <form action={addDelivery}>
        <input type="text" name="pickup" placeholder="Pickup" required />
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          required
        />
        <button type="submit">Create request</button>
      </form>
    </>
  );
}
