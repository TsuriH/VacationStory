import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";
import { useEffect, useState } from "react";
import vacationService from "../../../service/vacations-service";
import { useNavigate,useLocation,  } from 'react-router-dom';

function Login(): JSX.Element {

    const [userCredentials, setUserCredentials] = useState({

        userName: "",
        password: "",
    })

    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {


        vacationService.loggedInCheck()
            .then(() => {
                navigate("/home")
                console.log(location)
                // alert("You can't get to the login page while you are already logged in!")

            })
            .catch(() => console.log("user is logged out") )

    }, [])

    function getCredentials(fieldName: string, value: string) {
        setUserCredentials(prev => ({ ...prev, [fieldName]: value }))


    }

    //function that onclick send to the backend

    async function sendCredentials() {
        try {
            await vacationService.sendCredentials(userCredentials)
            navigate('/home')

        } catch (error: any) {
            alert(error.response.data.message)
        }

    }


    //if the credetials are good it will transfer him to the next page, cause the browser will allow it cause its had the token

    //****** DISPLAY *********/

    return (
        <div className="Login">

            <div className="bg">
                <div className="login-container">
                    <form className="login-box" onSubmit={() => console.log("True")}>
                        <h2>login</h2>

                        <div className="user-name-input-container-user">
                            <input
                                className="user-name"
                                placeholder="user Name"
                                onChange={(e) => { getCredentials("userName", e.target.value) }}
                            />
                            <FontAwesomeIcon className="fa-user" icon={faUser} />
                        </div>

                        <div className="user-name-input-container-lock">
                            <input
                                className="password"
                                name="search"
                                placeholder="password"
                                onChange={(e) => { getCredentials("password", e.target.value) }}
                            />
                            <FontAwesomeIcon className="fa-lock" icon={faLock} />
                        </div>

                        <button type="button" className="login" onClick={() => sendCredentials()} >
                            login
                        </button >

                        <p>Don't have an account? <span>Register</span></p>
                    </form>

                </div>
            </div>

        </div>
    );
}

export default Login;
