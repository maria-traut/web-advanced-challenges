import { ensureDemoOrder, getPollingStatus } from "@/lib/orderStatus";
import sql from "@/lib/db";

// short polling
// export async function GET(
//   request: Request,
//   { params }: { params: Promise<{ id: string }> },
// ) {
//   const { id } = await params;

//   const [delivery] = await sql`
//     SELECT status FROM deliveries WHERE id = ${id}
//   `;

//   if (!delivery) {
//     return Response.json({ error: "not found" }, { status: 404 });
//   }

//   return Response.json(delivery);
// }

//long polling
const POLL_INTERVAL_IN_MS = 500;
const TIMEOUT_IN_MS = 30000;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const lastStatus = searchParams.get("lastStatus");

  ensureDemoOrder(id);

  const startTime = Date.now();

  while (Date.now() - startTime < TIMEOUT_IN_MS) {
    const status = getPollingStatus(id);

    if (!status) {
      return Response.json({ error: "status not found" }, { status: 404 });
    }

    if (status !== lastStatus) {
      return Response.json({ status });
    }

    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_IN_MS));
  }

  // Timeout erreicht, ohne Änderung. Dennoch aktuellen Status zurückgeben.
  const status = await getPollingStatus(id);
  return Response.json({ status });
}
