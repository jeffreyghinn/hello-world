import {
    BrowserRouter,
    Link,
    Navigate,
    Route,
    Routes,
} from "react-router";
import { useEffect, useState } from "react";

import About from "./About";
import Footer from "./Footer";
import Projects from "./Projects";
import ProfilePic from "./ProfilePic";
import WavingHand from "./WavingHand";

function Homepage({ darkMode, onToggleTheme }) {
    return (
        <>
            <button
                className="theme-toggle"
                type="button"
                onClick={onToggleTheme}
                aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
                aria-pressed={darkMode}
            >
                {darkMode ? "☀️ Light mode" : "🌙 Dark mode"}
            </button>
            <ProfilePic />
            <h1>Hello!</h1>
            <About />
            <Projects />
            <Footer />
            <WavingHand />
        </>
    );
}

function SecretPage() {
    return (
        <main className="secret-screen">
            <h1>You found the secret page!</h1>
            <p>A little hidden corner of my website.</p>
            <Link to="/homepage">Back to the main page</Link>
        </main>
    );
}

function NotFoundPage() {
    return (
        <main>
            <h1>Page not found</h1>
            <Link to="/homepage">Back to the main page</Link>
        </main>
    );
}

export default function App() {
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = window.localStorage.getItem("theme");
        return savedTheme
            ? savedTheme === "dark"
            : window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    useEffect(() => {
        const theme = darkMode ? "dark" : "light";
        document.documentElement.dataset.theme = theme;
        window.localStorage.setItem("theme", theme);
    }, [darkMode]);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Navigate to="/homepage" replace />}
                />
                <Route
                    path="/homepage"
                    element={
                        <Homepage
                            darkMode={darkMode}
                            onToggleTheme={() => setDarkMode((current) => !current)}
                        />
                    }
                />
                <Route path="/secret" element={<SecretPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}
