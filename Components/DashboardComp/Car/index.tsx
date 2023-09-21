/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { EmptyCompo } from "@component/Components/__common/Empty";
import { CompLoader } from "@component/Components/__common/loader/Loader";
import Modal from "@component/Components/__common/modal";
import ReactHtmlParser from "react-html-parser";
import AddCar from "./AddCar";
import styles from "./cars.module.scss";
import DeleteCarPopup from "./DeleteCarModal/deleteCarModal";
import useCar from "./useCar";

const CarsComp = () => {
  const {
    openAddCar,
    setOpenAddCar,
    handleOpendeleteModal,
    setpopupvisible,
    popupvisible,
    carList,
    carId,
    handleEdit,
    updateState,
    setUpdatestate,
    handleUpdateClearstates,
    loading,
  } = useCar();
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.carBox}>
            <div className={styles.header}>
              <div className={styles.heading}>
                {" "}
                {openAddCar ? (
                  <>{!updateState ? "Add a Car" : "Update a Car"}</>
                ) : (
                  "My Cars"
                )}
              </div>

              {openAddCar ? (
                <>
                  <div
                    className={styles.addCar}
                    onClick={() => {
                      setOpenAddCar(false);
                      setUpdatestate(false);
                      handleUpdateClearstates();
                    }}
                  >
                    Close
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={styles.addCar}
                    onClick={() => {
                      setOpenAddCar(true);
                      setUpdatestate(false);
                    }}
                  >
                    + Add a Car
                  </div>
                </>
              )}
            </div>
            <div className={styles.cardWrapper}>
              {openAddCar ? (
                <>
                  <AddCar
                    openAddCar={openAddCar}
                    setOpenAddCar={setOpenAddCar}
                    updateState={updateState}
                  />
                </>
              ) : (
                <>
                  {loading ? (
                    <CompLoader />
                  ) : !Boolean(carList?.data?.length) ? (
                    <EmptyCompo />
                  ) : (
                    carList?.data?.map((item: any, index: any) => {
                      return (
                        <>
                          <div className={styles.card} key={index}>
                            <div className={styles.header}>
                              <div className={styles.left}>
                                <div className={styles.name}>
                                  Name: <span>{item?.name}</span>
                                </div>
                                <div className={styles.name}>
                                  Model: <span>{item?.modelNo}</span>
                                </div>
                                <div className={styles.name}>
                                  Year: <span>{item?.year}</span>
                                </div>
                              </div>
                              <div className={styles.actionBox}>
                                {/* <FaPen className={stysles.penIcon} /> */}
                                <img
                                  src="/icons/edit.svg"
                                  className={styles.icon}
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleEdit(item?.carId)}
                                />
                                <img
                                  src="/icons/del.svg"
                                  className={styles.icon}
                                  onClick={() =>
                                    handleOpendeleteModal(item?.carId)
                                  }
                                  style={{ cursor: "pointer" }}
                                />
                              </div>
                            </div>
                            <div className={styles.secRow}>
                              <div className={styles.rentingCompany}>
                                <span> Renting Company Name: </span>
                                <p>
                                  {!item?.rentingcompName
                                    ? "N/A"
                                    : item?.rentingcompName}
                                </p>
                              </div>
                              <div className={styles.rentingCompany}>
                                <span> Car Registration: </span>
                                <p>{item?.registrationNo}</p>
                              </div>
                            </div>
                            <div className={styles.rentingCompany}>
                              <span> Chassis Number: </span>
                              <p>
                                {!item?.chassisNo ? "N/A" : item?.chassisNo}
                              </p>
                            </div>
                            <div className={styles.descriptionWrraper}>
                              <span>Description:</span>
                              <p> {ReactHtmlParser(item?.description)}</p>
                              {/* <p
                                dangerouslySetInnerHTML={{
                                  __html:
                                    item?.description === ""
                                      ? "N/A"
                                      : item?.description,
                                }}
                              >
                              </p> */}
                            </div>
                          </div>
                        </>
                      );
                    })
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal visible={popupvisible} onClose={setpopupvisible}>
        <DeleteCarPopup onClose={setpopupvisible} specficCarId={carId} />
      </Modal>
    </>
  );
};

export default CarsComp;
