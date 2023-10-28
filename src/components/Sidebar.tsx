import { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";

type Props = {
  items: { name: string; href: string }[];
};

const Sidebar: React.FC<Props> = ({ items }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return windowWidth <= 1400 ? (
    <div className={styles.container}></div>
  ) : (
    <div className={styles.container}>
      <h2 className={styles.heading}>Page Contents</h2>
      <ul>
        {items.map(({ name, href }, index) => (
          <li className={styles["list-item"]} key={index}>
            <a className={styles.link} href={href}>
              {name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
