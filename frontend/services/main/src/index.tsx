import React from 'react'
import App from './App';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {createRoot} from "react-dom/client";

const root = document.getElementById('root')
const app = createRoot(root)
const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: 'posts',
                element: <div>posts</div>
            }
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