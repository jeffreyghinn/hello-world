import StoreBadge from "./StoreBadge";

const projects = [
    {
        name: "WinUI Notes",
        description: "WinUI Notes is a simple, fast, and lightweight note-taking app for Windows. Whether you're jotting down ideas, creating reminders, or keeping important information close at hand, WinUI Notes provides a clean and distraction-free experience.",
        storeProductId: "9nf0jnjqqtzt",
    },
    {
        name: "Swoop Minimizer",
        description: "Swoop Minimize gives minimizing a little character. When you minimize a window, it swoops down into the taskbar in one smooth, curving motion and lands in a taskbar button of its own. The button shows a miniature of the window with the app's icon in the corner, so you can see at a glance what's waiting for you. Hover over it for a larger picture, and click it to swoop the window back out to exactly where it was."
        storeProductId: "9N20DF817NXS",
    },
];

export default function Projects() {
    return (
        <>
            <div className="projects-section">
            <h2>A few personal projects</h2>
            <ul>
                {projects.map((p) => (
                    <li key={p.name}>
                        <h4>{p.name}</h4>
                        <p>{p.description}</p>
                        {p.storeProductId ? (
                            <StoreBadge productId={p.storeProductId} productName={p.name} />
                        ) : p.linkUrl && (
                            <a href={p.linkUrl} target="_blank" rel="noopener noreferrer">{p.linkText}</a>
                        )}
                    </li>
                ))}
            </ul>
            </div>
        </>
    )
}