import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroText}>
        <h1>DUMMYAPI.io</h1>
        <h2>BASIC CRUD OPERATIONS</h2>
        <span>
          You can visit github to see the sources of this project.
          <a href="https://github.com/cninn">Go to my Github</a>
        </span>
      </div>
      <div className={styles.imgContainer}>
        <Image src="/pattern.jpg" alt=".." width={500} height={300} />
      </div>
    </div>
  );
}
