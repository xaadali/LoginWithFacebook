import {
  getCompanyAnswer,
  getQuestionDetail,
  getUserAnswers,
  getUserQuestions,
} from "@component/services/CompanySignup";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import styles from "./question.module.scss";
import { useRouter } from "next/router";
const SolvedQuestionsDetail = () => {
  const location: any = useRouter();
  const { user } = useSelector((state: any) => state?.user);
  const { count } = useSelector((state: any) => state?.mechanic);
  const [data, setData] = useState<any>();
  const [less, setLess] = useState<boolean>(true);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentItems, setCurrentItems] = useState<any>([]);

  const [itemOffset, setItemOffset] = useState(0);
  let itemsPerPage = 10;

  const handleMorespecialties = () => {
    setLess(!less);
  };
  const fetchAllQuestionsData = async () => {
    try {
      const res = await getQuestionDetail(
        location?.query?.questionId,
        pageCount,
        count
      );
      setData(res?.data[0]);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchAllQuestionsData();
  }, []);

  useEffect(() => {
    const endOffset = +itemsPerPage * +currentPage + +itemsPerPage;
    const itemOffset = +itemsPerPage * +currentPage;
    setCurrentItems(data?.answers?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data?.answers?.length / itemsPerPage));
  }, [itemsPerPage, data, currentPage]);
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.heading}>
          <span>Question:</span>
          {data?.question}
        </div>
        {currentItems?.map((item, index) => (
          <div className={styles.card} key={index}>
            <div className={styles.innerData}>
              <div className={styles.content}>
                <div className={styles.title}>
                  <span>Answer By:</span>
                  {item?.workshopName ? item?.workshopName : "N/A"}
                </div>
                <div className={styles.leftSide}>
                  <label>
                    {/* {less ? (
                      <>{item?.answer.slice(0, 200)}</>
                    ) : (
                      <>{item?.answer}</>
                    )} */}
                    {item?.answer}
                  </label>
                  {/* {item?.answer?.length > 150 ? (
                    <>
                      <div className={styles.moreless}>
                        <button onClick={handleMorespecialties}>
                          {less ? "Show More" : "Less More"}
                        </button>
                      </div>
                    </>
                  ) : null} */}
                </div>
                {/* <div className={styles.rightSide}>
                  <div className={styles.title}>
                    {item?.workshopName ? item?.workshopName : "N/A"}
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.pagintaionContainer}>
        <ReactPaginate
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< Prev"
          pageClassName={"item pagination-page "}
          breakLabel="..."
          breakClassName={"item break-me "}
          breakLinkClassName="page-link"
          containerClassName={"pagination"}
          disabledClassName={"disabled-page"}
          activeClassName={"item activee "}
          renderOnZeroPageCount={null}
        />
        {/* <ReactPaginate
          activeClassName={"item activee "}
          breakClassName={"item break-me "}
          breakLabel={"..."}
          nextLabel="Next >"
          forcePage={currentPage}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          disabledClassName={"disabled-page"}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< Prev"
          pageClassName={"item pagination-page "}
          pageRangeDisplayed={5}
        /> */}
      </div>
    </div>
  );
};

export default SolvedQuestionsDetail;
