import { Route, Routes } from "react-router-dom";
import "./Routing.css";
import Login from "../../AuthArea/Login/Login";
import Main from "../Main/Main";
import Logout from "../../AuthArea/Logout/Logout";
import NoRoute from "../../AuthArea/NoRoute/NoRoute";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Main/>} />
                <Route path="/logout" element={<Logout/>} />
                <Route path="*" element={<NoRoute/>} />
            </Routes>

        </div>
    );
}

export default Routing;
