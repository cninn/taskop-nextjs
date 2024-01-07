/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import styles from './user.module.css'
import Image from "next/image"


function User({data}) {
  return (
    <div className={styles.user}>



<div className={styles.desc}>
<h4>{`${data.title.toUpperCase()} ${data.firstName} ${data.lastName}`}</h4>
<div className={styles.userleft}>
   <img src={data.picture} alt="..." />
</div>
<Link href={`/user/${data.id}`}>More Details</Link>

</div>
</div>
  )
}

export default User
