import SchedulerContainer from "@/components/scheduler/SchedulerContainer";
import React from "react";

export async function getData() {
  const res = await fetch("http://localhost:3000/api/givenSubject",{
    cache:"no-cache"
  });
  if (!res.ok) {
    throw new Error("Failed fetch to data");
  }
  let timeTable = {};
  const givenSubjects = await res.json();
  for (let grade = 1; grade <= 4; grade++) {
    timeTable[grade] = {};

    for (let day = 1; day <= 5; day++) {
      timeTable[grade][day] = {};

      for (let hour = 9; hour <= 17; hour++) {
        const matchingSubjects = givenSubjects.filter((givenSubject) => {
          return (
            givenSubject.startTime <= hour &&
            givenSubject.endTime > hour &&
            givenSubject.day === day &&
            givenSubject.subject?.grade === `${grade}`
          );
        });

        if (matchingSubjects.length > 0) {
          timeTable[grade][day][hour] = matchingSubjects[0];
        } else {
          timeTable[grade][day][hour] = null;
        }
      }
    }
  }

  return timeTable;
}

export default async function Page() {
  const data = await getData();
  return (
    <div className="w-full h-full min-h-screen">
      <SchedulerContainer data={data} />
    </div>
  );
}
