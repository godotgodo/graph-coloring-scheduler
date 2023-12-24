import React from "react";
import SchedulerTable from "./SchedulerTable";

function SchedulerContainer({ data }) {
  return (
    <div className="container mx-auto mt-3">
      <SchedulerTable data={data} />
    </div>
  );
}

export default SchedulerContainer;
