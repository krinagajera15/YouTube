import { Outlet } from "react-router-dom"
import { Navbar } from "../Component/Navbar"
import { Sidebar } from "../Component/Sidebar"

export const RouterLayout=()=>{
// aa levathi navbar je badha page ma call karavta te anhiya 1 var call karavi 
//  ne pachi router vala page ma call kari devanu atle 1 varj call karvu pade
    return(
        <>
         <Navbar/>
         <Sidebar/>
        <Outlet/>
        
        </>
    )
}