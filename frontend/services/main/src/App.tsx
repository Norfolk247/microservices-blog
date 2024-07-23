import React from 'react'
import {Outlet} from "react-router-dom"
import {MyAppBar} from "@packages/shared"

const App: React.FC = () => {
    return (
        <div>
            <MyAppBar/>
            <Outlet/>
        </div>
    )
}

export default App