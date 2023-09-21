import ProfessionalComp from "@component/Components/ProfessionalComponents";
import styles from "../styles/professionals.module.scss";

const AskMechanic = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <ProfessionalComp />
        </div>
      </div>
    </>
  );
};

export default AskMechanic;
