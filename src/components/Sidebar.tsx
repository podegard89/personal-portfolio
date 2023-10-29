import { useState } from "react";
import styles from "./Sidebar.module.css";

type Props = {
  items: { name: string; href: string }[];
};

const Sidebar: React.FC<Props> = ({ items }) => {
  const [selected, setSelected] = useState<number>(0);

  const fullItems = [...items, { name: "Get in touch!", href: "#footer" }];

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Page Contents</h2>
      <ul>
        {fullItems.map(({ name, href }, index) => {
          const selectedIsIndex = selected === index;
          return (
            <li
              className={styles["list-item"]}
              onClick={() => setSelected(index)}
              key={index}
            >
              <a
                role="button"
                className={`${styles.link} ${
                  selectedIsIndex ? styles.selected : ""
                }`}
                href={href}
              >
                {name}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
