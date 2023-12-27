import React from "react";
import SchedulerTable from "./SchedulerTable";
import SchedulerSettings from "./SchedulerSettings";

function SchedulerContainer({ data }) {
  return (
    <div className="container mx-auto mt-3 flex gap-5 justify-between">
      <SchedulerTable data={data} />
      <SchedulerSettings/>
    </div>
  );
}

export default SchedulerContainer;
