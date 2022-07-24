
import styles from './home.module.scss'
import photo from '../assets/photo.png'
import React, {useEffect, useMemo, useState}  from 'react'
import { useAdaptive } from '../hooks'
import ButtonNext from '../components/buttonNext'
import ButtonPrev from '../components/buttonPrev'
import SliderProgressBar from '../components/sliderBar'


const obj = [
  {
    img: photo,
    data: '10.11.2020 г',
    title: 'Ким и Валерия Брейтбурги написали книгу про искусство',
    text: 'Работа над книгой велась более пяти лет, и действенные методики, описанные в ней, созданные в результате анализа и синтеза идей…',
  },
  {
    img: photo,
    data: '10.11.2020 г',
    title: 'Юрий Колокольников пытается спасти Землю в клипе «Космические силы»',
    text: 'Премьера клипа «Космические силы» группы «Мумий Тролль» состоялась 6 ноября 2020 года.',
  },
  {
    img: photo,
    data: '10.11.2020 г',
    title: 'BTS получили четыре награды MTV EMA',
    text: 'BTS получили четыре награды MTV EMA 27-я ежегодная церемония награждения MTV Europe Music Awards состоялась 8 ноября 2020 г.',
  },
  {
    img: photo,
    data: '10.11.2020 г',
    title: 'Открытие сезона «Ла Скала» отменено',
    text: 'Миланский театр La Scala отменил открытие сезона. Первый спектакль был назначен на 7 декабря — «Лючия ди Ламмермур».',
  }, 
  {
    img: photo,
    data: '10.11.2020 г',
    title: 'Ким и Валерия Брейтбурги написали книгу про искусство',
    text: 'Работа над книгой велась более пяти лет, и действенные методики, описанные в ней, созданные в результате анализа и синтеза идей…',
  },
  {
    img: photo,
    data: '10.11.2020 г',
    title: 'Ким и Валерия Брейтбурги написали книгу про искусство',
    text: 'Работа над книгой велась более пяти лет, и действенные методики, описанные в ней, созданные в результате анализа и синтеза идей…',
  },
  {
    img: photo,
    data: '10.11.2020 г',
    title: 'Открытие сезона «Ла Скала» отменено',
    text: 'Миланский театр La Scala отменил открытие сезона. Первый спектакль был назначен на 7 декабря — «Лючия ди Ламмермур».',
  }, 
  {
    img: photo,
    data: '10.11.2020 г',
    title: 'Ким и Валерия Брейтбурги написали книгу про искусство',
    text: 'Работа над книгой велась более пяти лет, и действенные методики, описанные в ней, созданные в результате анализа и синтеза идей…',
  },
  
]

const getPercent = (count, length) => {
  const swipeCount = length - count;
  return 100 / swipeCount;
};

const Home = () => {  
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [length, setLength] = useState(obj.length)
  const [count, sliderRef] = useAdaptive(260); 
  const [width, setWidth] = useState(0)
  const memoizedGetPercent = useMemo(() => getPercent(count, length), [count, length])
  const setPrevSlide = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
      setWidth(width - memoizedGetPercent)
    }
  }
  
  const setNextSlide = () => {
    if (activeIndex < (length - count)) {
      setActiveIndex(activeIndex + 1)
      setWidth(width + memoizedGetPercent);
    }
  }
    useEffect(() => {
      setLength(length)
      const interval = setInterval(() => {
        setWidth(
          activeIndex === length - count ? 0 : width + memoizedGetPercent
          )
          setActiveIndex(() => {
              const res = activeIndex === length - count ? activeIndex === length : activeIndex + 1
              return res
          })
      }, 5000)
  return () => clearInterval(interval)
  
}, [length, activeIndex, count, sliderRef, memoizedGetPercent, width])
  const [touchPosition, setTouchPosition] = useState(null)

  const handleTouchStart = (e) => {
      const touchDown = e.touches[0].clientX
      setTouchPosition(touchDown)
  }
  const handleTouchMove = (e) => {
    const touchDown = touchPosition

    if(touchDown === null) {
        return
    }

    const currentTouch = e.touches[0].clientX
    const diff = touchDown - currentTouch

    if (diff > 5) {
        setNextSlide()
    }

    if (diff < -5) {
        setPrevSlide()
    }

    setTouchPosition(null)
  }

    return <>
    <div className={styles.header}>
      <h1 className={styles.header__title}>
        Актуальное
        </h1>
        <SliderProgressBar value={width} />
        <div className={styles.header__buttons}>
          <ButtonPrev setPrevSlide={setPrevSlide}/>
          <ButtonNext setNextSlide={setNextSlide}/>
        </div>
      </div>
        <ul onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}  ref={sliderRef} className={styles.slider}>
        {
        obj.map((obj) =>
            <li {...obj[setNextSlide]} style={{transform: `translateX(-${activeIndex * 300}px)`}}>
              <img src={obj.img} alt='картинка'/>
              <p>{obj.data}</p>
              <h2>{obj.title}</h2>
              <p>{obj.text}</p>
            </li>)
            }
    </ul>
    </>;
  }
  export default Home;
