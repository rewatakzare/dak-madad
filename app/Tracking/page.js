import { Suspense } from "react";
import TrackingPageClient from "./trackingpage";

export default function TrackingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <TrackingPageClient />
    </Suspense>
  );
}
