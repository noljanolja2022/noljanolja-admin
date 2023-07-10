import { useEffect, useState } from "react"

export default function useWindowMQ() {
    const [width, setWidth] = useState(0)
    const isLg = width > 1024
    const isMd = width >= 500
    const isSm = width < 500
    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth)
        }
        window.addEventListener("resize", handleResize)
        handleResize()
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [setWidth])

    return { isMd, isLg, isSm}
}