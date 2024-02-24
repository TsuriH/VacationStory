import axios from "axios";
import VacationUserFollowModel from "../models/vacation-user-follow-model";
import VacationModel from "../models/vacation-model";
import CredentialsModel from "../models/credentials";
import { AuthActionType, authStore } from "../Components/redux/redux";


async function loggedInCheck(): Promise<boolean> {

    const response = await axios.get(`http://localhost:4004/api/auth/verify-logged-in`,
        {
            headers:
                { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }
    )

    console.log(response)

    if (response.data.success) return true
    return false
}

async function getAllVacations(): Promise<VacationModel[]> {

    const response = await axios.get(`http://localhost:4004/api/vacations`,
        {
            headers:
                { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        })


    const vacations = response.data

    return vacations

}


async function getAllVacationFollowers(): Promise<VacationUserFollowModel[]> {

    const response = await axios.get(`http://localhost:4004/api/vacation-followers`)

    const allVacationFollowers = response.data

    return allVacationFollowers

}

async function getCurrentVacationFollowers(vacationId: number): Promise<VacationUserFollowModel[]> {

    const response = await axios.get(`http://localhost:4004/api/vacation-followers/${vacationId}`)

    const vacationFollowers = response.data

    return vacationFollowers

}

async function addVacationFollower(vacationFollower: VacationUserFollowModel): Promise<void> {

    const response = await axios.post(`http://localhost:4004/api/vacation-followers/${vacationFollower.vacationId}`, { userId: vacationFollower.userId })

}

async function deleteVacationFollower(vacationFollower: VacationUserFollowModel): Promise<void> {

    const response = await axios.delete(`http://localhost:4004/api/vacation-followers/${vacationFollower.vacationId}`,
        { data: { userId: vacationFollower.userId } })
}




//***login***/

async function sendCredentials(credentials: CredentialsModel): Promise<void> {
    try {

        const result = await axios.post('http://localhost:4004/api/auth/login', credentials)

        const token = result.data

        localStorage.setItem("token", token)

        authStore.dispatch({ type: AuthActionType.login, payload: token })

    } catch (error: any) {

        console.log(error.message)
        throw error

    }



}

async function deleteVacation(id: number): Promise<void> {
    const result = await axios.delete(`http://localhost:4004/api/vacations/${id}`)
    //problem why don't I need here try and catch
}

async function addVacation(vacation: VacationModel): Promise<VacationModel> {
    const formData = new FormData()

    formData.append("country", vacation.country)
    formData.append("description", vacation.description)
    formData.append("price", vacation.price.toString())
    formData.append("dates", vacation.dates)
    formData.append("image", vacation.image[0])


    const result = await axios.post(`http://localhost:4004/api/vacations/` + formData)

    return result.data



}








const vacationService =
{
    getAllVacations,
    getCurrentVacationFollowers,
    addVacationFollower,
    deleteVacationFollower,
    getAllVacationFollowers,
    sendCredentials,
    loggedInCheck,
    deleteVacation,
    addVacation
}

export default vacationService