// TableDisplay.jsx
import React from "react";

function TableDisplay({ array, headerKeys }) {
  return (
    <div className="max-h-80 overflow-y-auto mt-10 text-center bg-gray-100 ">
      <table className="table-auto w-full">
        <thead>
          <tr key="header">
            {headerKeys.map((key) => (
              <th key={key} className="px-4 py-2 sticky top-0 text-white bg-blue-800">
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {array.map((item, index) => (
            <tr key={index}>
              {Object.values(item).map((val, subIndex) => (
                <td key={subIndex} className="border px-4 py-2">
                  {val}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableDisplay;
