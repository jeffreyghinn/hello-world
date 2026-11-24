import {
    BrowserRouter,
    Link,
    Navigate,
    Route,
    Routes,
} from "react-router";

import About from "./About";
import Footer from "./Footer";
import Projects from "./Projects";
import ProfilePic from "./ProfilePic";
import WavingHand from "./WavingHand";

function Homepage() {
    return (
        <>
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
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Navigate to="/homepage" replace />}
                />
                <Route path="/homepage" element={<Homepage />} />
                <Route path="/secret" element={<SecretPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}
