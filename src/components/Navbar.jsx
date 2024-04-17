import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.link}>
        Home
      </Link>
    </nav>
  );
}

export default Navbar;
