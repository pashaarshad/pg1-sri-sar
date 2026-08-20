"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { InviteModal } from "./InviteModal";
import { Suspense } from "react";

function InviteModalSearchListener() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isOpen = searchParams.get("invite") === "true";

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("invite");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  return <InviteModal isOpen={isOpen} onClose={handleClose} />;
}

export function InviteModalListener() {
  return (
    <Suspense fallback={null}>
      <InviteModalSearchListener />
    </Suspense>
  );
}
