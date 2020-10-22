import React, { Suspense } from 'react'
import Star from '../Components/Star'
import Button from '../Components/Button'
import prerender from '../Utils/prerender'

const NotFound = () => (
    <section className="page-404">
        <title tag="title">QUINZICAL</title>
        <meta name="description" content="404 page not found. This page doesn't exist" />
        {!prerender &&
            <Suspense fallback={null}>
                <Star />
            </Suspense>
        }
        <div className="page-404__message">
            <h1 className="page-404__error">Error 404</h1>
        </div>
    </section>
)

export default NotFound
