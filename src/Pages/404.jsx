import React, { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import Stars from './Components/Stars'
import Button from './Components/Button'
import prerender from 'utils/prerender'
import './index.css'

const NotFound = () => (
    <section className="page-404">
        <Helmet>
            <title tag="title">QUINZICAL</title>
            <meta name="description" content="404 page not found. This page doesn't exist" />
        </Helmet>
        {!prerender &&
            <Suspense fallback={null}>
                <Stars />
            </Suspense>
        }
        <div className="page-404__message">
            <h1 className="page-404__error">Error 404</h1>
            <p className="page-404__text">This page could not be found.</p>
        </div>
        <Button href="/" className="page-404__button">Go Home</Button>
    </section>
)

export default NotFound
