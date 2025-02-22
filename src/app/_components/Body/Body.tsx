"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Navbar from "../NavBar/NavBar";
import ViewContainer from "../ViewContainer/ViewContainer";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

export default function Body() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="hs-overlay-body-open hs-overlay-body-open:overflow-hidden">
      <ViewContainer />
    </div>
  );
}
