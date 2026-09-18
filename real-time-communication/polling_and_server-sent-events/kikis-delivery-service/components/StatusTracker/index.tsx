"use client";

import { useEffect, useState } from "react";

// short polling
// export default function StatusTracker({ id }: { id: string }) {
//   const [status, setStatus] = useState("preparing");

//   useEffect(() => {
//     const intervalId = setInterval(async () => {
//       const response = await fetch(`/api/order-status/${id}`);
//       const data = await response.json();

//       setStatus(data.status);

//       if (data.status === "delivered") {
//         clearInterval(intervalId);
//       }
//     }, 3000);

//     return () => clearInterval(intervalId);
//   }, [id]);

//   return <span>{status}</span>;
// }

// long polling

export default function StatusTracker({ id }: { id: string }) {
  const [pollingStatus, setPollingStatus] = useState("preparing");

  useEffect(() => {
    let cancelled = false;

    async function poll(lastStatus: string) {
      const response = await fetch(
        `/api/order-status/${id}?lastStatus=${lastStatus}`,
      );
      const data = await response.json();

      if (cancelled) return;

      setPollingStatus(data.status);

      if (data.status !== "delivered") {
        poll(data.status);
      }
    }

    poll(pollingStatus);

    return () => {
      cancelled = true;
    };
  }, [id]);

  return <span>Polling status: {pollingStatus}</span>;
}
