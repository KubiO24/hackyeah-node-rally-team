import Header from "../components/Header";
import "../styles/globals.css";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
    const [activePage, setActivePage] = useState("userForm");

    const navigateToPage = (page) => {
        if (localStorage.getItem("weight") == undefined) return;
        setActivePage(page);
    };

    useEffect(() => {
        console.log("activePage: ", activePage);
    }, [activePage]);

    return (
        <>
            <Header navigateToPage={navigateToPage} />
            <Component {...pageProps} navigateToPage={navigateToPage} activePage={activePage} />
        </>
    );
}
