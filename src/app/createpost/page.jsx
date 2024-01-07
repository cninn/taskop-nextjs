"use client"
import { useState } from 'react';
import styles from './page.module.css'
import axios from 'axios';


function PostPage() {

  const [post, setPost] = useState({});
  const [postInfo, setPostInfo] = useState({});
  const [error,setError] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
      owner:"60d0fe4f5311236168a109ce"
    }));
   
  };


  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://dummyapi.io/data/v1/post/create",
        post,
        {
          headers: {
            "app-id": "65956561f89eecb815fbce77",
           
          },
        }
      );

      setPostInfo(response.data);
      window.location.assign(`/post/${response.data.id}`);
    
    } catch (error) {
        console.log(error.response.data)
        setError(error.response);
       
    }
  };

console.log(postInfo);
  return (
    <div className={styles.container}>
      <form action="#">
        <label htmlFor="image">Post Image</label>
        <input placeholder='please enter a image url' type="text" id='image' name='image' required    onChange={handleInputChange}/>
        <label htmlFor="text">Text</label>
        <textarea name="text" id="text"    onChange={handleInputChange}></textarea>
        <label htmlFor="tags">Enter a Tag</label>
        <input placeholder='Enter a tagname' type="text" name='tags' id='tags' required    onChange={handleInputChange}/>
       
        <button onClick={handleSubmit} type='submit'>Send</button>
        {error.data && <span style={{color:"red"}}>Please fill in the required fields</span> }
      </form>
    </div>
  )
}

export default PostPage;
