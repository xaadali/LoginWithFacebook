import MechanicDetailsComp from "@component/Components/AskMechanicComponents/SearchComponents/mechanicDetailsComp";
import styles from "../styles/mechanicdetail.module.scss";
import { requireAuthentication } from "@component/Components/__common/HOC";

const SearchBooking = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <MechanicDetailsComp />
        </div>
      </div>
    </>
  );
};

export default SearchBooking;
