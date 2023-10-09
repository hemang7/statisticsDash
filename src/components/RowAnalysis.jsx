import React, { useState, useEffect } from "react";

function RowAnalysis({ rowData, headerKeys }) {
  const [selectedColumn, setSelectedColumn] = useState(""); // State to store the selected column
  const [selectedRow, setSelectedRow] = useState(""); // State to store the selected row
  const [selectedRowData, setSelectedRowData] = useState([]); // State to store the data of the selected row

  const [mean, setMean] = useState(null);
  const [stdDev, setStdDev] = useState(null);
  const [stdError, setStdError] = useState(null);

  // Handle column selection from the first dropdown
  const handleColumnSelectChange = (e) => {
    const selectedColumn = e.target.value;
    setSelectedColumn(selectedColumn);
    setSelectedRow(""); // Clear the selected row when a new column is selected
  };
  console.log("selectedColumn", selectedColumn);

  // Handle row selection from the second dropdown
  // Handle row selection from the second dropdown
  // Handle row selection from the second dropdown
  const handleRowSelectChange = (e) => {
    const selectedRow = e.target.value;
    setSelectedRow(selectedRow);

    // Find the data for the selected row in the chosen column
    const selectedRowData = rowData
      .filter((item) => item[selectedColumn] === selectedRow)
      .map((item) => {
        // Create an array containing all numerical values from the row
        const numericalValues = Object.values(item)
          .filter((value) => !isNaN(parseFloat(value)))
          .map((value) => parseFloat(value));

        return numericalValues;
      });

    setSelectedRowData(selectedRowData);
  };

  console.log("selectedRowData", selectedRowData);
  console.log("selectedRow", selectedRow);

  // Update statistics whenever selectedRowData changes
  // Update statistics whenever selectedRowData changes
  useEffect(() => {
    if (selectedRowData.length > 0) {
      const allValues = selectedRowData.reduce(
        (acc, values) => [...acc, ...values],
        []
      );
      const values = allValues.filter((value) => !isNaN(value));

      // Calculate statistics
      const columnMean =
        values.reduce((sum, value) => sum + value, 0) / values.length;
      const columnStdDev = Math.sqrt(
        values.reduce((sum, value) => sum + (value - columnMean) ** 2, 0) /
          (values.length - 1)
      );
      const columnStdError = columnStdDev / Math.sqrt(values.length);

      setMean(columnMean);
      setStdDev(columnStdDev);
      setStdError(columnStdError);
    } else {
      // Reset statistics when no row is selected
      setMean(null);
      setStdDev(null);
      setStdError(null);
    }
  }, [selectedRowData]);

  return (
    <div className="mt-6 p-4 border rounded">
      <h2 className="text-lg font-semibold mb-2">Row Analysis</h2>
      <div className="mb-2">
        <label
          htmlFor="columnSelect"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Select a Column:
        </label>
        <select
          id="columnSelect"
          name="columnSelect"
          value={selectedColumn}
          onChange={handleColumnSelectChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select a Column</option>
          {headerKeys?.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>

      {selectedColumn && (
        <div className="mb-2">
          <label
            htmlFor="rowSelect"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Select a Row:
          </label>
          <select
            id="rowSelect"
            name="rowSelect"
            value={selectedRow}
            onChange={handleRowSelectChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a Row</option>
            {rowData
              .filter((item) => item[selectedColumn])
              .map((item, index) => (
                <option
                  key={`${selectedColumn}-${index}`}
                  value={item[selectedColumn]}
                >
                  {item[selectedColumn]}
                </option>
              ))}
          </select>
        </div>
      )}

      <div className="py-3">
        {selectedRowData.length > 0 && (
          <div>
            <div className="py-1">
              <strong>Mean:</strong> {mean !== null ? mean.toFixed(2) : "N/A"}
            </div>
            <div className="py-1">
              <strong>Standard Deviation:</strong>{" "}
              {stdDev !== null ? stdDev.toFixed(2) : "N/A"}
            </div>
            <div className="py-1">
              <strong>Standard Error:</strong>{" "}
              {stdError !== null ? stdError.toFixed(2) : "N/A"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RowAnalysis;
