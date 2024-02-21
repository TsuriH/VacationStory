import { createStore } from 'redux'
import UserModel from '../../models/UserModel';
import { jwtDecode } from "jwt-decode";

export class AuthState {
    public token: string = null;
    public user: UserModel = null;

    public constructor() {
        this.token = localStorage.getItem("token");
        if (this.token) {
            const container: { user: UserModel } = jwtDecode(this.token)
            this.user = container.user
            console.log(this.user)

        }
    }
}

export enum AuthActionType {
    register = "register",
    login = "login",
    logout = "logout"
}



export interface AuthAction {
    type: AuthActionType,
    payload?: any

}

export function authReducer(currentState = new AuthState(), action: AuthAction): AuthState {

    const newState = { ...currentState }

    switch (action.type) {

        case AuthActionType.login:
        case AuthActionType.register:
            newState.token = action.payload;
            localStorage.setItem("token", newState.token);
            const container: { user: UserModel } = jwtDecode(action.payload) // problem why adding row 44 and 45 was the answer! go over it with the tutor
            newState.user = container.user
            break;

        case AuthActionType.logout:
            newState.token = null;
            newState.user = null;
            localStorage.removeItem("token");
            console.log(newState.user)
            break;

    }
    return newState
}


export const authStore = createStore(authReducer)


