import React, { useRef, useEffect } from 'react'
import { randomInt } from 'mathjs'

const Star = () => {
    const width = useRef(window.innerWidth)
    const height = useRef(window.innerHeight)
    const start = useRef(Date.now())
    const canvasRef = useRef()
    const context = useRef()
    const stars = useRef([])

    useEffect(() => {
        context.current = canvasRef.current.getContext('2d')
        canvasRef.current.width = width.current
        canvasRef.current.height = height.current

        for (let i = 0; i < 100; i++) {
            const size = randomInt(1, 4)

            const star = {
                x: randomInt(5, width.current),
                y: randomInt(5, height.current),
                name: size.toString(),
                size,
            }

            stars.current.push(star)

            context.current.beginPath()
            context.current.arc(star.x, star.y, star.size, 0, 2 * Math.PI)
            context.current.fillStyle = "#e6e6e6"
            context.current.fill()
        }
    }, [])

    useEffect(() => {
        let animation

        const animate = () => {
            animation = requestAnimationFrame(animate)

            const time = Date.now()
            const delta = (start.current - time) * -0.08
            start.current = time

            context.current.clearRect(0, 0, width.current, height.current)

            for (let i = 0; i < 100; i++) {
                stars.current[i].x += delta * parseInt(stars.current[i].name, 10) * 0.2
                if (stars.current[i].x > width.current) stars.current[i].x = 0

                context.current.beginPath()
                context.current.arc(stars.current[i].x, stars.current[i].y, stars.current[i].size, 0, 2 * Math.PI)
                context.current.fillStyle = "#e6e6e6"
                context.current.fill()
            }
        }

        animate()

        return () => {
            cancelAnimationFrame(animation)
        }
    }, [])

    return <canvas className="stars" ref={canvasRef}></canvas>
}

export default Star