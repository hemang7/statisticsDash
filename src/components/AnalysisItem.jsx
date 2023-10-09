import React from "react";

function AnalysisItem({ analysis }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mx-4 my-6 text-center">
      <h2 className="text-xl font-semibold mb-8">
        {analysis.fileName +
          " " +
          analysis.selectedColumn +
          " & " +
          analysis.secondSelectedColumn}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 md:col-span-1">
          <p className="font-semibold">Selected Column:</p>
          <p>{analysis.selectedColumn}</p>
        </div>
        <div className="col-span-2 md:col-span-1">
          <p className="font-semibold">Second Selected Column:</p>
          <p>{analysis.secondSelectedColumn}</p>
        </div>
        <div className="col-span-2 md:col-span-1">
          <p className="font-semibold">Mean:</p>
          <p>{analysis.mean !== null ? analysis.mean?.toFixed(2) : "N/A"}</p>
        </div>
        <div className="col-span-2 md:col-span-1">
          <p className="font-semibold">Standard Deviation:</p>
          <p>
            {analysis.stdDev !== null ? analysis.stdDev?.toFixed(2) : "N/A"}
          </p>
        </div>
        <div className="col-span-2 md:col-span-1">
          <p className="font-semibold">Standard Error:</p>
          <p>
            {analysis.stdError !== null ? analysis.stdError?.toFixed(2) : "N/A"}
          </p>
        </div>
        <div className="col-span-2 md:col-span-1">
          <p className="font-semibold">CV:</p>
          <p>{analysis.cv !== null ? analysis.cv?.toFixed(2) + "%" : "N/A"}</p>
        </div>
        <div className="col-span-2 md:col-span-1">
          <p className="font-semibold">Correlation:</p>
          <p>
            {analysis.correlation !== null
              ? analysis.correlation?.toFixed(4)
              : "N/A"}
          </p>
        </div>
        <div className="col-span-2 md:col-span-1">
          <p className="font-semibold">P-Value:</p>
          <p>
            {analysis.pValue !== null ? analysis.pValue?.toFixed(4) : "N/A"}
          </p>
        </div>
        <div className="col-span-2 md:col-span-1">
          <p className="font-semibold">F-Value:</p>
          <p>
            {analysis.fValue !== null ? analysis.fValue?.toFixed(4) : "N/A"}
          </p>
        </div>
      </div>
      {analysis.chartImage && (
        <div className="mt-4">
          <img src={analysis.chartImage} alt="Chart" className="w-full" />
        </div>
      )}
    </div>
  );
}

export default AnalysisItem;
