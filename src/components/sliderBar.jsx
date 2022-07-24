import styles from './sliderBar.module.scss'
import React from 'react'

const SliderProgressBar = ({value}) => {
    return   <div className={styles.progressBar}>
    <div>
      <span className={styles.progressBar__unfill}>
        <span className={styles.progressBar__fill} style={{width: `${value}%`}}></span>
      </span>
    </div>
  </div>
}

export default SliderProgressBar