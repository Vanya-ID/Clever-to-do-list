import React from 'react'
import {Redirect} from 'react-router-dom'
import {auth} from '../../config/firebase'


const AuthRoute: React.FC = React.memo(({children}) => {

    if (!auth.currentUser) {
        return <Redirect to="/login"/>
    }

    return <div>{children}</div>
})

export default AuthRoute
