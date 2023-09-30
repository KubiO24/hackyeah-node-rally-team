import styles from "./Header.module.css";

export default function Header({ activePage, navigateToPage }) {
    return (
        <div className={styles.container}>
            <p
                className={`${styles.link} ${activePage == "ingredients" && styles.selected}`}
                onClick={() => navigateToPage("ingredients")}
            >
                Ingredients
            </p>
            <p
                className={`${styles.link} ${activePage == "substitutions" && styles.selected}`}
                onClick={() => navigateToPage("substitutions")}
            >
                Substitutions
            </p>
            <p
                className={`${styles.link} ${activePage == "training" && styles.selected}`}
                onClick={() => navigateToPage("training")}
            >
                Training
            </p>
        </div>
    );
}
