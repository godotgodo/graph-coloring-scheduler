import SchedulerContainer from "@/components/scheduler/SchedulerContainer";
import React from "react";

export async function getData() {
  const res = await fetch("http://localhost:3000/api/givenSubject");
  if (!res.ok) {
    throw new Error("Failed fetch to data");
  }
  return await res.json();
}

export default async function Page() {
  const data = await getData();
  return (
    <div className="w-full h-full min-h-screen">
      <SchedulerContainer data={data} />
    </div>
  );
}
