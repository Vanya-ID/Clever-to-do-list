import React, { useState } from 'react'
import { Button, FormGroup, Input } from 'reactstrap'
import AuthContainer from '../../components/AuthContainer/AuthContainer'
import ErrorText from '../../components/ErrorText/ErrorText'
import { auth } from '../../config/firebase'
import IPageProps from '../../interfaces/page'

const ForgotPasswordPage: React.FC<IPageProps> = (props) => {
    const [sending, setSending] = useState<boolean>(false)
    const [sent, setSent] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [error, setError] = useState<string>('')

    const resetPasswordRequest = () => {
        if (error !== '') setError('')

        setSending(true)

        auth.sendPasswordResetEmail(email)
            .then(() => {
                setSent(true)
                setSending(false)
            })
            .catch((error) => {
                setError(error.message)
                setSending(false)
            })
    }

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
                            onChange={(event) => setEmail(event.target.value)}
                            value={email}
                        />
                    </FormGroup>
                    <Button
                        disabled={sending}
                        color="success"
                        block
                        onClick={() => resetPasswordRequest()}
                    >
                        Send Reset Link
                    </Button>
                    <ErrorText error={error} />
                </>
            )}
        </AuthContainer>
    )
}

export default ForgotPasswordPage
