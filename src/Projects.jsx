const projects = [
    {
        name: "WinUI Notes",
        description: "WinUI Notes is a simple, fast, and lightweight note-taking app for Windows. Whether you're jotting down ideas, creating reminders, or keeping important information close at hand, WinUI Notes provides a clean and distraction-free experience.",
        linkUrl: "https://apps.microsoft.com/detail/9nf0jnjqqtzt?hl=en-US&gl=TO",
        linkText: "View in the Microsoft Store",
    },
];

export default function Projects() {
    return (
        <>
            <h2>A few personal projects</h2>
            <ul>
                {projects.map((p) => (
                    <li key={p.name}>
                        <h4>{p.name}</h4>
                        <p>{p.description}</p>
                        <a href={p.linkUrl} target="_blank">{p.linkText}</a>
                    </li>
                ))}
            </ul>
        </>
    )
}