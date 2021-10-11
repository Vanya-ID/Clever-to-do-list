import React, {ChangeEvent, useCallback, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {Button, FormGroup, Input} from 'reactstrap'
import AuthContainer from '../../../components/AuthContainer/AuthContainer'
import ErrorText from '../../../components/ErrorText/ErrorText'
import {auth} from '../../../config/firebase'
import PagePropsType from '../../../interfaces/page'

const RegisterPage: React.FC<PagePropsType> = React.memo(() => {
    const [registering, setRegistering] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirm, setConfirm] = useState<string>('')
    const [error, setError] = useState<string>('')

    const history = useHistory()

    const signUpWithEmailAndPassword = useCallback(async () => {
        if (password !== confirm) {
            setError('Please make sure your passwords match.')
            return
        }

        if (error !== '') setError('')

        setRegistering(true)
        try {
            await auth.createUserWithEmailAndPassword(email, password)
            history.push('/')
        } catch (error) {
            let errorMessage = "Failed to do something exceptional";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            setError(errorMessage)
            setRegistering(false)
        }

    }, [confirm, email, error, history, password])

    const emailChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value), [])
    const passwordChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value), [])
    const confirmChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => setConfirm(event.target.value), [])

    return (
        <AuthContainer header="Register">
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
            <FormGroup>
                <Input
                    autoComplete="new-password"
                    type="password"
                    name="confirm"
                    id="confirm"
                    placeholder="Confirm Password"
                    onChange={confirmChangeHandler}
                    value={confirm}
                />
            </FormGroup>
            <Button
                disabled={registering}
                color="success"
                block
                onClick={signUpWithEmailAndPassword}
            >
                Sign Up
            </Button>
            <small>
                <p className="m-1 text-center">
                    Already have an account? <Link to="/login">Login.</Link>
                </p>
            </small>
            <ErrorText error={error}/>
        </AuthContainer>
    )
})

export default RegisterPage
