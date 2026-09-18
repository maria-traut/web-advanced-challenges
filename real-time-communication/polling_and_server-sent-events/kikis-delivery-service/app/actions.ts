"use server";

import {
  createDelivery,
  deleteDelivery,
} from "@/lib/services/deliveriesService";
import { revalidatePath, revalidateTag } from "next/cache";

export async function addDelivery(formData: FormData) {
  "use server";
  const pickup = formData.get("pickup") as string;
  const destination = formData.get("destination") as string;

  await createDelivery({ pickup, destination });
  revalidatePath("/deliveries");
}

export async function removeDelivery(formData: FormData) {
  const id = formData.get("id") as string;
  await deleteDelivery(id);
  revalidatePath("/deliveries");
}
