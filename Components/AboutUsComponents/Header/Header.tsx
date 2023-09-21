import styles from "./Header.module.scss";


const Header = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.headingWrapper}>
            <div className={styles.heading}>
              About Us
            </div>
          </div>
          <div className={styles.textWrapper}>
            <div className={styles.para}>
              We have established our own UX/UI company because we believe that there is always a better way to do things. We are truly passionate about experiences, user interfaces and developing the best possible digital products. In a very short time we have grouped highly talented people to help us on our journey - design the world we would like to live in.
            </div>
            <div className={styles.label}>Martin & Robert — Co-founders</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
