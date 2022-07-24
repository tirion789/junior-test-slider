import styles from './buttonNext.module.scss'
import React from 'react';

const ButtonNext = ({setNextSlide}) => {
    return  <button  className={styles.content__button_next} onClick={setNextSlide}>
    </button>
}

export default ButtonNext;