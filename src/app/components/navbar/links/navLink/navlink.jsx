"use client"
import { usePathname } from 'next/navigation'
import styles from './navlinks.module.css';
import Link from 'next/link'

function NavLink({item}) {

    const pathName = usePathname()

  return (
    <Link className={`${pathName === item.path && styles.active}`} href={item.path} >{item.title}</Link>
  )
}

export default NavLink
