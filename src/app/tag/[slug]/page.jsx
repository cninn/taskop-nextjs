/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import Post from "@/app/components/post/Post";
import { useEffect, useState } from "react";
import styles from './page.module.css'



function tagPage({ params }) {
    const tagId = params.slug;
    const [tagPosts,setTagPosts] = useState({});

    useEffect(() => {
       
        fetch(`https://dummyapi.io/data/v1/tag/${tagId}/post?limit=10`, {
          headers: {
            "app-id": "65956561f89eecb815fbce77",
          },
        })
          .then((res) => res.json())
          .then((res) => setTagPosts(res))
          .catch((err) => console.log(err));
      }, [tagId]);
    
   console.log(tagPosts.data);

    
  return (
    <div className={styles.container}>
      <h1>{`Posts related to ${tagId} `}</h1>
        {tagPosts.data && tagPosts.data.map((post)=>(
            <Post key={post.id} data={post}/>
        ))}
    </div>
  )
}

export default tagPage
