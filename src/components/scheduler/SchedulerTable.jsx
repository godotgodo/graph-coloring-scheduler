import React from "react";
import { Days, Times, Grades } from "@/utils/settings";
import Image from "next/image";


function SchedulerTable({data}) {
  console.log(data);
  return (
    <div className="relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="p-4">Saatler</th>
            {Grades.map((grade) => (
              <th scope="col" className="px-6 py-3" key={grade}>
                {grade}.sınıf
              </th>
            ))}
          </tr>
        </thead>
        {Days.map((day, dayIndex) => (
          <tbody key={day} className="relative">
            <div>&nbsp;</div>
            <div className="absolute -left-20 top-1/2 -rotate-90 text-2xl">
              {day}
            </div>
            {Object.keys(Times).map((timeKey, timeIndex) => {
              if (timeKey != 17) {
                return (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    key={timeKey}
                  >
                    <td className="p-4">
                      {Times[timeKey]} - {Times[timeIndex + 10]}
                    </td>
                    {Grades.map((grade) => (
                      <td className="group px-6 py-4" key={grade}>
                        <div className="rounded-lg w-full h-16">
                          <Image
                            className="float-end cursor-pointer hidden group-hover:block"
                            src={"/images/add.png"}
                            width={32}
                            height={32}
                            alt="add"
                          />
                          {/* <Image src={"/images/delete.png"} width={32} height={32} alt="delete" /> */}

                          {/* Gün: {Days[dayIndex]}
                          <br />
                          startTime - endTime: {Times[timeKey]} -{" "}
                          {Times[timeIndex + 10]}
                          <br />
                          Grade: {grade} */
                          }
                        </div>
                      </td>
                    ))}
                  </tr>
                );
              }
            })}
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default SchedulerTable;
