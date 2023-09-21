import Search from "@component/Components/AskMechanicComponents/SearchComponents";
import styles from "../styles/search.module.scss";
import { requireAuthentication } from "@component/Components/__common/HOC";
import { useSelector } from "react-redux";

const SearchBooking = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Search />
        </div>
      </div>
    </>
  );
};

export default SearchBooking;
