import "./VacationCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faHeart, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from "react";
import vacationsService from "../../../service/vacations-service";
import VacationUserFollowModel from "../../../models/vacation-user-follow-model";
import UserModel from "../../../models/UserModel";
import RoleModel from "../../../models/RoleModel";

interface vacationProps {
    vacationId: number;
    country: string;
    description: string;
    dates: string;
    imageName: string;
    price: number;
    updateVacation: Function
    userId: number
    user: UserModel
    deleteVacation: Function
}



function VacationCard(props: vacationProps): JSX.Element {
    const [heartPressed, setHeartPressed] = useState<boolean>(false)
    const [vacationFollowers, setVacationFollowers] = useState<number>(0)
    const [vacationDesOpen, setVacationDesOpen] = useState<boolean>(false)


    const myImage = `http://localhost:4004/1-assets/images/${props.imageName}`
    const userId = props.userId
    const vacationId = props.vacationId
    const test = new VacationUserFollowModel({ vacationId: vacationId, userId: userId })

    useEffect(() => {
        vacationsService.getCurrentVacationFollowers(props.vacationId)
            .then((data) => {

                setVacationFollowers(data.length)

                const userAlreadyFollowThisVacation = data.find(v => v.userId === userId && v.vacationId === vacationId)

                setHeartPressed((prevHeartPressed) =>

                    userAlreadyFollowThisVacation ? prevHeartPressed = true : prevHeartPressed = false)
            })
            .catch((err) => console.log(err)
            )
    }, [heartPressed])

    //function that change the heart from empty to full and vice versa
    async function heartToggle() {

        await updateFollowers()

        setHeartPressed(prevHeartPressed => !prevHeartPressed)
        props.updateVacation()

    }

    //object that has userId and vacationId public userId: number;
    async function updateFollowers() {

        if (heartPressed) {

            await vacationsService.deleteVacationFollower(test)
        }
        else {

            await vacationsService.addVacationFollower(test)
        }

    }

    function toggleVacationDescription() {

        setVacationDesOpen(!vacationDesOpen)
    }

    /********************DISPLAY***********************/
    return (
        <div className="VacationCard">

            <div className="main-card" style={{
                backgroundImage:
                    `url(${myImage})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }} >

                <div className="follow-container">
                    <div className="followers-container">
                        <p>Followers: </p>
                        <p className="number-of-followers">{vacationFollowers}</p>
                    </div>
                    {props.user.roleName === RoleModel.User &&
                        <div className="heart-like" onClick={() => heartToggle()}>
                            {/* problem, why when I switch between the below fontawesome icons the heart is out the center */}
                            {heartPressed ? <FontAwesomeIcon className="full-heart" icon={faHeart} size={"2x"} color="rgb(128, 38, 33)" /> : ""}
                            <FontAwesomeIcon icon={faHeartRegular} size={"2x"} color="white" />
                            <FontAwesomeIcon className="full-heart-hover" icon={faHeart} size={"2x"} color="rgb(128, 38, 33)" />
                        </div>
                    }
                </div>

                <div className="vacation-info">
                    <p>{props.country}</p>

                    <div className="all-btn-container">
                        {props.user.roleName === RoleModel.Admin &&
                            <>
                                <button className="edit-vacation">
                                    <FontAwesomeIcon icon={faPenToSquare} size={"lg"} />
                                </button>
                               
                                <button className="delete-vacation" onClick={() => props.deleteVacation(props.vacationId)}>
                                    <FontAwesomeIcon icon={faTrash} size={"lg"}   />
                                </button>
                            </>

                        }

                        <button className="details-btn " onClick={() => toggleVacationDescription()} >
                            <FontAwesomeIcon className={`${vacationDesOpen ? "angel-arrow-stop" : "angel-arrow"}`} icon={faAngleDown} size={"lg"} color={"aliceblue"} />
                        </button>

                        {/* problem the buttons above I can't make all the same cause the angle down is smaller than others so what I did is just
                        giving the others different padding so it looks the same but this way is seems not the right way to do */}

                    </div>
                </div>


            </div>
            <div className={`details-closed ${vacationDesOpen ? 'div-for-padding-problem' : ""}`}>

                <div className='details-open'><p>{props.description}</p></div>
            </div>


            {/* Cant understand it I have tried also <div className={`vacationDesOpen?"blue": "unblue"`} it still doesnt work, and the weird thing is that */}




        </div>
    )
}
export default VacationCard;

