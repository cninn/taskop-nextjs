/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import styles from "./navbar.module.css";

import Links from "./links/Links";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [postData, setPostData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await axios.get(
        `https://dummyapi.io/data/v1/post?limit=10`,
        {
          headers: {
            "app-id": "65956561f89eecb815fbce77",
          },
        }
      );
      setPostData(Object.values(data.data));
    };
    fetchPost();
  }, []);



  const handleSearchItem = (e) => {
    setSearchTerm(e.target.value);
  
    const searchFilter = postData.filter((post) => {
      const postText = post.text.toLowerCase();
      const ownerFirstName = post.owner.firstName.toLowerCase();
  
      return postText.includes(e.target.value.toLowerCase()) || ownerFirstName.includes(e.target.value.toLowerCase());
    });
  
    setFiltered(searchFilter);
  };

  const handleSearch = () => {
    setShowSearch(!showSearch);
    setSearchTerm("");
    setFiltered([]);
  };

  console.log(filtered)
  return (
    <nav className={styles.navbar}>
      <div className={styles.search}>
        <button onClick={handleSearch}>
          {!showSearch ? "Search" : "Close"}
        </button>
      </div>
      {showSearch && (
        <div className={styles.modalsrc}>
          <input
            type="search"
            placeholder="search..."
            id="search"
            onChange={handleSearchItem}
          />
          <ul>
            {searchTerm !== "" && filtered.length === 0 ? (
              <p>Sorry, there is no such thing</p>
            ) : (
              filtered.map((f) => (
                <li key={f.id}>
                  <Link href={`/post/${f.id}`}>
                  <div className={styles.postText}>
                  <img src={f.image} alt="..." />
                  <span>{f.text}</span>
                  </div>
                  </Link>
                  <Link href={`/user/${f.owner.id}`}>
                  <div
                  className={styles.postUser}>
                    <img className={styles.userimg} src={f.owner.picture} alt="..." />
                    <span>{`${f.owner.title} ${f.owner.firstName} ${f.owner.lastName}`}</span>
                  </div>
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      )}

      <Link href={"/"}>
        <Image
          className={styles.icon}
          src="/icon.png"
          alt="..."
          width={50}
          height={50}
        />
      </Link>
      <div className="link-components">
        <Links />
      </div>
    </nav>
  );
}

export default Navbar;
