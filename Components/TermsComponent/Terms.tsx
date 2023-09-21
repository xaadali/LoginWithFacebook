import React from "react";
import styles from "./terms.module.scss";

const TermsComponent = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1>Terms and Condition</h1>
          <form className={styles.loginForm}>
            <h1>Terms and Condition</h1>
            <div className={styles.card}>
              <p>
                Welcome to our blockchain remittance website. By accessing or
                using this website, you agree to these Terms & Conditions and
                any other law or regulation applicable to this website. If you
                do not agree to these Terms & Conditions, you must not use this
                website.
              </p>
              <p>
                We reserve the right to modify or amend these Terms & Conditions
                from time to time without prior notice. Any changes will be
                effective immediately upon posting. You agree to review these
                Terms & Conditions periodically to be aware of such
                modifications and your continued use of this website shall be
                deemed your conclusive acceptance of the modified Terms &
                Conditions.
              </p>
              <p>
                You are responsible for making all arrangements necessary for
                you to have access to this website and for ensuring that all
                persons who access this website through your internet connection
                are aware of these Terms & Conditions and comply with them.
              </p>
              <p>
                You acknowledge that you are solely responsible for the use of
                this website. We shall not be liable for any direct, indirect,
                incidental, consequential or punitive damages or losses related
                to your use of this website, including but not limited to loss
                of profits, data or other intangible losses.
              </p>
              <p>
                You agree to use this website only for lawful purposes and in a
                manner which does not infringe the rights of, or restrict
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TermsComponent;
