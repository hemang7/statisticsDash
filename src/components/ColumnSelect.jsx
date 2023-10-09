import React from "react";

function ColumnSelect({
  selectableColumns,
  onSelectChange,
  selectedColumn,
  secondSelectedColumn,
  onSecondSelectChange,
}) {
  return (
    <div className="mt-6 p-4 rounded border">
      <h2 className="text-lg font-semibold mb-2">Column Analysis</h2>
      <div>
        <label
          htmlFor="columnSelect"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Select a Column for Analysis:
        </label>
        <select
          id="columnSelect"
          name="columnSelect"
          className="mt-1 p-2 border rounded-md w-full"
          onChange={onSelectChange}
        >
          <option value="">Select a Column</option>
          {selectableColumns.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>

        {/* Second column select */}
        <label
          htmlFor="secondColumnSelect"
          className="block text-sm font-medium text-gray-700 mt-4"
        >
          Select a Second Column for Correlation:
        </label>
        <select
          id="secondColumnSelect"
          name="secondColumnSelect"
          className="mt-1 p-2 border rounded-md w-full"
          onChange={onSecondSelectChange}
        >
          <option value="">Select a Column</option>
          {selectableColumns.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default ColumnSelect;
