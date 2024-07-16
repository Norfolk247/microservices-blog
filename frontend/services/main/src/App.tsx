import React from 'react'
import {Link, Outlet} from "react-router-dom"
import {MyAppBar} from "@packages/shared"
import MyLogtoProvider from "@packages/shared/src/components/MyLogtoProvider"

const App: React.FC = () => {
    return (
        <MyLogtoProvider>
            <MyAppBar/>
            host
            <Outlet/>
        </MyLogtoProvider>
    )
}

export default App