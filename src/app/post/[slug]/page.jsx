/* eslint-disable @next/next/no-img-element */
"use client";
import Post from '@/app/components/post/Post';
import styles from './page.module.css'

import { useEffect, useState } from "react";
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';


function SinglePostPage({ params }) {
  const postId = params.slug;

  const [postData, setPostData] = useState([]);
  const [userData,setUserData] = useState({})

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await fetch(`https://dummyapi.io/data/v1/post/${postId}`, {
          headers: {
            "app-id": "65956561f89eecb815fbce77",
          },
        });
  
        const postData = await response.json();
        setPostData(postData);
  
        const owner = Object.values(postData.owner);
        setUserData(owner);
      } catch (err) {
        console.log(err);
      }
    };
  
    getPost();
  }, [postId]);
  



  const [formattedDate, setFormattedDate] = useState(null);

  useEffect(() => {
    const apiDate = postData.publishDate;
    const dateObj = new Date(apiDate);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setFormattedDate(formattedDate);
  }, [postData.publishDate]);

  
const router = useRouter();

  const handleDelete = async () => {
    try {
     
      const response = await axios.delete(`https://dummyapi.io/data/v1/post/${postId}`,{
        headers:{
          "app-id": "65956561f89eecb815fbce77",
        }
      });
  
      
      if (response.status === 200) {
        alert('Başarıyla silindi.');
        router.push('/post');
      } else {
        console.log('Silme işlemi başarısız oldu.');
      }
    } catch (error) {
      // Hata durumu kontrolü
      console.error('Silme işlemi sırasında bir hata oluştu:', error);
    }
  };

   //TODO : POST UPDATE.
   const [showEditModal, setShowEditModal] = useState(false);
   const [editForm,setEditForm]=useState({
    image:"",
    text:"",
    tags:[]
   });

   useEffect(()=>{
    setEditForm({
      image:postData.image,
    text:postData.text,
    tags:postData.tags
    })
   },[postData]);

   function handleChange(event) {
    const { name, value } = event.target;
  
    setEditForm({
      ...editForm,

        [name]: value, 
      
    });
  }
  const handleSubmit = async (e) => {
 
    e.preventDefault();
  try {
    const response = await axios.put(`https://dummyapi.io/data/v1/post/${postId}`, editForm, {
      headers: {
        "app-id": "65956561f89eecb815fbce77",
      },
    });
    window.location.assign(`/post/${postId}`);
  } catch (error) {
    console.log(error)
  }

  };


   const editModalHandler = () => {
    setShowEditModal(!showEditModal);
  };
  const closeModalHandler = () => {
    setShowEditModal(!showEditModal);
  };
  
  
  return <div className={styles.container}>
       
  
              <div  className={styles.userpanel}>
                <div className={styles.person}>
                { userData &&  <img src={userData[4]} alt="..." />}
                  <h3>{`${userData[2]} ${userData[3]}`}</h3>
                </div>
                <div className={styles.infos}>
                  <span>{`Created Date : ${formattedDate}`}</span>
                </div>
              </div>
              <div className={styles.post}>
      <div className={styles.top}>
       <img src={postData.image} alt="..." />
        <h3>{postData.text}</h3>
      </div>
      <div className={styles.bottom}>
        <span>likes: {postData.likes}</span>
        <span>Created Date: {formattedDate}</span>
      
      </div>
      <div className={styles.tags}>
        Tags:
      {
          postData.tags && postData.tags.map((tag)=>(
            <Link className={styles.tag} key={tag} href={`/tag/${tag}`}>{tag}</Link>
          ) )
        }
      </div>
      <div className={styles.btns}>
          <button onClick={editModalHandler}>EDİT</button>
          <button onClick={handleDelete}>DELETE</button>
          </div>
    </div>
         
           
           
    {showEditModal && (
        <div className={styles.editmodal}>
          <button className={styles.close} onClick={closeModalHandler}>
            close
          </button>
          <form>
            <div className={styles.inputgroup}>
              <label>Post Image</label>
              <input
                type="text"
                name="image"
                value={editForm.image}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputgroup}>
              <label>Text</label>
              <textarea
                type="text"
                name="text"
                value={editForm.text}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className={styles.inputgroup}>
              <label>Tags</label>
              <input
                type="text"
                name="tags"
                value={editForm.tags}
                onChange={handleChange}
              />
            </div>

            <button onClick={handleSubmit}>SEND</button>
          </form>
        </div>
      )}      

  </div>;
}

export default SinglePostPage;
