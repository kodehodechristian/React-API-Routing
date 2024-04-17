import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Brewery from "./components/Brewery";
import BreweryList from "./components/BreweryList";
import Loader from "./components/Loader";

function App() {
  const [breweries, setBreweries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://api.openbrewerydb.org/v1/breweries")
      .then((response) => {
        setBreweries(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        {loading ? (
          <Loader />
        ) : (
          <Routes>
            <Route path="/" element={<BreweryList breweries={breweries} />} />
            <Route path="/brewery/:breweryId" element={<Brewery />} />
          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;
