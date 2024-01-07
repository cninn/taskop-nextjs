"use client";

import { useState } from "react";
import styles from "./page.module.css";
import axios from "axios";
import Link from "next/link";

function CreateUserPage() {
  const [user, setUser] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [error,setError] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
      
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://dummyapi.io/data/v1/user/create",
        user,
        {
          headers: {
            "app-id": "65956561f89eecb815fbce77",
          },
        }
      );

      setUserInfo(response.data);
      console.log(response.data);
    } catch (error) {
        console.log(error.response.data.data)
        setError(error.response.data.data);
       
    }
  };

  return (
    <div className={styles.container}>
        {
            !userInfo.firstName &&    <form>
            <div className={styles.inputgroup}>
              <label htmlFor="firstName">first name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="firstname"
                onChange={handleInputChange}
              />
              {error.firstName && <span>Please enter a name</span>}
            </div>
            <div className={styles.inputgroup}>
              <label htmlFor="lastName">last name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="lastName"
                onChange={handleInputChange}
              />
               {error.lastName && <span>Please enter a lastname</span>}
            </div>
            <div className={styles.inputgroup}>
              <label htmlFor="email">email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                onChange={handleInputChange}
                required
              />
               {error && error.email && <span>Email already used</span>}
            </div>
    
            <button className={styles.submit} type="submit" onClick={handleSubmit}>
              Send
            </button>
          </form>
        }

      <div className={styles.user}>
        {userInfo.firstName && (
          <>
            {" "}
            <h1>{`WELCOME ${userInfo.firstName.toUpperCase()}`}</h1>
            <Link href={"/"}>Go to Home</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default CreateUserPage;
