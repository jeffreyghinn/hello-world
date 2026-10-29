export default function Footer() {
    const today = new Date().toLocaleDateString();
    return (
        <>
            <p>Today is {today}</p>
        </>
    )
}