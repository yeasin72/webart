import React from 'react'
import { useOnDraw } from '../../Hooks/useOnDraw/useOnDraw'

const Canvas = ({height, width, artbordName}) => {

    const setPencilRef = useOnDraw(onDraw)

    function onDraw(ctx, points, prevPoint) {
        DrawLine(prevPoint, points, ctx, '#FFFFFF', 3)
        // DrawCircle(prevPoint, points, ctx, '#FFFFFF')
    }

    function DrawCircle(start, points, ctx, color) {
        console.log(start);
        ctx.arc(points.x, points.y, 100, 0, Math.PI * 2, false)
        ctx.stroke()
    }

    function DrawLine(start, end, ctx, color, width) {
        start = start ?? end;
        ctx.beginPath()
        ctx.lineWidth = width
        ctx.strokeStyle = color
        ctx.moveTo(start.x, start.y)
        ctx.lineTo(end.x, end.y)
        ctx.stroke()
        // making smooth
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(start.x, start.y, 1,0, 2 * Math.PI)
        ctx.fill()
    }

    return (
        <div className="canvas-container">
            <h4>{artbordName ? artbordName : 'Untitled'}</h4>
            <div className="canvas">
                <canvas height={height ? height : 750} width={width ? width : 1300}  style={canvasStyle} ref={setPencilRef}>
                </canvas>
            </div>
        </div>
    )
}

export default Canvas

const canvasStyle = {
}