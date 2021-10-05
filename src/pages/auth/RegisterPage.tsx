import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button, FormGroup, Input } from 'reactstrap'
import AuthContainer from '../../components/AuthContainer/AuthContainer'
import ErrorText from '../../components/ErrorText/ErrorText'
import { auth } from '../../config/firebase'
import IPageProps from '../../interfaces/page'

const RegisterPage: React.FC<IPageProps> = () => {
    const [registering, setRegistering] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirm, setConfirm] = useState<string>('')
    const [error, setError] = useState<string>('')

    const history = useHistory()

    const signUpWithEmailAndPassword = () => {
        if (password !== confirm) {
            setError('Please make sure your passwords match.')
            return
        }

        if (error !== '') setError('')

        setRegistering(true)

        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                history.push('/login')
            })
            .catch((error) => {
                error.code = error.code.replace(/firebase: /gi,'').split('.', 1).join('')
                setError(error.code)
                setRegistering(false)
            })
    }

    return (
        <AuthContainer header="Register">
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
            <FormGroup>
                <Input
                    autoComplete="new-password"
                    type="password"
                    name="confirm"
                    id="confirm"
                    placeholder="Confirm Password"
                    onChange={(event) => setConfirm(event.target.value)}
                    value={confirm}
                />
            </FormGroup>
            <Button
                disabled={registering}
                color="success"
                block
                onClick={() => signUpWithEmailAndPassword()}
            >
                Sign Up
            </Button>
            <small>
                <p className="m-1 text-center">
                    Already have an account? <Link to="/login">Login.</Link>
                </p>
            </small>
            <ErrorText error={error} />
        </AuthContainer>
    )
}

export default RegisterPage
