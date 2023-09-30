import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={styles.loader}>
      <svg
        class={styles.svgWrap}
        viewBox="0 0 100 50"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <circle
          stroke-linecap="round"
          stroke-width="2"
          class={styles.svgStroke}
          cy="25"
          cx="50"
          r="15"
        ></circle>
        <circle
          class={[styles.circle, styles.circleOne]}
          cy="25"
          cx="35"
          r="1"
        ></circle>
        <circle
          class={[styles.circle, styles.circleTwo]}
          cy="25"
          cx="45"
          r="1"
        ></circle>
        <circle
          class={[styles.circle, styles.circleThree]}
          cy="25"
          cx="55"
          r="1"
        ></circle>
      </svg>
    </div>
  );
}
