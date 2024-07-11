import React from 'react';
import {Link, Outlet} from "react-router-dom";

const App: React.FC = () => {
    return (
        <div>
            <Outlet/>
        </div>
    );
};

export default App;