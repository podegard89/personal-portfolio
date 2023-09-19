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
    <div className={styles.nav}>
      {isMobile ? (
        <div className={styles["mobile-menu"]}>
          <button className={styles["menu-button"]} onClick={toggleMenu}>
            ☰
          </button>
          {isMenuOpen && (
            <div className={styles["menu-list"]}>
              <a href="/" className={styles["nav__list__item"]}>
                Home
              </a>
              {allNavItems.map((item) => (
                <a
                  key={item.frontmatter.href}
                  href={item.frontmatter.href}
                  className={styles["menu-list-item"]}
                >
                  {item.frontmatter.title}
                </a>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className={styles["nav__list"]}>
          <a href="/" className={styles["nav__list__item"]}>
            Home
          </a>
          {allNavItems.map((item) => (
            <a
              key={item.frontmatter.href}
              href={item.frontmatter.href}
              className={styles["nav__list__item"]}
            >
              {item.frontmatter.title}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
