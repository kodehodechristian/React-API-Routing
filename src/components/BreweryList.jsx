import React from "react";
import { Link } from "react-router-dom";
import styles from "./BreweryList.module.css";
import beer from "../assets/beer.jpeg";

function BreweryList({ breweries }) {
  return (
    <div className={styles.wrapper}>
      <img className={styles.img} src={beer} />
      <div className={styles.div}>
        <h1 className={styles.h1}>List of Breweries</h1>
        <ul>
          {breweries.map((brewery) => (
            <li key={brewery.id} className={styles.li}>
              <Link to={`/brewery/${brewery.id}`} className={styles.link}>
                {brewery.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <img className={styles.img} src={beer} />
    </div>
  );
}

export default BreweryList;
