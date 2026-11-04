import { useEffect } from "react";

const BADGE_SCRIPT_SRC = "https://get.microsoft.com/badge/ms-store-badge.bundled.js";

// Load Microsoft's badge script once, and only if a badge is rendered
function loadBadgeScript() {
    if (document.querySelector(`script[src="${BADGE_SCRIPT_SRC}"]`)) return;
    const script = document.createElement("script");
    script.type = "module";
    script.src = BADGE_SCRIPT_SRC;
    document.head.appendChild(script);
}

export default function StoreBadge({ productId, productName }) {
    useEffect(() => {
        loadBadgeScript();
    }, []);

    return (
        <ms-store-badge
            productid={productId}
            productname={productName}
            window-mode="direct"
            theme="auto"
            size="small"
            language="en-us"
            animation="on"
        ></ms-store-badge>
    );
}