export default function Footer() {
    const today = new Date().toLocaleDateString();
    return (
        <>
        <div className="footer">
            <p>Today is {today}</p>
            <p>See my LinkedIn profile <a href="https://www.linkedin.com/in/jeffrey-ghinn-440908230/" target="_blank" rel="noopener noreferrer">here</a></p>
        </div>
        </>
    )
}