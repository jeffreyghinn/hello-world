import { Link } from "react-router";

export default function WavingHand() {
    return (
        <Link
            className="waving-hand-link"
            to="/secret"
            aria-label="Visit the secret page"
        >
            <span className="waving-hand-emoji" aria-hidden="true">
                👋
            </span>
        </Link>
    );
}
