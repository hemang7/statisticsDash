// FileInput.jsx
import React from "react";

function FileInput({ onChange }) {
  return (
    <div>
      <input
        type="file"
        id="csvFileInput"
        accept=".csv,.xlsx,.xls"
        onChange={onChange}
        className="border p-2"
      />
    </div>
  );
}

export default FileInput;
