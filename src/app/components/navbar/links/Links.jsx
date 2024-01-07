"use client";
import Link from "next/link";
import styles from "./links.module.css";
import NavLink from "./navLink/navlink";
import { useState } from "react";

const links = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "All Users",
    path: "/user",
  },
  {
    title: "All Posts",
    path: "/post",
  },
  {
    title: "Create Post",
    path: "/createpost",
  },
  {
    title: "SignIn",
    path: "/createuser",
  },
];

function Links() {
  const [open, setOpen] = useState(false);

  const toggleHandler = () => {
    setOpen(!open)
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.links}>
          <span></span>
          {links.map((link) => (
            <NavLink item={link} key={link.title} />
          ))}
        </div>
        <button onClick={toggleHandler}>MENU</button>
        {open && (
          <div className={styles.mobileLinks}>
            {links.map((link) => (
              <NavLink item={link} key={link.title} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Links;
