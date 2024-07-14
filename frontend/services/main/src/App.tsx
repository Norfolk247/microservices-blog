import React from 'react';
import {Link, Outlet} from "react-router-dom";
import {MyAppBar} from "@packages/shared"

const App: React.FC = () => {
    return (
        <div>
            <MyAppBar/>
            host
            <Outlet/>
        </div>
    );
};

export default App;