import { useState, useEffect } from "react";
import * as ss from "simple-statistics";
import * as jStat from "jstat";

export function useStatistics() {
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

  const calculateMean = (column) => {
    // Calculate the mean here
    // ...
  };

  const calculateStdDev = (column) => {
    // Calculate standard deviation here
    // ...
  };

  const calculateStdError = (column) => {
    // Calculate standard error here
    // ...
  };

  const calculateCV = (column) => {
    // Calculate coefficient of variation here
    // ...
  };

  const calculateCorrelation = (column1, column2) => {
    // Calculate correlation here
    // ...
  };

  const calculatePValue = (correlation, sampleSize) => {
    // Calculate p-value here
    // ...
  };

  const calculateFValue = (column1, column2) => {
    // Calculate F-value here
    // ...
  };

  useEffect(() => {
    // Perform calculations when the array or selected columns change
    if (array.length > 0 && selectedColumn) {
      setMean(calculateMean(selectedColumn));
      setStdDev(calculateStdDev(selectedColumn));
      setStdError(calculateStdError(selectedColumn));
      setCV(calculateCV(selectedColumn));

      if (secondSelectedColumn) {
        const columnCorrelation = calculateCorrelation(
          selectedColumn,
          secondSelectedColumn
        );
        setCorrelation(columnCorrelation);

        const sampleSize = array.length;
        const pValue = calculatePValue(columnCorrelation, sampleSize);
        setPValue(pValue);

        const fVal = calculateFValue(selectedColumn, secondSelectedColumn);
        setFValue(fVal);
      } else {
        setCorrelation(null);
        setPValue(null);
        setFValue(null);
      }
    } else {
      setMean(null);
      setStdDev(null);
      setStdError(null);
      setCV(null);
      setCorrelation(null);
      setPValue(null);
      setFValue(null);
    }
  }, [array, selectedColumn, secondSelectedColumn]);

  return {
    array,
    setArray,
    error,
    selectedColumn,
    setSelectedColumn,
    secondSelectedColumn,
    setSecondSelectedColumn,
    mean,
    stdDev,
    stdError,
    cv,
    correlation,
    pValue,
    fValue,
    calculateMean,
    calculateStdDev,
    calculateStdError,
    calculateCV,
    calculateCorrelation,
    calculatePValue,
    calculateFValue,
  };
}
