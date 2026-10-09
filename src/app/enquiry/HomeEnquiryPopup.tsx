"use client";

import { useEffect, useState } from "react";
import EnquiryModal from "@/components/enquiry/EnquiryModal";

export default function HomeEnquiryPopup() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("homeEnquiryModalShown")) {
      return;
    }

    const timer = window.setTimeout(() => {
      setModalOpen(true);
      sessionStorage.setItem("homeEnquiryModalShown", "true");
    }, 1000);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <EnquiryModal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
    />
  );
}