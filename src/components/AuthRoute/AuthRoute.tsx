import React from 'react'
import { Redirect } from 'react-router-dom'
import { auth } from '../../config/firebase'

export interface IAuthRouteProps {}

const AuthRoute: React.FC<IAuthRouteProps> = (props) => {
    const { children } = props

    if (!auth.currentUser) {
        return <Redirect to="/login" />
    }

    return <div>{children}</div>
}

export default AuthRoute
