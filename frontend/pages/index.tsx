import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Fixture } from './_fixture'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>ISAP | Torneo de Ajedrez</title>
        <meta name="description" content="Fixture actualizada del torneo de ajedrez del Padua." />
        <meta name="og:title" content="ISAP | Torneo de ajedrez"/>
        <meta name="og:description" content="Fixture actualizada del torneo de ajedrez del Padua."/>
        {/* <meta name="og:url" content=""/> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Fixture></Fixture>
      </main>
    </div>
  )
}

export default Home
