"use client"
import Link from 'next/link';
import styles from './page.module.css';
import User from '../components/user/User';
import axios from 'axios';
import { useEffect, useState } from 'react';

function UserPage() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch('https://dummyapi.io/data/v1/user?limit=20', {
      headers: {
        "app-id": "65956561f89eecb815fbce77"
      }
    })
    .then(res => res.json())
    .then(res => {
      const dataArray = Object.values(res.data);
      setUserData(dataArray);
    })
    .catch(err => console.log(err));
  }, []);

  return (
    <div className={styles.container}>
      <h1>All users</h1>
      <div className={styles.users}>
        {
          userData.map(user => <User key={user.id} data={user} />)
        }
      </div>
    </div>
  );
}

export default UserPage;
