import React from 'react'
import {Outlet} from "react-router-dom"
import {MyAppBar} from "@packages/shared"
import {Box, Paper} from "@mui/material"

const App: React.FC = () => {
    return (
        <>
            <MyAppBar/>
            <Paper elevation={3} style={{ padding: '20px', margin: '20px', backgroundColor: '#f5f5f5' }}>
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="83vh">
                    <Outlet/>
                </Box>
            </Paper>
        </>
    )
}

export default App