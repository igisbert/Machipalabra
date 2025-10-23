import styles from "./Letters.module.css";
import { alphabet } from "@/utils/constants";

export default function Letters() {
  return (
    <div className={styles.circle}>
      {alphabet.map((letter) => (
        <div key={letter} className={styles.letter}>
          {letter}
        </div>
      ))}
    </div>
  );
}
