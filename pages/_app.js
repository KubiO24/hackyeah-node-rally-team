import Header from "../components/Header";
import "../styles/globals.css";
import { useEffect, useState } from "react";
import dotenv from "dotenv";

dotenv.config();

export default function App({ Component, pageProps }) {
    const [activePage, setActivePage] = useState("userForm");

    const navigateToPage = (page) => {
        setActivePage(page);
    };

    useEffect(() => {
        if (localStorage.getItem("weight") !== null) setActivePage("ingredients");
    }, []);

    return (
        <>
            {activePage !== "userForm" && <Header activePage={activePage} navigateToPage={navigateToPage} />}
            <Component {...pageProps} navigateToPage={navigateToPage} activePage={activePage} />
        </>
    );
}
