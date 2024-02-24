import { useEffect, useState } from "react";
import VacationCard from "../../VacationsArea/VacationCard/VacationCard";
import "./Main.css";
import vacationService from "../../../service/vacations-service";
import VacationModel from "../../../models/vacation-model";
import { useNavigate } from "react-router-dom";
import { authStore } from "../../redux/redux";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Main(): JSX.Element {

    const [allVacations, setAllVacations] = useState<VacationModel[]>()
    const [myVacationsIds, setMyVacationsIds] = useState<number[]>()
    const [displayOnlyUserVacations, setDisplayOnlyUserVacations] = useState<boolean>(false)
    const [updateVacationsUserFollow, setUpdateVacationsUserFollow] = useState<boolean>(true)
    const [addButtonIsActive, setAddButtonIsActive] = useState<boolean>(false)
    const [formState, setFormState] = useState({
    
        country: "",
        description: "",
        price: "",
        dates: "",
        imageName:"",
        image: ""

    })


    const handleInputChange = (e: any) => {
        const { name, value, type } = e.target
        const newValue = name === "image" ? e.target.files[0] : value

        setFormState((prevFormState) => ({
            ...formState,
            [name]: newValue
        }))


    }


    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(formState)
  
    };


    const userId = authStore.getState().user?.userId
    const user = authStore.getState().user
    const navigate = useNavigate()

    async function deleteVacation(id: number) {
        //function change the state
        await vacationService.deleteVacation(id)
        setAllVacations(prevVacations => prevVacations.filter(v => v.vacationId !== id))
        //function that change the server

    }


    useEffect(() => {

        vacationService.getAllVacations()
            .then((data) => {
                setAllVacations(data)
                vacationService.getAllVacationFollowers()
                    .then(data => {
                        const vacationsUserFollows = data.filter(v => v.userId === userId)
                        setMyVacationsIds(prev => vacationsUserFollows.map(v => v.vacationId))
                    })
                    .catch(err => console.log(err))
            })
            .catch(() => {
                navigate("/login")
                alert("You are not logged in!")
                return
                //problem
            })

    }, [updateVacationsUserFollow])


    return (
        <div className="Main">

            <div className="menu">

                <div className="menu-btn-container">
                    <button className="my-vac" onClick={() => setDisplayOnlyUserVacations(true)}>My Vacations</button>
                    <button className="all-vac" onClick={() => setDisplayOnlyUserVacations(false)}>All Vacations</button>

                </div>
                <div className="vacations-area">
                    <p className="our-vacations">Our Vacations</p>
                    <button className="add-vacation" onClick={() => setAddButtonIsActive(!addButtonIsActive)}><FontAwesomeIcon icon={faPlus} /></button>
                    <div className="vacations-container" >

                        {allVacations && !displayOnlyUserVacations ? allVacations.map(
                            v => <VacationCard key={v.vacationId}
                                vacationId={v.vacationId}
                                country={v.country}
                                description={v.description}
                                dates={v.dates}
                                imageName={v.imageName}
                                price={v.price}
                                updateVacation={() => setUpdateVacationsUserFollow(!updateVacationsUserFollow)}
                                userId={userId}
                                user={user}
                                deleteVacation={(id: number) => deleteVacation(id)}


                            />
                        ) : allVacations && myVacationsIds && allVacations.filter(v => myVacationsIds.some(id => id === v.vacationId)).map(
                            v => <VacationCard key={v.vacationId}
                                vacationId={v.vacationId}
                                country={v.country}
                                description={v.description}
                                dates={v.dates}
                                imageName={v.imageName}
                                price={v.price}
                                updateVacation={() => setUpdateVacationsUserFollow(!updateVacationsUserFollow)}
                                userId={userId}
                                user={user}
                                deleteVacation={(id: number) => deleteVacation(id)}
                            />
                        )}






                    </div>
                </div>
            </div>
            <form className={`add-vacation-form  ${addButtonIsActive? "form-active" : ""}` } onSubmit={handleSubmit} >

                <h2>Add Vacations</h2>
                <label>Country
                    <input
                        value={formState.country}
                        onChange={handleInputChange}
                        placeholder="Country"
                        type="text"
                        name="country"
                        required

                    />
                </label>

                <label>Description
                    <input
                        value={formState.description}
                        onChange={handleInputChange}
                        placeholder="Description"
                        type="text"
                        name="description"
                        required
                    />
                </label>

                <label>Price
                    <input
                        value={formState.price}
                        onChange={handleInputChange}
                        placeholder="Price"
                        type="number"
                        name="price"
                        required
                    />
                </label>

                <label>Dates
                    <input
                        value={formState.dates}
                        onChange={handleInputChange}
                        placeholder="Dates"
                        type="date"
                        name="dates"
                        required
                    />
                </label>

                <label>Upload Image
                    <input
                        // value={formState.image}
                        onChange={handleInputChange}
                        placeholder="Image "
                        type="file"
                        name="image"
                        required
                    />
                </label>

                <button className="submit-btn" type="submit">Submit</button>

            </form>
        </div>
    );
}

export default Main;





