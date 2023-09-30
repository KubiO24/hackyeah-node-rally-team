import { useState } from "react";
import styles from "../../styles/Pages.module.css";

export default function Index({ navigateToPage }) {
    const [response, setResponse] = useState("");

    const handleClick = () => {
        chrome.runtime.sendMessage({ type: "getRecipeData" }, (recipeData) => {
            setResponse(JSON.stringify(recipeData));
        });
    };

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <button onClick={handleClick}>click</button>
                <p>{response}</p>
                <h1 className={styles.title}>NEXT-CHROME-STARTER</h1>
                <p className={styles.description}>
                    This is an example of a Browser Extension built with NEXT.JS. Please refer to the GitHub repo for
                    running instructions and documentation
                </p>
                <h1 className={styles.code}>Index Page ./components/Index/index.js</h1>
                <p>{"[ - This is Index page content - ]"}</p>
                <p onClick={() => navigateToPage("new")}>{"Go to New Page >"}</p>
            </main>
        </div>
    );
}
