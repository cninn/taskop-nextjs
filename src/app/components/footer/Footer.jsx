import styles from "./footer.module.css";
function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.leftfooter}>
      <p>
        This is a task project made by <b>Can İnan</b>.
      </p>
      <span>CRUD operations with fake API.</span>
      </div>
    
    <div className={styles.rightfooter}>
    <span>Developed with NextJs.</span>
    <span> <b>CONTACT ME:</b> cninnworks@gmail.com & 0542 517 05 04</span>
    </div>

    </div>
  );
}

export default Footer;
