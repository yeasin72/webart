import { useEffect, useRef } from "react";

/**
 * Pancil Draw.
 * 
 * To Draw using pancil inside the canvas.
 * @param {fuction} onDraw - call back function
 * @returns {unknown} canvasRef - Canvas ref return to do current things.
 */
export function useOnDraw(onDraw) {
    const canvasRef = useRef(null)
    const isDrawingRef =  useRef(false)

    const mouseMoveListenerRef = useRef(null)
    const mouseUpListenerRef = useRef(null)
    const mouseDownListenerRef = useRef(null)

    const prevPointRef = useRef(null)

    useEffect(() => {
        return () => {
            if (mouseMoveListenerRef.current) {
                window.removeEventListener("mousemove", mouseMoveListenerRef.current)
            }
            if (mouseUpListenerRef.current) {
                window.removeEventListener("mouseup", mouseUpListenerRef.current)
            }
        }
    }, [])

    /**
     * 
     * @param {ref} ref 
     * @returns {void}
     */
    function setCanvasRef(ref) {
        if (!ref) return
        if (canvasRef.current) {
            canvasRef.current.removeEventListener("mousedown", mouseDownListenerRef.current)
        }
        canvasRef.current = ref
        initMouseMoveListener()
        initMouseDownListner()
        initMouseUpListner()
    }



    function initMouseMoveListener() {
        const mouseMoveListener = (e) => {
            if (isDrawingRef.current) {
                const point = claculetPointInCanvas(e.clientX, e.clientY)
                const ctx = canvasRef.current.getContext('2d')
                if (onDraw) onDraw(ctx, point, prevPointRef.current)
                prevPointRef.current = point
            }
        }
        mouseMoveListenerRef.current = mouseMoveListener
        window.addEventListener("mousemove", mouseMoveListener)
    }



    function initMouseDownListner() {
        if (!canvasRef.current) return
        const listener = () => {
            isDrawingRef.current = true
        }
        mouseDownListenerRef.current = listener
        canvasRef.current.addEventListener("mousedown", listener)
    }



    function initMouseUpListner() {
        if (!canvasRef.current) return
        const listener = () => {
            isDrawingRef.current = false
            prevPointRef.current = null
        }
        mouseUpListenerRef.current = listener
        window.addEventListener("mouseup", listener)
    }



    function claculetPointInCanvas(clientX, clientY) {
        if (canvasRef.current) {
            const boundingRect = canvasRef.current.getBoundingClientRect()
            return {
                x: clientX - boundingRect.left,
                y: clientY - boundingRect.top,
            }
        }else {
            return null
        }
    }

    return setCanvasRef
}