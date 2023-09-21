import PublicPricingCards from "@component/Components/__common/PublicPricingCards";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.mainContainer}>
          <div className={styles.wrapper}>
            <label>Supercharge your security. Start free.</label>

            <div className={styles.text}>
              <p>Get the security and controls you need.</p>
              <p>No credit card required.</p>
            </div>
          </div>
          <div className={styles.paymentContainer}>
            <PublicPricingCards />
          </div>
        </div>

        <div className={styles.emptyContainer} />
      </div>
    </>
  );
};

export default Header;
