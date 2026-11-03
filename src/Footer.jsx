import { FaLinkedin } from "react-icons/fa";

export default function Footer() {
    const today = new Date().toLocaleDateString(undefined, {
        dateStyle: 'full'
    });
    return (
        <>
        <div className="footer">
            <p>Today is {today}</p>
            <a href="https://www.linkedin.com/in/jeffrey-ghinn-440908230/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile"><FaLinkedin size={24} /></a>
        </div>
    </>
  );
}