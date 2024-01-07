"use client"
import { useEffect, useState } from 'react';
import Post from '../components/post/Post'
import styles from './page.module.css'

function PostPage() {

  const [postData,setPostData] = useState([]);


  useEffect(() => {
    fetch('https://dummyapi.io/data/v1/post?limit=20', {
      headers: {
        "app-id": "65956561f89eecb815fbce77"
      }
    })
    .then(res => res.json())
    .then(res => {
      const dataArray = Object.values(res.data);
      dataArray.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
      setPostData(dataArray);
    })
    .catch(err => console.log(err));
  }, []);
 


  return (
    <div className={styles.container}>
      <h1 style={{marginBottom:"1rem"}}>All posts</h1>
      <div className={styles.posts}>

        {postData.map((post)=><Post key={post.id} data={post}/>)}
        
      
      </div>
     
    </div>
  )
}

export default PostPage
