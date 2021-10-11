import React, {useCallback} from 'react'
import {useHistory} from 'react-router-dom'
import {Button} from 'reactstrap'
import AuthContainer from '../../../components/AuthContainer/AuthContainer'
import {auth} from '../../../config/firebase'
import PagePropsType from '../../../interfaces/page'

const LogoutPage: React.FC<PagePropsType> = React.memo(() => {
    const history = useHistory()

    const Logout = useCallback(async () => {

        await auth.signOut()
        history.push('/login')
    }, [history])

    const historyGoBack = useCallback(() => {
        history.goBack()
    }, [history])

    return (
        <AuthContainer header="Logout">
            <p className="text-center">Are you sure you want to logout?</p>
            <div className="text-center">
                <Button
                    color="danger"
                    className="mr-2"
                    onClick={historyGoBack}
                >
                    Cancel
                </Button>
                <Button color="info" className="mr-2" onClick={Logout}>
                    Logout
                </Button>
            </div>
        </AuthContainer>
    )
})

export default LogoutPage
