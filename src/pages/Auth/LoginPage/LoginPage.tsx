import React, {ChangeEvent, useCallback, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {Button, FormGroup, Input} from 'reactstrap'
import AuthContainer from '../../../components/AuthContainer/AuthContainer'
import ErrorText from '../../../components/ErrorText/ErrorText'
import {auth} from '../../../config/firebase'
import PagePropsType from '../../../interfaces/page'

const LoginPage: React.FC<PagePropsType> = React.memo(() => {
    const [authenticating, setAuthenticating] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')

    const history = useHistory()

    const signInWithEmailAndPassword = useCallback(async () => {
        if (error !== '') setError('')
        setAuthenticating(true)
        try {
            await auth.signInWithEmailAndPassword(email, password)
            history.push('/')
        } catch (error) {
            let errorMessage = "Failed to do something exceptional";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            setAuthenticating(false)
            setError(errorMessage)
        }

    }, [email, password, history, error])

    const emailChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value), [])
    const passwordChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value), [])

    return (
        <AuthContainer header="Login">
            <FormGroup>
                <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email Address"
                    onChange={emailChangeHandler}
                    value={email}
                />
            </FormGroup>
            <FormGroup>
                <Input
                    autoComplete="new-password"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                    onChange={passwordChangeHandler}
                    value={password}
                />
            </FormGroup>
            <Button
                disabled={authenticating}
                color="success"
                block
                onClick={signInWithEmailAndPassword}
            >
                Login
            </Button>
            <small>
                <p className="m-1 text-center">
                    Don't have an account?{' '}
                    <Link to="/register">Register here.</Link>
                </p>
                <p className="m-1 text-center">
                    <Link to="/forget">Forget your password?</Link>
                </p>
            </small>
            <ErrorText error={error}/>
        </AuthContainer>
    )
})

export default LoginPage
