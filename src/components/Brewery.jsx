import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import Tippy from "@tippyjs/react";
import styles from "./Brewery.module.css";
import beer from "../assets/beer.jpeg";

function Brewery() {
  const { breweryId } = useParams();
  const [brewery, setBrewery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`https://api.openbrewerydb.org/v1/breweries?by_ids=${breweryId}`)
      .then((response) => {
        const data = response.data[0];
        setBrewery(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [breweryId]);

  if (loading) return <Loader />;
  if (error) return <div>Error loading the details.</div>;
  if (!brewery) return <div>No brewery data found.</div>;

  const getTypeDescription = (type) => {
    switch (type) {
      case "micro":
        return "Most craft breweries.";
      case "nano":
        return "An extremely small brewery which typically only distributes locally.";
      case "regional":
        return "A regional location of an expanded brewery.";
      case "brewpub":
        return "A beer-focused restaurant or restaurant/bar with a brewery on-premise.";
      case "large":
        return "A very large brewery. Likely not for visitors.";
      case "planning":
        return "A brewery in planning or not yet opened to the public.";
      case "contract":
        return "A brewery that uses another brewery`s equipment.";
      case "proprietor":
        return "Similar to contract brewing but refers more to a brewery incubator.";
      case "closed":
        return "A location which has been closed.";
      default:
        return "No description available";
    }
  };

  return (
    <div className={styles.wrapper}>
      <img className={styles.img} src={beer} />
      <div className={styles.div}>
        <h2>{brewery.name}</h2>
        <p>
          Type: {""}
          <Tippy
            content={getTypeDescription(brewery.brewery_type)}
            animation="scale"
            arrow={false}
            delay={50}
            theme="light"
            placement="right"
          >
            <span className={styles.span}>{brewery.brewery_type}</span>
          </Tippy>
        </p>
        <p>
          Street: {brewery.street} <br></br>City: {brewery.city} <br></br>
          State: {brewery.state}
        </p>
        <p>
          {brewery.website_url ? (
            <a
              href={brewery.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.a}
            >
              Go to website
            </a>
          ) : (
            "No website available"
          )}
        </p>
      </div>
      <img className={styles.img} src={beer} />
    </div>
  );
}

export default Brewery;
