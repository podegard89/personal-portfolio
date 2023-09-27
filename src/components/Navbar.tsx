import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import type { MarkdownInstance } from "astro";

interface NavbarProps {
  allNavItems: MarkdownInstance<Record<string, any>>[];
}

const Navbar: React.FC<NavbarProps> = ({ allNavItems }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles["nav-container"]}>
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
            <div className={styles["nav__list__filler"]}></div>
            <div className={styles["nav__list__filler"]}></div>
            <div className={styles["nav__list__filler"]}></div>
            <div className={styles["nav__list__filler"]}></div>
            <div className={styles["nav__list__filler"]}></div>
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
            <div className={styles["nav__list__filler"]}></div>
            <div className={styles["nav__list__filler"]}></div>
            <div className={styles["nav__list__filler"]}></div>
            <div className={styles["nav__list__filler"]}></div>
            <div className={styles["nav__list__filler"]}></div>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
