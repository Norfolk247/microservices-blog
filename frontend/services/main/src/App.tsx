import React from 'react'
import {Outlet} from "react-router-dom"
import {MyAppBar} from "@packages/shared"
import {Box} from "@mui/material"

const App: React.FC = () => {
    return (
        <>
            <MyAppBar/>
            <Box display="flex" minHeight="83vh">
                <Outlet/>
            </Box>
        </>
    )
}

export default App