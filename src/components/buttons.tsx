import styles from './buttons.module.scss';
import React from 'react';

type ButtonsProps = {
  setNextSlide: () => void;
  setPrevSlide: () => void;
};

const ButtonPrev: React.FC<ButtonsProps> = ({ setPrevSlide, setNextSlide }) => {
  return (
    <>
      <button className={styles.content__button_prev} onClick={setPrevSlide}></button>
      <button className={styles.content__button_next} onClick={setNextSlide}></button>
    </>
  );
};

export default ButtonPrev;
