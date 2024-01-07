/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Post from "@/app/components/post/Post";
import axios from "axios";



function SingleUserPage({ params }) {

  const router = useRouter();
  const userId = params.slug;
  const [userData, setUserData] = useState({});
  const [userPosts, setUserPosts] = useState([]);

  //!get single user
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(
        `https://dummyapi.io/data/v1/user/${userId}`,
        {
          headers: {
            "app-id": "65956561f89eecb815fbce77",
          },
        }
      );
      setUserData(data);
    };
    fetchUser();
  }, [userId]);

  //! get user post data
  useEffect(() => {
    const fetchUserPost = async () => {
      const { data } = await axios.get(
        `https://dummyapi.io/data/v1/user/${userId}/post?limit=10`,
        {
          headers: {
            "app-id": "65956561f89eecb815fbce77",
          },
        }
      );
      setUserPosts(data);
    };
    fetchUserPost();
  }, [userId]);

  //!delete user
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://dummyapi.io/data/v1/user/${userId}`,
        {
          headers: {
            "app-id": "65956561f89eecb815fbce77",
          },
        }
      );

      if (response.status === 200) {
        alert("Başarıyla silindi.");
        router.push("/user");
      } else {
        console.log("Silme işlemi başarısız oldu.");
      }
    } catch (error) {
      console.error("Silme işlemi sırasında bir hata oluştu:", error);
    }
  };
  //!date format change
  const apiDate = userData.dateOfBirth;
  const dateObj = new Date(apiDate);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  
  const goBack = () => {
    router.push("/user");
  };


  //TODO : USER UPDATE.
  const [showEditModal, setShowEditModal] = useState(false);

  const editModalHandler = () => {
    setShowEditModal(!showEditModal);
  };
  const closeModalHandler = () => {
    setShowEditModal(!showEditModal);
  };

  const [editForm, setEditForm] = useState({
    title: "",
    firstName: "",
    lastName: "",
    phone: "",
    picture: "",
    location: {
      city: "",
      country: "",
      state: "",
    },
  });
  //!todo : Sanırım api de bir hata mevcut güncelleme işlemi sırasında email datası değişmiyor. postmandan da denedim fakat email değişmiyor.
  
  
  useEffect(() => {
    const locationData = userData.location || {}; // undefined ise boş obje ata
  
    setEditForm({
      title: userData.title,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      picture: userData.picture,
      location: {
        city: locationData.city || "", // undefined ise boş string ata
        country: locationData.country || "",
        state: locationData.state || "",
      },
    });
  }, [userData]);

  function handleChange(event) {
    const { name, value } = event.target;
  
    setEditForm({
      ...editForm,
      location: {
        ...editForm.location,
        [name]: value, 
      },
    });
  }



  const handleSubmit = async (e) => {
 
    e.preventDefault();
  try {
    const response = await axios.put(`https://dummyapi.io/data/v1/user/${userId}`, editForm, {
      headers: {
        "app-id": "65956561f89eecb815fbce77",
      },
    });
    window.location.assign(`/user/${userId}`);
  } catch (error) {
    console.log(error)
  }

  };

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <div className={styles.generalinfo}>
          <h2>{`${userData.title} ${userData.firstName} ${userData.lastName}`}</h2>
          <button className={styles.backLink} onClick={goBack}>Back to Users</button>
          <img src={userData.picture} alt="..." />
          <p>Email: {userData.email}</p>
          <p>Gender: {userData.gender}</p>
          <p>Phone: {userData.phone}</p>
          <p>Birth Day: {formattedDate}</p>
        </div>
        <div className={styles.location}>
          <h3>Location</h3>

          {userData.location && (
            <>
              <p>City: {userData.location.city}</p>
              <p>Country: {userData.location.country}</p>
              <p>State: {userData.location.state}</p>
              
            </>
          )}
          <div className={styles.btns}>
            <button onClick={editModalHandler}>EDİT</button>
            <button onClick={handleDelete}>DELETE</button>
          </div>
        </div>
      </div>
      

      {userPosts && userPosts.data && (
        <div className={styles.userPosts}>
          <h2>{`${userData.firstName} ${userData.lastName} 's Posts`}</h2>
          {userPosts.data.map((post) => (
            <Post key={post.id} data={post} />
          ))}
        </div>
      )}
      {showEditModal && (
        <div className={styles.editmodal}>
          <button className={styles.close} onClick={closeModalHandler}>
            close
          </button>
          <form>
            <div className={styles.inputgroup}>
              <label>Profile Image</label>
              <input
                type="text"
                name="picture"
                value={editForm.picture}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputgroup}>
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={editForm.title}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputgroup}>
              <label>FirstName</label>
              <input
                type="text"
                name="firstName"
                value={editForm.firstName}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputgroup}>
              <label>LastName</label>
              <input
                type="text"
                name="lastName"
                value={editForm.lastName}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputgroup}>
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={editForm.phone}
                onChange={handleChange}
              />
            </div>

            
                 <div className={styles.inputgroup}>
              <label>City</label>
              <input
                
                type="text"
                name="city"
                value={editForm.location.city}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputgroup}>
              <label>Country</label>
              <input
                
                type="text"
                name="country"
                value={editForm.location.country}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputgroup}>
              <label>State</label>
              <input
                
                type="text"
                name="state"
                value={editForm.location.state}
                onChange={handleChange}
              />
            </div> 
            <button onClick={handleSubmit}>SEND</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default SingleUserPage;
