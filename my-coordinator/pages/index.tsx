import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import QRCode from 'qrcode';
import { useEffect, useState } from 'react';
import { discoveryVp } from '../constants';

const Home: NextPage = () => {
  const [qrCode, setQrCode] = useState("");

  useEffect(() => {
    (async () => {
      const qrCodeSvg = await QRCode.toString(JSON.stringify(discoveryVp), {type: "svg"});
      setQrCode(`data:image/svg+xml,${encodeURIComponent(qrCodeSvg)}`);
    })()
  }, [qrCode])

  return (
    <div className={styles.container}>
      <Head>
        <title>WebID VC issuer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Mock WebID VC issuer
        </h1>

        <p className={styles.description}>
          Get started by scanning the QRCode
          <img src={qrCode}/>
        </p>
      </main>
    </div>
  )
}

export default Home
