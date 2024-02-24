import Routing from "../Routing/Routing";
import "./Layout.css";
import { NavLink, useLocation } from "react-router-dom";
import { authStore } from "../../redux/redux";
import { useEffect, useState } from "react";
import UserModel from "../../../models/UserModel";


function Layout(): JSX.Element {

    const { pathname } = useLocation()
    const hideHeaderPaths: string[] = ['/login']

    const [user, setUser] = useState<UserModel | null>(authStore.getState().user || null)
    
    useEffect(() => {


        setUser(authStore.getState().user);

        const unsubscribe = authStore.subscribe(() => {
            const updatedUser = authStore.getState().user
            setUser(updatedUser)
            alert("Change")

        });
        
        return () => unsubscribe();

    }, []);


    return (
        <div className="Layout" style={{ display: hideHeaderPaths.includes(pathname) ? "block" : "grid" }}>


            {!hideHeaderPaths.includes(pathname) && user  && 
            (<header><p>{`${user.firstName} ${user.lastName}`}  |<NavLink to={"/logout"}>Logout</NavLink> </p></header>)}

            <main>
                {/* <Main /> */}
                <Routing />
            </main>
            {!hideHeaderPaths.includes(pathname) && (<footer>this is the footer</footer>)}






        </div>
    );
}

export default Layout;
