import React from 'react'
import Header from '../Header'
import styles from './Home.module.scss'
import Gallery from '../Gallery'
function Home() {
  return (
      <div className={styles.ParrentHome}>
        <Header/>
        <Gallery/>
        </div>
  )
}

export default Home