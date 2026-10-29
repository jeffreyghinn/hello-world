export default function Footer() {
    const today = new Date().toLocaleDateString();
    return (
        <>
            <div className="footer">
                <p>Today is {today}</p>
            </div>
        </>
    )
}