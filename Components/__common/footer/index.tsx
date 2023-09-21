import Link from "next/link";
import styles from "./footer.module.scss";
import { IoIosSend } from "react-icons/io";

const Footer = () => {
  const linkData = [
    { name: "Ask to the Mechanic", link: "/ask-mechanics" },
    { name: "Are you a professional?", link: "/professionals" },
    { name: "Pricing Plans", link: "/pricing-plans" },
    { name: "About Us", link: "/about-us" },
  ];
  const linkData2 = [
    { name: "Contact Us", link: "/contact-us" },
    { name: "Privacy Policy", link: "" },
    { name: "Terms & Conditions", link: "/terms" },
    { name: "Cancellation Policy", link: "" },
  ];
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.firstWrapper}>
            <Link href="/" prefetch={false} className={styles.loginLogo}>
              <img
                // src={"/icons/logo.svg"}
                src={"/icons/whiteLogo.png"}
                alt="no_logo"
                width="50%"
                style={{ cursor: "pointer" }}
              />
            </Link>
            <p>
              The aim of a car marketplace for mechanics is to provide a
              specialized platform where mechanics can buy and sell cars, parts,
              and accessories specifically for the purpose of repairing and
              reselling vehicles. By offering a dedicated marketplace for
              automotive professionals.
            </p>
          </div>
          <div className={styles.centerContainer}>
            <div className={styles.centerWrapper}>
              <div className={styles.linkWrapper}>
                <label>Important Links</label>
                {linkData.map((item, index) => (
                  <div className={styles.links} key={index}>
                    <a href={item.link}>{item.name}</a>
                  </div>
                ))}
              </div>
              <div className={styles.linkWrapper}>
                <label>Support </label>
                {linkData2.map((item, index) => (
                  <div className={styles.links} key={index}>
                    <a href={item.link}>{item.name}</a>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.rightWrapper}>
              <label>Subscribe </label>
              <div className={styles.mainInputWrap}>
                <div className={styles.inputWrapper}>
                  <input type="text" placeholder="Your Email" />
                  <button>
                    <IoIosSend />
                  </button>
                </div>
              </div>

              <p>
                Depending on the company, a user experience designer may need to
                be a jack of all trades
              </p>
            </div>
          </div>
        </div>
        <div className={styles.bottomWrapper}>© 2023 CAR MARKETPLACE</div>
      </div>
    </>
  );
};

export default Footer;
