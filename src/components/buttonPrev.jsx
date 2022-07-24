import styles from './buttonPrev.module.scss'
import React from 'react'

const ButtonPrev = ({setPrevSlide}) => {
    return <button className={styles.content__button_prev} onClick={setPrevSlide}>
    </button>

}

export default ButtonPrev