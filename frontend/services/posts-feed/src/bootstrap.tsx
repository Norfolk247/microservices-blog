import React, {Suspense} from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {createRoot} from "react-dom/client";
import {AppLazy} from "./App.lazy"

const root = document.getElementById('root')
const app = createRoot(root)

export const routes = [
    {
        path: '/posts',
        element: <Suspense><AppLazy/></Suspense>
    }
]
export const router = createBrowserRouter(routes)
app.render(<RouterProvider router={router}/>)