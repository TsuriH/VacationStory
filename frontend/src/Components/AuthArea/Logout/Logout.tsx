import { useEffect } from "react";
import "./Logout.css";
import { useNavigate } from "react-router-dom";
import { AuthActionType, authStore } from "../../redux/redux";

function Logout(): JSX.Element {

    const navigate = useNavigate()

    useEffect(() => {


        localStorage.removeItem("token")
        authStore.dispatch({ type: AuthActionType.logout, payload: "" })
        navigate("/login")

    }, [])




    return (
        <div className="Logout">

        </div>
    );
}

export default Logout;
