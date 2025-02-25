"use client";
export const dynamic = 'force-dynamic';

import { useSearchParams } from "next/navigation";

export default function AppointmentConfirmation() {
  const searchParams = useSearchParams();
  const appointmentTime = searchParams.get("time");

  return (
    <div className="container mx-auto py-10 text-center">
      <h1 className="text-3xl font-bold text-green-600">
        Appointment Confirmed! ✅
      </h1>
      <p className="text-lg mt-4">Your appointment is scheduled for:</p>
      <p className="text-2xl font-semibold text-blue-600 mt-2">
        {appointmentTime ? new Date(appointmentTime).toLocaleString() : "N/A"}
      </p>
      <p className="mt-4">
        Please be available for your Kundali Matching consultation at the scheduled time.
      </p>
    </div>
  );
}
