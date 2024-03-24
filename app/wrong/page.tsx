"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Wrong() {
  const router = useRouter();
  useEffect(() => {
    const x = () => router.replace("/");
    setTimeout(x, 2000);
  });

  return <div>Wrong</div>;
}
