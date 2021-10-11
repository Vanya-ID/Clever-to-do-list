import s from './Preloader.module.scss'
import React from "react";

const Preloader = React.memo(() => {
    return <div className={s.preloader}/>
})

export default Preloader
