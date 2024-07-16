import React from 'react'
import App from './App'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {createRoot} from "react-dom/client"
// @ts-ignore
import {routes as postsRoutes} from 'posts/Routes'

const root = document.getElementById('root')
const app = createRoot(root)
const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            ...postsRoutes
        ]
    }
])
app.render(<RouterProvider router={router}/>)
/*
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);*/