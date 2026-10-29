const today = new Date().toLocaleDateString();

export default function Footer() {
    return (
        <>
            <p>Today is {today}</p>
        </>
    )
}