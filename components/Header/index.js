import Link from "next/link";
import styles from "./Header.module.css";
import { useEffect } from "react";

export default function Header({ navigateToPage }) {
  return (
    <div className={styles.container}>
      <p
        className={styles.head}
        onClick={() => {
          console.log("clicked");
          navigateToPage("ingredients");
        }}
      >
        Ingredients
      </p>
      <p
        className={styles.head}
        onClick={() => navigateToPage("substitutions")}
      >
        Substitutions
      </p>
      <p className={styles.head} onClick={() => navigateToPage("training")}>
        Training
      </p>
    </div>
  );
}
