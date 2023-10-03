import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import type { MarkdownInstance } from "astro";

interface NavbarProps {
  allNavItems: MarkdownInstance<Record<string, any>>[];
}

const Navbar: React.FC<NavbarProps> = ({ allNavItems }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [stickyNav, setStickyNav] = useState<boolean>(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    checkScreenWidth();

    window.addEventListener("resize", checkScreenWidth);

    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  // useEffect(() => {
  //   window.onscroll = () => {
  //     setStickyNav(!(window.scrollY === 0));
  //     return () => (window.onscroll = null);
  //   };
  // }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`${styles["nav-container"]}`}>
      {isMobile ? (
        <div className={styles["mobile-menu"]} onClick={toggleMenu}>
          <button className={styles["menu-button"]}>☰</button>
          {isMenuOpen && (
            <div className={styles["menu-list"]}>
              {allNavItems.map((item) => (
                <div key={item.frontmatter.href}>
                  <div>—————</div>
                  <a
                    key={item.frontmatter.href}
                    href={item.frontmatter.href}
                    className={styles["menu__list__item"]}
                  >
                    {item.frontmatter.title} {item.frontmatter.emoji}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <nav className={styles.nav}>
          <div className={styles["nav__list"]}>
            <div className={`${styles.nav__list__filler} ${styles.start}`}>
              P
            </div>
            <div className={`${styles.nav__list__filler} ${styles.start}`}>
              E
            </div>
            <div className={`${styles.nav__list__filler} ${styles.start}`}>
              A
            </div>
            <div className={`${styles.nav__list__filler} ${styles.start}`}>
              R
            </div>
            <div className={`${styles.nav__list__filler} ${styles.start}`}>
              C
            </div>
            <div className={`${styles.nav__list__filler} ${styles.start}`}>
              E
            </div>
            {allNavItems.map((item) => (
              <div
                className={styles["nav__list__item"]}
                key={item.frontmatter.href}
              >
                <a key={item.frontmatter.href} href={item.frontmatter.href}>
                  {item.frontmatter.title}{" "}
                </a>
              </div>
            ))}
            <div className={styles["nav__list__filler"]}>O</div>
            <div className={styles["nav__list__filler"]}>D</div>
            <div className={styles["nav__list__filler"]}>E</div>
            <div className={styles["nav__list__filler"]}>G</div>
            <div className={styles["nav__list__filler"]}>A</div>
            <div className={styles["nav__list__filler"]}>R</div>
            <div className={styles["nav__list__filler"]}>D</div>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
