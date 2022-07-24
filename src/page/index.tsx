import styles from './home.module.scss';
import React, { useEffect, useMemo, useState } from 'react';
import { useAdaptive } from '../hooks';
import Buttons from '../components/buttons';
import SliderProgressBar from '../components/sliderBar';
import { data } from '../const';

const WIDTH_ELEMETS = 260;
const CARD = 1;
const INITIAL_STATE_ARRAY = 0;
const SCROLL_INTERVAL = 4000;
const MINIMUM_FINGER_MOVEMENT_SPEED = 5;
const WIDTH_BLOCK_OFFSET = 300;

const getPercent = (count: number, length: number) => {
  const swipeCount = length - count;
  return 100 / swipeCount;
};

const Home: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [length, setLength] = useState(data.length);
  const [count, sliderRef] = useAdaptive(WIDTH_ELEMETS);
  const [width, setWidth] = useState(0);
  const memoizedGetPercent = useMemo(() => getPercent(count, length), [count, length]);
  const setPrevSlide = () => {
    if (activeIndex > INITIAL_STATE_ARRAY) {
      setActiveIndex(activeIndex - CARD);
      setWidth(width - memoizedGetPercent);
    }
  };

  const setNextSlide = () => {
    if (activeIndex < length - count) {
      setActiveIndex(activeIndex + CARD);
      setWidth(width + memoizedGetPercent);
    }
  };
  useEffect(() => {
    setLength(length);
    const interval = setInterval(() => {
      setWidth(activeIndex === length - count ? INITIAL_STATE_ARRAY : width + memoizedGetPercent);
      setActiveIndex(() => {
        const res = activeIndex === length - count ? INITIAL_STATE_ARRAY : activeIndex + CARD;
        return res;
      });
    }, SCROLL_INTERVAL);
    return () => clearInterval(interval);
  }, [length, activeIndex, count, sliderRef, memoizedGetPercent, width]);
  const [touchPosition, setTouchPosition] = useState<number | null>(null);

  const handleTouchStart = (event: React.TouchEvent<HTMLUListElement>) => {
    const touchDown = event.touches[0].clientX;
    setTouchPosition(touchDown);
  };
  const handleTouchMove = (event: React.TouchEvent<HTMLUListElement>) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = event.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > MINIMUM_FINGER_MOVEMENT_SPEED) {
      setNextSlide();
    }

    if (diff < -MINIMUM_FINGER_MOVEMENT_SPEED) {
      setPrevSlide();
    }

    setTouchPosition(null);
  };

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.header__title}>Актуальное</h1>
        <SliderProgressBar value={width} />
        <div className={styles.header__buttons}>
          <Buttons setPrevSlide={setPrevSlide} setNextSlide={setNextSlide} />
        </div>
      </div>
      <ul
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        ref={sliderRef}
        className={styles.slider}
      >
        {data.map((obj) => (
          <li style={{ transform: `translateX(-${activeIndex * WIDTH_BLOCK_OFFSET}px)` }}>
            <img src={obj.img} alt="картинка" />
            <p>{obj.data}</p>
            <h2>{obj.title}</h2>
            <p>{obj.text}</p>
          </li>
        ))}
      </ul>
    </>
  );
};
export default Home;
