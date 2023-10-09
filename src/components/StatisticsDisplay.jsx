import React from "react";

function StatisticsDisplay({
  selectedColumn,
  mean,
  stdDev,
  stdError,
  cv,
  secondSelectedColumn,
  correlation,
  pValue,
  fValue,
}) {
  return (
    <div className="grid grid-cols-2 gap-4 mt-10 text-center">
      {selectedColumn && (
        <>
          <div className="col-span-2 md:col-span-1">
            <p className="font-semibold text-lg">Selected Column:</p>
            <p>{selectedColumn}</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <p className="font-semibold text-lg">Second Selected Column:</p>
            <p>{secondSelectedColumn}</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <p className="font-semibold">Mean for {selectedColumn}:</p>
            <p>{mean !== null ? mean?.toFixed(2) : "N/A"}</p>
          </div>

          <div className="col-span-2 md:col-span-1">
            <p className="font-semibold">
              Correlation b/w {selectedColumn} & {secondSelectedColumn}:
            </p>
            <p>{correlation !== null ? correlation?.toFixed(4) : "N/A"}</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <p className="font-semibold">
              Standard Error for {selectedColumn}:
            </p>
            <p>{stdError !== null ? stdError?.toFixed(2) : "N/A"}</p>
          </div>

          <div className="col-span-2 md:col-span-1">
            <p className="font-semibold">
              Standard Deviation for {selectedColumn}:
            </p>
            <p>{stdDev !== null ? stdDev?.toFixed(2) : "N/A"}</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <p className="font-semibold">CV for {selectedColumn}:</p>
            <p>{cv !== null ? cv?.toFixed(2) + "%" : "N/A"}</p>
          </div>
        </>
      )}
      {selectedColumn && secondSelectedColumn && (
        <>
          <div className="col-span-2 md:col-span-1">
            <p className="font-semibold">P-Value:</p>
            <p>{pValue !== null ? pValue?.toFixed(4) : "N/A"}</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <p className="font-semibold">F-Value:</p>
            <p>{fValue !== null ? fValue?.toFixed(4) : "N/A"}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default StatisticsDisplay;
