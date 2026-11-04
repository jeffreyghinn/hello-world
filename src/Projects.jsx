import StoreBadge from "./StoreBadge";

const projects = [
    {
        name: "WinUI Notes",
        description: "WinUI Notes is a simple, fast, and lightweight note-taking app for Windows. Whether you're jotting down ideas, creating reminders, or keeping important information close at hand, WinUI Notes provides a clean and distraction-free experience.",
        storeProductId: "9nf0jnjqqtzt",
    },
    {
        name: "Swoop Minimizer",
        description: "Swoop Minimizer adds an effect to the action of minimizing any window. It swoops down into the taskbar, similar to effects available on other mainstream operating systems. This is currently in development, to be released soon."
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