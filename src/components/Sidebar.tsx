import { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";

type Props = {
  items: { name: string; href: string }[];
};

const Sidebar: React.FC<Props> = ({ items }) => {
  const [selected, setSelected] = useState<number>(0);
  const [isComponentMounted, setComponentMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setComponentMounted(true);
    }, 300);
  }, []);

  const fullItems = [...items, { name: "Get in touch!", href: "#footer" }];

  useEffect(() => {
    const sections = fullItems.map(
      ({ href }) => document.querySelector(href) as Element
    );

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px",
      threshold: 0.9, // % of element that needs to be visible to trigger callback
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setSelected(sections.indexOf(entry.target));
        }
      });
    }, options);

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // useEffect(() => {
  //   console.log(selected);
  // }, [selected]);

  return !isComponentMounted ? (
    <h2>Loading...</h2>
  ) : (
    <>
      <h2 className={styles.heading}>Page Contents</h2>
      <div className={styles["page-contents-container"]}>
        {fullItems.map(({ name, href }, index) => {
          const selectedIsIndex = selected === index;
          return (
            <a
              role="button"
              className={`${styles.link} ${styles["list-item"]} ${
                selectedIsIndex ? styles.selected : ""
              }`}
              href={href}
              key={index}
            >
              {name}
            </a>
          );
        })}
      </div>
    </>
  );
};

export default Sidebar;
