import React, {ChangeEvent, useCallback, useState} from 'react'
import {Button, FormGroup, Input} from 'reactstrap'
import AuthContainer from '../../../components/AuthContainer/AuthContainer'
import ErrorText from '../../../components/ErrorText/ErrorText'
import {auth} from '../../../config/firebase'
import PagePropsType from '../../../interfaces/page'

const ForgotPasswordPage: React.FC<PagePropsType> = () => {
    const [sending, setSending] = useState<boolean>(false)
    const [sent, setSent] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [error, setError] = useState<string>('')

    const resetPasswordRequest = async () => {
        if (error !== '') setError('')

        setSending(true)
        try {
            await auth.sendPasswordResetEmail(email)
            setSent(true)
            setSending(false)

        } catch (error) {
            let errorMessage = "Failed to do something exceptional";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            setError(errorMessage)
            setSending(false)
        }

    }

    const emailChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }, [])
    return (
        <AuthContainer header="Send Password Reset">
            {sent ? (
                <p>A link has been sent to your email with instructions.</p>
            ) : (
                <>
                    <p>Please enter your email.</p>
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
                    <Button
                        disabled={sending}
                        color="success"
                        block
                        onClick={resetPasswordRequest}
                    >
                        Send Reset Link
                    </Button>
                    <ErrorText error={error}/>
                </>
            )}
        </AuthContainer>
    )
}

export default ForgotPasswordPage
