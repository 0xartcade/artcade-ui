"use client";

import { withAuth } from "@/lib/auth-context";

function GamePage() {
  return (
    <div className="page-layout">
      <div className="page-layout-inner">
        Nothing to show here!
      </div>
    </div>
  );
}

export default withAuth(GamePage);
