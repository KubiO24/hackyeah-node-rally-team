import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.container}>
      <p className={styles.head}>Ingredients</p>
      <p className={styles.head}>Substitutions</p>
      <p className={styles.head}>Trening</p>
    </div>
  );
}
