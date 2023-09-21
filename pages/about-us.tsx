import Layout from "@component/Components/__common/layout";
import styles from "../styles/about.module.scss";
import Header from "@component/Components/AboutUsComponents/Header/Header";
import TeamCards from "@component/Components/AboutUsComponents/TeamCard";
import ValuesComp from "@component/Components/AboutUsComponents/Values";
import VisionComp from "@component/Components/AboutUsComponents/Vision";
import ReviewsComp from "@component/Components/AboutUsComponents/Reviews";
import { requireAuthentication } from "@component/Components/__common/HOC";

const Team = () => {
  return (
    <>
      <Layout>
        <Header />
      </Layout>
      <TeamCards />
      <div className={styles.container}>
        <ValuesComp />
        <VisionComp />
        <ReviewsComp />
      </div>
    </>
  );
};

export default Team;
