"use client";

import { withAuth } from "@/lib/auth-context";
import { InfoPanel } from "@/components/layout/info-panel";

function SettingsPage() {
  return <InfoPanel>hi</InfoPanel>;
}

export default withAuth(SettingsPage);
