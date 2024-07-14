import React from 'react'
import {Outlet} from "react-router-dom"

const App = () => {
    return (
        <div>
            post module
            <Outlet/>
        </div>
    )
}

export default App