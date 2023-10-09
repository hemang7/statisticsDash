import React, { useState, useRef } from "react";
import { jsPDF } from "jspdf";
import watermarkImage from "../watermark.png";
import * as ss from "simple-statistics";
import * as jStat from "jstat";
import * as XLSX from "xlsx";
import html2canvas from "html2canvas";

import FileInput from "./FileInput";
import StatisticsDisplay from "./StatisticsDisplay";
import ColumnSelect from "./ColumnSelect";
import TableDisplay from "./TableDisplay";
import LineChart from "./LineChart";
import RowAnalysis from "./RowAnalysis";
import "../index.css";

import { UserAuth } from "../context/AuthContext";
// import { signOut } from "firebase/auth";
// import { auth } from "../firebase";
// import { Link, useNavigate } from "react-router-dom";
// import Navbar from "./Navbar";

function Main() {
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);
  const [error, setError] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("");
  const [secondSelectedColumn, setSecondSelectedColumn] = useState("");
  const [mean, setMean] = useState(null);
  const [stdDev, setStdDev] = useState(null);
  const [stdError, setStdError] = useState(null);
  const [cv, setCV] = useState(null);
  const [correlation, setCorrelation] = useState(null);
  const [pValue, setPValue] = useState(null);
  const [fValue, setFValue] = useState(null);
  const lineChartRef = useRef();

  const { user, logout } = UserAuth();

  const userId = user.uid;

  //   const navigate = useNavigate();

  //   const handleLogout = async () => {
  //     try {
  //       //   await logout();
  //       //   navigate("/login");
  //       //   console.log("you are logged out");

  //       return logout(auth);
  //     } catch (e) {
  //       console.log("not logged out" + e.message);
  //     }
  //   };

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
  };

  const readFile = (file) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const csv = XLSX.utils.sheet_to_csv(worksheet);

      // Convert the CSV string to an array
      csvFileToArray(csv);
    };
    reader.readAsBinaryString(file);
  };

  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const newArray = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setArray(newArray);
  };

  const calculateMean = (column) => {
    const values = array
      .map((item) => parseFloat(item[column]))
      .filter((value) => !isNaN(value));
    const sum = values.reduce((acc, val) => acc + val, 0);
    return sum / values.length;
  };

  const calculateStdDev = (column) => {
    const values = array
      .map((item) => parseFloat(item[column]))
      .filter((value) => !isNaN(value));
    return ss.standardDeviation(values);
  };

  const calculateStdError = (column) => {
    const values = array
      .map((item) => parseFloat(item[column]))
      .filter((value) => !isNaN(value));
    const stdDeviation = ss.standardDeviation(values);
    const sampleSize = values.length;

    if (sampleSize > 1) {
      const standardError = stdDeviation / Math.sqrt(sampleSize);
      return standardError;
    } else {
      return null;
    }
  };

  const calculateCV = (column) => {
    const meanValue = calculateMean(column);
    const stdDeviation = calculateStdDev(column);

    if (meanValue !== 0) {
      const cvValue = (stdDeviation / meanValue) * 100;
      return cvValue;
    } else {
      return null;
    }
  };

  const calculateCorrelation = (column1, column2) => {
    const values1 = array
      .map((item) => parseFloat(item[column1]))
      .filter((value) => !isNaN(value));

    const values2 = array
      .map((item) => parseFloat(item[column2]))
      .filter((value) => !isNaN(value));

    if (values1.length !== values2.length || values1.length < 2) {
      return null;
    }

    return ss.sampleCorrelation(values1, values2);
  };

  const calculatePValue = (correlation, sampleSize) => {
    if (sampleSize < 3) {
      return null;
    }

    const tStat =
      (correlation * Math.sqrt(sampleSize - 2)) /
      Math.sqrt(1 - correlation ** 2);
    const degreesOfFreedom = sampleSize - 2;
    const pValue =
      2 * (1 - jStat.studentt.cdf(Math.abs(tStat), degreesOfFreedom));
    return pValue;
  };

  const calculateFValue = (column1, column2) => {
    const values1 = array
      .map((item) => parseFloat(item[column1]))
      .filter((value) => !isNaN(value));

    const values2 = array
      .map((item) => parseFloat(item[column2]))
      .filter((value) => !isNaN(value));

    if (values1.length < 2 || values2.length < 2) {
      return null;
    }

    const variance1 = ss.variance(values1);
    const variance2 = ss.variance(values2);

    const fValue = variance1 / variance2;

    return fValue;
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      setSelectedColumn("");
      setSecondSelectedColumn("");
      setMean(null);
      setStdDev(null);
      setStdError(null);
      setCV(null);
      setCorrelation(null);
      setPValue(null);
      setFValue(null);

      if (file.name.endsWith(".csv")) {
        const fileReader = new FileReader();
        fileReader.onload = function (event) {
          const text = event.target.result;
          csvFileToArray(text);
        };
        fileReader.readAsText(file);
      } else if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
        readFile(file);
      } else {
        setError(
          "Unsupported file format. Please select a .csv, .xlsx, or .xls file."
        );
      }
    } else {
      setError("Please select a file.");
    }
  };

  const handleColumnSelectChange = (e) => {
    setSelectedColumn(e.target.value);
    if (e.target.value) {
      const columnMean = calculateMean(e.target.value);
      const columnStdDev = calculateStdDev(e.target.value);
      const columnStdError = calculateStdError(e.target.value);
      const columnCV = calculateCV(e.target.value);

      setMean(columnMean);
      setStdDev(columnStdDev);
      setStdError(columnStdError);
      setCV(columnCV);
    } else {
      setMean(null);
      setStdDev(null);
      setStdError(null);
      setCV(null);
    }
  };

  const handleSecondColumnSelectChange = (e) => {
    setSecondSelectedColumn(e.target.value);
    if (e.target.value) {
      const columnCorrelation = calculateCorrelation(
        selectedColumn,
        e.target.value
      );
      const sampleSize = array.length;

      setCorrelation(columnCorrelation);
      const pValue = calculatePValue(columnCorrelation, sampleSize);
      setPValue(pValue);

      const fVal = calculateFValue(selectedColumn, e.target.value);
      setFValue(fVal);
    } else {
      setCorrelation(null);
      setPValue(null);
      setFValue(null);
    }
  };

  const handleDownloadPdf = async () => {
    const doc = new jsPDF();

    // Watermark image
    const imageWidth = 130; // Adjust the width as needed
    const imageHeight = 10; // Adjust the height as needed
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const currentDate = new Date();

    // Format the date and time as a string (adjust the format as needed)
    const formattedDate = currentDate.toLocaleString();

    // Add watermark image to each page
    for (let i = 1; i <= doc.getNumberOfPages(); i++) {
      doc.setPage(i);
      doc.addImage(
        watermarkImage,
        "PNG",
        (pageWidth - imageWidth) / 2,
        10,
        imageWidth,
        imageHeight
      );

      doc.line(
        (pageWidth - imageWidth) / 2, // X-coordinate of the start point
        10 + imageHeight + 2, // Y-coordinate of the start point (2 units below the watermark)
        (pageWidth + imageWidth) / 2, // X-coordinate of the end point
        10 + imageHeight + 2 // Y-coordinate of the end point (2 units below the watermark)
      );
    }

    const startY = 45; // Adjust the starting Y-coordinate
    const margin = 10;
    const dateWidth =
      doc.getStringUnitWidth(formattedDate) * doc.internal.getFontSize();
    const dateX = pageWidth - dateWidth;
    const padding = 10; // Adjust the padding between lines
    doc.setFontSize(24); // Set the font size to 16 (adjust as needed)
    const titleText = "Statistical Analysis Report";
    const centerX = pageWidth / 4; // Calculate the X-coordinate to center the text
    doc.text(titleText, centerX, startY);
    doc.setFontSize(14);
    doc.text(`Report by: ${user.displayName}`, 10, startY + margin + padding);
    doc.text(
      `Selected Column: ${selectedColumn}`,
      10,
      startY + margin + 2 * padding
    );
    doc.text(
      `Mean: ${mean !== null ? mean.toFixed(2) : "N/A"}`,
      10,
      startY + margin + 3 * padding
    );
    doc.text(
      `Standard Deviation: ${stdDev !== null ? stdDev.toFixed(2) : "N/A"}`,
      10,
      startY + margin + 4 * padding
    );
    doc.text(
      `Standard Error: ${stdError !== null ? stdError.toFixed(2) : "N/A"}`,
      10,
      startY + margin + 5 * padding
    );
    doc.text(
      `CV: ${cv !== null ? cv.toFixed(2) + "%" : "N/A"}`,
      10,
      startY + margin + 6 * padding
    );
    doc.text(
      `Second Selected Column: ${secondSelectedColumn}`,
      10,
      startY + margin + 7 * padding
    );
    doc.text(
      `Correlation: ${correlation !== null ? correlation.toFixed(4) : "N/A"}`,
      10,
      startY + margin + 8 * padding
    );
    doc.text(
      `P-Value: ${pValue !== null ? pValue.toFixed(4) : "N/A"}`,
      10,
      startY + margin + 9 * padding
    );
    doc.text(
      `F-Value: ${fValue !== null ? fValue.toFixed(4) : "N/A"}`,
      10,
      startY + margin + 10 * padding
    );
    doc.text(
      `Date and Time of Report Generation: ${formattedDate}`,
      dateX,
      pageHeight - margin
    );

    // Assuming you have a ref for your LineChart component
    if (lineChartRef.current) {
      const canvas = await html2canvas(lineChartRef.current, {
        scale: 2, // Adjust the scale as needed for better quality
      });

      var chartImageData = canvas.toDataURL("image/png");

      // Calculate the aspect ratio to fit the chart in the PDF page
      const chartWidth = canvas.width;
      const chartHeight = canvas.height;
      const maxWidth = doc.internal.pageSize.getWidth() - 20; // Adjust the margin as needed
      const maxHeight = doc.internal.pageSize.getHeight() - 50; // Adjust the margin as needed
      const aspectRatio = chartWidth / chartHeight;

      let newWidth = 250; // Adjust the width as needed
      let newHeight = newWidth / aspectRatio;

      // If the graph height exceeds the maximum height, adjust it
      if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = newHeight * aspectRatio;
      }

      const marginLeft = (pageWidth - newWidth) / 2;
      const marginTop = startY + margin + 105;

      const chartImage = canvas.toDataURL("image/png");
      doc.addImage(
        chartImage,
        "PNG",
        marginLeft,
        marginTop,
        newWidth,
        newHeight
      );
    }

    // Save the PDF
    const fileName = file.name.replace(/\.[^/.]+$/, ""); // Remove file extension
    doc.save(`${fileName}_statistics.pdf`);

    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        selectedColumn,
        mean,
        stdDev,
        stdError,
        cv,
        secondSelectedColumn,
        correlation,
        pValue,
        fValue,
        chartImage: chartImageData,
        fileName,
      }),
    };

    // Replace "UserData" with the user's UID to store data under their ID
    const res = await fetch(
      `https://statdash-73260-default-rtdb.firebaseio.com/users/${userId}/analysis.json`,
      options
    );

    if (res) {
      console.log("Message sent");
      console.log(res.data);
    } else {
      console.log("Error occurred");
    }
  };

  const headerKeys = Object.keys(array.length > 0 ? array[0] : {});

  const datePattern = /^(\d{1,2}[-/]\d{1,2}[-/]\d{4})$/; // Updated pattern

  const selectableColumns = headerKeys.filter((key) =>
    array.some((item) => {
      const value = item[key];
      return (
        !isNaN(parseFloat(value)) && value !== "" && !datePattern.test(value)
      );
    })
  );

  // console.log(user);

  return (
    <div>
      <div
        className="container mx-auto p-5"
        style={{ paddingTop: "7rem", marginTop: "5rem" }}
      >
        <div className="md:flex md:items-center md:justify-center">
          <form className="flex flex-col items-center md:flex-row">
            <FileInput onChange={handleOnChange} />
            <button
              className="bg-blue-500 text-white py-2 px-3 ml-2 mt-2 md:ml-3 md:mt-0  rounded hover:bg-blue-700 block"
              onClick={(e) => {
                handleOnSubmit(e);
              }}
            >
              IMPORT FILE
            </button>
          </form>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        <p className="text-gray-500 mt-3 text-sm text-center">
          Large datasets may take a while to load, please be patient.
        </p>
        <TableDisplay array={array} headerKeys={headerKeys} />
        <div className="mt-10">
          <RowAnalysis rowData={array} headerKeys={headerKeys} />
          <ColumnSelect
            selectableColumns={selectableColumns}
            onSelectChange={handleColumnSelectChange}
            selectedColumn={selectedColumn}
            secondSelectedColumn={secondSelectedColumn}
            onSecondSelectChange={handleSecondColumnSelectChange}
          />
          <StatisticsDisplay
            selectedColumn={selectedColumn}
            mean={mean}
            stdDev={stdDev}
            stdError={stdError}
            cv={cv}
            secondSelectedColumn={secondSelectedColumn}
            correlation={correlation}
            pValue={pValue}
            fValue={fValue}
          />

          <LineChart
            array={array}
            selectedColumn={selectedColumn}
            secondSelectedColumn={secondSelectedColumn}
            lineChartRef={lineChartRef}
          />
          <div className="mt-10 flex justify-center">
            {" "}
            {/* Centering container */}
            {selectedColumn && (
              <button
                className="bg-green-500 text-white py-2 px-3 ml-2 mt-4 mb-3 rounded hover:bg-green-700 block"
                onClick={handleDownloadPdf}
              >
                Download Report
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
