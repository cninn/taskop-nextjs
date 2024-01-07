/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './post.module.css';
import Link from 'next/link';

function Post({ data }) {
  const [formattedDate, setFormattedDate] = useState(null);

  useEffect(() => {
    const apiDate = data.publishDate;
    const dateObj = new Date(apiDate);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setFormattedDate(formattedDate);
  }, [data.publishDate]);

  return (
    <div className={styles.post}>
      <div className={styles.top}>
       <img src={data.image} alt="..." />
        <h3>{data.text}</h3>
      </div>
      <div className={styles.bottom}>
        <span>likes: {data.likes}</span>
        <span>Created Date: {formattedDate}</span>
      
      </div>
      <div className={styles.tags}>
      Tags:
{
  data && data.tags && Array.isArray(data.tags) && data.tags.map((tag) => (
    <Link className={styles.tag} key={tag} href={`/tag/${tag}`}>
      {tag}
    </Link>
  ))
}
      </div>
      <Link href={`/post/${data.id}`}>More Details</Link>
    </div>
  );
}

export default Post;
