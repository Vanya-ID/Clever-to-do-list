import React from 'react'
import {ErrorTextPropsType} from "./ErrorText.type";


const ErrorText: React.FC<ErrorTextPropsType> = React.memo(({error}) => {

    if (error === '') return null
    error = error.replace(/firebase: /ig, '').split('.', 1).join('')

    return <small className="text-danger">{error}</small>
})

export default ErrorText
