import { useState } from "react";
import styles from "./FormWithLoader.module.css";

export function FormWithLoader() {
  const [isRedirecting, setIsRedirecting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setIsRedirecting(true);
    console.log(`Congratulations! You triggered the ${event.type} event!`);
  }

  return (
    <>
      <form
        className={styles.form}
        action="https://formsubmit.co/0d4471634204989cf17994616d4b9d05"
        method="POST"
        onSubmit={(event) => handleSubmit(event)}
      >
        <h2>Contact me!</h2>
        <input
          className={styles["text-input"]}
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          autoComplete="name"
          required
        />
        <input
          className={styles["text-input"]}
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          autoComplete="email"
        />

        <textarea
          className={styles["text-input"]}
          name="message"
          id="message"
          placeholder="Message"
          rows={10}
          required
          cols={50}
          autoComplete="off"
        ></textarea>

        <input
          type="hidden"
          name="_autoresponse"
          value="Thank you for contacting me! I'll get back to you as soon as possible."
        />
        <input
          type="hidden"
          name="_subject"
          value="Portfolio Contact Submission"
        />
        <input
          type="hidden"
          name="_next"
          value="https://pearceodegard.com/contact/success/"
        />

        <button type="submit" className={styles.submit}>
          Send
        </button>
      </form>

      {isRedirecting && (
        <div className={styles["loading-overlay"]}>
          <div className={styles["loading-message"]}>
            Please wait. You're being redirected...
            <div className={styles["spinner"]}></div>
          </div>
        </div>
      )}
    </>
  );
}
