import React from 'react'
import App from './App';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {createRoot} from "react-dom/client";

const root = document.getElementById('root')
const app = createRoot(root)

export const routes = [
    {
        path: '/posts',
        element: <App/>
    }
]
export const router = createBrowserRouter(routes)
app.render(<RouterProvider router={router}/>)