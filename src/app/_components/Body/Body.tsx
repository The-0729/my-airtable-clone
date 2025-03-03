"use client";

import React, { useState } from "react";
import ViewContainer from "../ViewContainer/ViewContainer";

export default function Body() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex-1 hs-overlay-body-open hs-overlay-body-open:overflow-hidden">
      <ViewContainer />
    </div>
  );
}
