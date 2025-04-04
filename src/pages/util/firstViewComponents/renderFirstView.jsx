import { useRef } from "react"
import UseFirstView from "./useFirstView";

export default function RenderFirstView({
    children,
    threshold = 0,
    root = null,
    rootMargin = "0px",
    ...elAtt
}) {
    const ref = useRef();
    const entered = UseFirstView(ref, { threshold, root, rootMargin });

    return (
        <div {...elAtt} ref={ref}>
            {entered && <div>{children}</div>}
        </div>
    )
};