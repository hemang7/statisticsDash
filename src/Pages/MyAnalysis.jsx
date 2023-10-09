import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { getDatabase, ref, get } from "firebase/database";
import AnalysisItem from "../components/AnalysisItem";
import { UserAuth } from "../context/AuthContext";

function MyAnalysis() {
  const [userAnalyses, setUserAnalyses] = useState([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = UserAuth();
  const userId = user.uid;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const db = getDatabase();
          const userAnalysisRef = ref(db, `users/${userId}/analysis`);
          const snapshot = await get(userAnalysisRef);

          if (snapshot.exists()) {
            const analysesArray = Object.values(snapshot.val());
            setUserAnalyses(analysesArray);
          } else {
            setUserAnalyses([]);
          }
        } else {
          setUserAnalyses([]);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user analyses:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleAnalysisClick = (analysis) => {
    setSelectedAnalysis(analysis);
  };

  const handleBackButtonClick = () => {
    setSelectedAnalysis(null);
  };

  return (
    <div className="container mx-auto p-4" style={{ marginTop: "4.5rem" }}>
      <h1 className="text-3xl font-semibold mb-6">My Analysis</h1>
      {isLoading ? (
        <p className="h-48 flex flex-col justify-center items-center">
          Loading...
        </p>
      ) : userAnalyses.length === 0 ? (
        <div
          className="h-48 flex flex-col justify-center items-center"
          style={{ fontSize: "1.5rem" }}
        >
          No Analysis found.
        </div>
      ) : selectedAnalysis ? (
        <div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mb-4"
            onClick={handleBackButtonClick}
          >
            Back
          </button>
          <AnalysisItem analysis={selectedAnalysis} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {userAnalyses.map((analysis, index) => (
            <div
              key={index}
              onClick={() => handleAnalysisClick(analysis)}
              className="cursor-pointer bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300"
            >
              <h2 className="text-xl mt-5 font-semibold mb-2 text-center">
                {analysis.fileName +
                  " " +
                  analysis.selectedColumn +
                  " & " +
                  analysis.secondSelectedColumn}
              </h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyAnalysis;
