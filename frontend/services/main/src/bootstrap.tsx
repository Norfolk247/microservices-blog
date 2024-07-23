import React from 'react'
import App from './App'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {createRoot} from "react-dom/client"
// @ts-ignore
import {routes as postsRoutes} from 'posts/Routes'
import AuthCallback from "./routes/AuthCallback"
import MyLogtoProvider from "@packages/shared/src/components/MyLogtoProvider"

const root = document.getElementById('root')
const app = createRoot(root)
const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            ...postsRoutes,
            {
                path: 'callback',
                element: <AuthCallback/>
            }
        ]
    }
])
app.render(
    <MyLogtoProvider>
        <RouterProvider router={router}/>
    </MyLogtoProvider>
)
/*
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);*/