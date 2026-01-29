import { createBrowserRouter } from "react-router-dom";
import { Homepage } from "../Pages/HomePage";
import { Loginpage } from "../Pages/LoginPage";
import { AuthGuard } from "../Guard/AuthGuard";
import { VideoCard } from "./Card";
import { AdminDashbordpage } from "../Pages/AdminDashbordPage";


export const routere=createBrowserRouter([
    {
        path:"/login",
        element:<Loginpage/>
    },
    {
        path:"/",
        element:<AuthGuard/>,
        children:[//je page ma navbar rakhva hoy te page ne children ni under rakhva
            {
                path:"/",
                element:<Homepage/>
            },
             {
                path:"/addvideo",
                element:<VideoCard/>
            },
            {
                path:"/admindash",
                element:<AdminDashbordpage/>
            },
           
           

        ]
    },
])