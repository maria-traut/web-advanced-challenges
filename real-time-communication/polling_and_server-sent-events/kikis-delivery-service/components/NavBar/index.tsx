"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ModeToggle } from "../ModeToggle";

export default function NavBar() {
  return (
    <>
      <div className="flex gap-2 my-7">
        <Button asChild>
          <Link href="/">Homepage</Link>
        </Button>
        <Button asChild>
          <Link href="/deliveries">All deliveries</Link>
        </Button>
        <Button asChild>
          <Link href="/deliveries/new">+ New Delivery</Link>
        </Button>
        <ModeToggle />
      </div>
    </>
  );
}
