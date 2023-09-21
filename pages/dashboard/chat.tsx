import MyChat from "@component/Components/DashboardComp/Chat";
import MyCalendar from "@component/Components/DashboardComp/Dates";
import Sidebar from "@component/Components/__common/sideBar/sidebar";
import styles from "../../styles/dashboard/chat.module.scss";

const Chat = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <MyChat />
      </div>
    </div>
  );
};
Chat.getLayout = (page) => <Sidebar>{page}</Sidebar>;
export default Chat;
