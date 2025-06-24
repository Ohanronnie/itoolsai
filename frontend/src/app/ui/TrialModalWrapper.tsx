"use client";
import { useState, useEffect } from "react";
import TrialPopup from "./TrialPopup";

export default function TrialModalWrapper() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  return <TrialPopup show={show} onClose={() => setShow(false)} />;
}
