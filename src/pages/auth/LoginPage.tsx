import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button, FormGroup, Input } from 'reactstrap'
import firebase from 'firebase/compat'
import AuthContainer from '../../components/AuthContainer/AuthContainer'
import ErrorText from '../../components/ErrorText/ErrorText'
import { auth } from '../../config/firebase'
import IPageProps from '../../interfaces/page'
import { SignInWithSocialMedia } from './modules'

const LoginPage: React.FC<IPageProps> = (props) => {
    const [authenticating, setAuthenticating] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')

    const history = useHistory()

    const signInWithEmailAndPassword = () => {
        if (error !== '') setError('')

        setAuthenticating(true)

        auth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                history.push('/')
            })
            .catch((error) => {
                setAuthenticating(false)
                setError(error.message)
            })
    }

    return (
        <AuthContainer header="Login">
            <FormGroup>
                <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email Address"
                    onChange={(event) => setEmail(event.target.value)}
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
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                />
            </FormGroup>
            <Button
                disabled={authenticating}
                color="success"
                block
                onClick={() => signInWithEmailAndPassword()}
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
            <ErrorText error={error} />
        </AuthContainer>
    )
}

export default LoginPage
