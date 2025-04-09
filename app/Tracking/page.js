import { Suspense } from "react";
import TrackingPageClient from "./TrackingPageClient";

export default function page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <TrackingPageClient />
    </Suspense>
  );
}