'use client';

import React from 'react';

import styles from './page.module.css';
// import useNewWebSocket from '@/hooks/useNewSockrt';

// import useWebSocket from '@/hooks/useWebSocket';
import Link from 'next/link';
import useLocalStorage from '../hooks/useLocalStorage';
// import useWebSocket from '@/hooks/useWebSocket';

export default function Home() {
  const [ipAddress, setIpAddress] = React.useState('');
  const url =
    ipAddress !== '' ? `ws://${ipAddress}:8181` : 'ws://localhost:8181';

  const { storedValue, setValue, overwriteValue } = useLocalStorage<string>(
    'ipAddress',
    url
  );

  React.useEffect(() => {
    if (ipAddress !== '') {
      setValue(url);
    } else if (ipAddress !== storedValue) {
      overwriteValue(url);
    }
  }, [ipAddress, setValue]);

  React.useEffect(() => {
    fetch('/api/ip')
      .then((response) => response.json())
      .then((data) => {
        const firstInterface = Object.keys(data)[0];
        setIpAddress(data[firstInterface][0]);
      });
  }, []);




  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div>
          <h1>Twój adres IP: {ipAddress}</h1>
          {/* <button onClick={buttonSendMessage}>Wyślij</button> */}
        </div>
      </div>

      {ipAddress !== '' && <Link style={{ color: '#ffffff' }} href="/board">
        Przejdz do tablicy
      </Link>}
    </main>
  );
}
