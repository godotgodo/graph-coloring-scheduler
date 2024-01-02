"use client";
import React from "react";
import { Days, Times, Grades } from "@/utils/settings";
import Image from "next/image";
import { Checkbox, MenuItem, Select, Snackbar } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import NewSubjectForm from "./NewSubjectForm";
import getGivenSubjects from "@/app/actions";

function SchedulerTable({ data }) {
  const [checkedIndexes, setCheckedIndexes] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const [visibleCheckboxes, setVisibleCheckboxes] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState({
    startTime: 0,
    endTime: 0,
  });
  const [selectedGrade, setSelectedGrade] = useState(0);
  const [selectedDay, setselectedDay] = useState(0);
  useEffect(() => {
    if (checkedIndexes.length > 0) {
      setSelectedTimes({
        startTime: Number(checkedIndexes[0].split("-")[2]),
        endTime:
          Number(checkedIndexes[checkedIndexes.length - 1].split("-")[2]) + 1,
      });
      setSelectedGrade(checkedIndexes[0].split("-")[0]);
      setselectedDay(checkedIndexes[0].split("-")[1]);
      let visibleCheckboxes = [];
      for (let i = 1; i <= 9; i++) {
        visibleCheckboxes.push(`1-1-${i + 8}`);
      }
      setVisibleCheckboxes(visibleCheckboxes);
    } else {
      setSelectedTimes({
        startTime: 0,
        endTime: 0,
      });
    }
  }, [checkedIndexes]);
  const deleteGivenSubject = async (id) => {
    const body = {
      id: id,
    };
    const res = await fetch("/api/givenSubject", {
      method: "DELETE",
      body: JSON.stringify(body),
    });
    setOpenSnackbar(true);
    getGivenSubjects();
  };
  return (
    <div className="relative w-full shadow-md sm:rounded-lg">
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
          <tbody key={day} className="relative mb-5 border-b-8">
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
                        <Checkbox
                          onChange={(e) =>
                            setCheckedIndexes((prev) => {
                              if (
                                e.target.checked &&
                                !prev.includes(
                                  `${grade}-${dayIndex + 1}-${timeKey}`
                                )
                              ) {
                                return [
                                  ...prev,
                                  `${grade}-${dayIndex + 1}-${timeKey}`,
                                ];
                              } else if (!e.target.checked) {
                                const newArray = prev.filter(
                                  (item) =>
                                    item !==
                                    `${grade}-${dayIndex + 1}-${timeKey}`
                                );
                                return newArray;
                              }
                            })
                          }
                        />
                        <div className="rounded-lg w-full">
                          {data[grade][dayIndex + 1][timeKey] && (
                            <div className="ps-3">
                              <div className=" mr-1 text-base inline font-semibold">
                                {
                                  data[grade][dayIndex + 1][timeKey].subject
                                    .name
                                }
                              </div>
                              (
                              <code className="font-mono font-bold">
                                {
                                  data[grade][dayIndex + 1][timeKey].subject
                                    .code
                                }
                              </code>
                              ) [
                              <code className="font-mono">
                                {data[grade][dayIndex + 1][timeKey].class.code}
                              </code>
                              ]
                              <div className="font-normal text-gray-500">
                                {` ${
                                  data[grade][dayIndex + 1][timeKey].lecturer
                                    .name
                                } ${
                                  data[grade][dayIndex + 1][timeKey].lecturer
                                    .surname
                                }`}
                              </div>
                            </div>
                          )}
                          {data[grade][dayIndex + 1][timeKey] && (
                            <Image
                              src={"/images/delete.png"}
                              className="float-end cursor-pointer"
                              width={32}
                              height={32}
                              alt="delete"
                              onClick={(e) =>
                                deleteGivenSubject(
                                  data[grade][dayIndex + 1][timeKey]._id
                                )
                              }
                            />
                          )}
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
      <div className="absolute -right-56 top-60">
        <NewSubjectForm
          startTime={selectedTimes.startTime}
          endTime={selectedTimes.endTime}
          grade={selectedGrade}
          day={selectedDay}
        />
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Ders Silindi."
      />
    </div>
  );
}

export default SchedulerTable;
