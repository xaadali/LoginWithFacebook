/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-key */
import React from "react";
import styles from "./CalculatePaymentCards.module.scss";
import { AiOutlineCheck } from "react-icons/ai";
import { BiChevronRight } from "react-icons/bi";
import { PlanTypeEnum } from "@component/utills/enum";
import { Bars } from "react-loader-spinner";

interface Prop {
  setActivePaymentMethod?: (prop: any) => void;
  handleActivePayment?: any;
  plansDetails?: any;
  loading?: boolean;
  planLoading?: boolean;
  planLoadingIndex?: number;
}

const CalculatePaymentCards = (prop: Prop) => {
  const { handleActivePayment, plansDetails, planLoading, planLoadingIndex } = prop;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.cardWrapper}>
            {plansDetails?.map((item, index) => {
              if (item?.title === PlanTypeEnum.EnterprisePlan) {
                return (
                  <div className={styles.card} id={styles.differentCard}>
                    <div className={styles.popular}>
                      <p>Most Popular</p>
                    </div>
                    <div className={styles.header}>
                      <div className={styles.title}>{item?.title}</div>
                      <div className={styles.headingWrapper}>
                        <div className={styles.left}>
                          <div className={styles.heading}>{item?.price}</div>
                          <div className={styles.user}>
                            per user
                            <br />
                            per month
                          </div>
                        </div>
                        <div className={styles.right}>Yearly -15%</div>
                      </div>
                      <div className={styles.subTitle}>
                        Enterprise Plan will include the following things:
                      </div>
                    </div>
                    <div className={styles.details}>
                      <div className={styles.textWrapper}>
                        <div className={styles.imgWrapper}>
                          <AiOutlineCheck />
                        </div>
                        {item?.enterprisePlanBenefits?.profileEditor}
                      </div>
                      <div className={styles.textWrapper}>
                        <div className={styles.imgWrapper}>
                          <AiOutlineCheck />
                        </div>
                        {item?.enterprisePlanBenefits?.uploadphotos}

                      </div>
                      <div className={styles.textWrapper}>
                        <div className={styles.imgWrapper}>
                          <AiOutlineCheck />
                        </div>
                        {item?.enterprisePlanBenefits?.workSpecialties}
                      </div>
                      <div className={styles.textWrapper}>
                        <div className={styles.imgWrapper}>
                          <AiOutlineCheck />
                        </div>
                        {item?.enterprisePlanBenefits?.description}

                      </div>
                      <div className={styles.textWrapper}>
                        <div className={styles.imgWrapper}>
                          <AiOutlineCheck />
                        </div>
                        {item?.enterprisePlanBenefits?.ratings}

                      </div>
                      <div className={styles.textWrapper}>
                        <div className={styles.imgWrapper}>
                          <AiOutlineCheck />
                        </div>
                        {item?.enterprisePlanBenefits?.phoneNo}

                      </div>
                      <div className={styles.textWrapper}>
                        <div className={styles.imgWrapper}>
                          <AiOutlineCheck />
                        </div>
                        {item?.enterprisePlanBenefits?.workshopAddress}

                      </div>
                      <div className={styles.textWrapper}>
                        <div className={styles.imgWrapper}>
                          <AiOutlineCheck />
                        </div>
                        {item?.enterprisePlanBenefits?.bookingSystem}

                      </div>
                      <div className={styles.textWrapper}>
                        <div className={styles.imgWrapper}>
                          <AiOutlineCheck />
                        </div>
                        {item?.enterprisePlanBenefits?.supportChat}

                      </div>
                      <div className={styles.textWrapper}>
                        <div className={styles.imgWrapper}>
                          <AiOutlineCheck />
                        </div>
                        {item?.enterprisePlanBenefits?.clientChat}

                      </div>
                      <div className={styles.textWrapper}>
                        <div className={styles.imgWrapper}>
                          <AiOutlineCheck />
                        </div>
                        {item?.enterprisePlanBenefits?.supportChat}

                      </div>
                      <div className={styles.textWrapper}>
                        <div className={styles.imgWrapper}>
                          <AiOutlineCheck />
                        </div>
                        {item?.enterprisePlanBenefits?.exportData}

                      </div>
                      <div className={styles.textWrapper}>
                        <div className={styles.imgWrapper}>
                          <AiOutlineCheck />
                        </div>
                        {item?.enterprisePlanBenefits?.videos}
                      </div>
                      <div className={styles.textWrapper}>
                        <div className={styles.imgWrapper}>
                          <AiOutlineCheck />
                        </div>
                        {item?.enterprisePlanBenefits?.uploadphotos}
                      </div>
                      <div className={styles.textWrapper}>
                        <div className={styles.imgWrapper}>
                          <AiOutlineCheck />
                        </div>
                        {item?.enterprisePlanBenefits?.certificates}
                      </div>
                      <div className={styles.textWrapper}>
                        <div className={styles.imgWrapper}>
                          <AiOutlineCheck />
                        </div>
                        {item?.enterprisePlanBenefits?.downgradePlans}

                      </div>
                      <div className={styles.textWrapper}>
                        <div className={styles.imgWrapper}>
                          <AiOutlineCheck />
                        </div>
                        {item?.enterprisePlanBenefits?.deleteAccount}

                      </div>
                    </div>
                    <div className={styles.btnWrapper}>
                      <div className={styles.btn}
                        onClick={() => handleActivePayment(item, index)}
                      >
                        {planLoadingIndex === index && planLoading ?
                          <Bars
                            height="30"
                            width="100"
                            color="white"
                            ariaLabel="bars-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                          /> :
                          <>
                            Get Started &nbsp;
                            <BiChevronRight className={styles.icon} />
                          </>
                        }
                      </div>
                    </div>
                  </div>
                )
              } else if (item?.title === PlanTypeEnum.ProfessionalPlan) {
                return (
                  <div className={styles.card}>
                    <div className={styles.header}>
                      <div className={styles.title}>{item?.title}</div>
                      <div className={styles.headingWrapper}>
                        <div className={styles.left}>
                          <div className={styles.heading}>{item?.price}</div>
                          <div className={styles.user}>
                            per user
                            <br />
                            per month
                          </div>
                        </div>
                        <div className={styles.right}>Yearly -15%</div>
                      </div>
                      <div className={styles.subTitle}>
                        Professional plan will provide following benefits to the
                        Registered Company Users
                      </div>
                    </div>
                    <div className={styles.details}>
                      <div className={styles.textWrapper}>
                        <div className={styles.imgWrapper}>
                          <AiOutlineCheck />
                        </div>
                        {item?.professionalPlanBenefits?.profileEditor}
                      </div>
                      <div className={styles.textWrapper}>
                        <div className={styles.imgWrapper}>
                          <AiOutlineCheck />
                        </div>
                        {item?.professionalPlanBenefits?.uploadphotos}
                      </div>
                      <div className={styles.textWrapper}>
                        <div className={styles.imgWrapper}>
                          <AiOutlineCheck />
                        </div>
                        {item?.professionalPlanBenefits?.workSpecialties}
                      </div>
                      <div className={styles.textWrapper}>
                        <div className={styles.imgWrapper}>
                          <AiOutlineCheck />
                        </div>
                        {item?.professionalPlanBenefits?.videos}
                      </div>
                      <div className={styles.textWrapper}>
                        <div className={styles.imgWrapper}>
                          <AiOutlineCheck />
                        </div>
                        {item?.professionalPlanBenefits?.uploadphotos}
                      </div>
                      <div className={styles.textWrapper}>
                        <div className={styles.imgWrapper}>
                          <AiOutlineCheck />
                        </div>
                        {item?.professionalPlanBenefits?.certificates}
                      </div>
                      <div className={styles.textWrapper}>
                        <div className={styles.imgWrapper}>
                          <AiOutlineCheck />
                        </div>
                        {item?.professionalPlanBenefits?.description}
                      </div>
                      <div className={styles.textWrapper}>
                        <div className={styles.imgWrapper}>
                          <AiOutlineCheck />
                        </div>
                        {item?.professionalPlanBenefits?.ratings}
                      </div>
                      <div className={styles.textWrapper}>
                        <div className={styles.imgWrapper}>
                          <AiOutlineCheck />
                        </div>
                        {item?.professionalPlanBenefits?.phoneNo}
                      </div>
                      <div className={styles.textWrapper}>
                        <div className={styles.imgWrapper}>
                          <AiOutlineCheck />
                        </div>
                        {item?.professionalPlanBenefits?.workshopAddress}
                      </div>
                      <div className={styles.textWrapper}>
                        <div className={styles.imgWrapper}>
                          <AiOutlineCheck />
                        </div>
                        {item?.professionalPlanBenefits?.bookingSystem}
                      </div>
                      <div className={styles.textWrapper}>
                        <div className={styles.imgWrapper}>
                          <AiOutlineCheck />
                        </div>
                        {item?.professionalPlanBenefits?.supportChat}
                      </div>
                      <div className={styles.textWrapper}>
                        <div className={styles.imgWrapper}>
                          <AiOutlineCheck />
                        </div>
                        {item?.professionalPlanBenefits?.clientChat}
                      </div>
                      <div className={styles.textWrapper}>
                        <div className={styles.imgWrapper}>
                          <AiOutlineCheck />
                        </div>
                        {item?.professionalPlanBenefits?.upgradePlans}
                      </div>
                      <div className={styles.textWrapper}>
                        <div className={styles.imgWrapper}>
                          <AiOutlineCheck />
                        </div>
                        {item?.professionalPlanBenefits?.deleteAccount}
                      </div>
                    </div>
                    <div className={styles.btnWrapper}>
                      <div className={styles.btn}
                        onClick={() => handleActivePayment(item, index)}
                      >
                        {planLoadingIndex === index && planLoading ?
                          <Bars
                            height="30"
                            width="100"
                            color="white"
                            ariaLabel="bars-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                          /> :
                          <>
                            Get Started &nbsp;
                            <BiChevronRight className={styles.icon} />
                          </>
                        }
                      </div>
                    </div>
                  </div>
                )
              } else if (item?.title === PlanTypeEnum.StarterPlan) {
                return (
                  <div className={styles.card} key={index}>
                    <div className={styles.header}>
                      <div className={styles.title}>{item?.title}</div>
                      <div className={styles.headingWrapper}>
                        <div className={styles.left}>
                          <div className={styles.heading}>{item?.price}</div>
                        </div>
                      </div>
                      <div className={styles.subTitle}>
                        The starter plan includes the following
                      </div>
                    </div>
                    <div className={styles.details}>
                      <div className={styles.textWrapper}>
                        <div className={styles.imgWrapper}>
                          <AiOutlineCheck />
                        </div>
                        {item?.starterPlanBenefits?.profileEditor}
                      </div>
                      <div className={styles.textWrapper}>
                        <div className={styles.imgWrapper}>
                          <AiOutlineCheck />
                        </div>
                        {item?.starterPlanBenefits?.uploadphotos}
                      </div>
                      <div className={styles.textWrapper}>
                        <div className={styles.imgWrapper}>
                          <AiOutlineCheck />
                        </div>
                        {item?.starterPlanBenefits?.workSpecialties}
                      </div>
                      <div className={styles.textWrapper}>
                        <div className={styles.imgWrapper}>
                          <AiOutlineCheck />
                        </div>
                        {item?.starterPlanBenefits?.phoneNo}
                      </div>
                      <div className={styles.textWrapper}>
                        <div className={styles.imgWrapper}>
                          <AiOutlineCheck />
                        </div>
                        {item?.starterPlanBenefits?.workshopAddress}

                      </div>
                      <div className={styles.textWrapper}>
                        <div className={styles.imgWrapper}>
                          <AiOutlineCheck />
                        </div>
                        {item?.starterPlanBenefits?.upgradePlans}
                      </div>
                      <div className={styles.textWrapper}>
                        <div className={styles.imgWrapper}>
                          <AiOutlineCheck />
                        </div>
                        {item?.starterPlanBenefits?.deleteAccount}
                      </div>
                    </div>
                    <div className={styles.btnWrapper}>
                      <div
                        className={styles.btn}
                        style={{
                          backgroundColor: "#F5F5FF", color: "#000000",
                          cursor: "default"
                        }}
                      >
                        Get Started &nbsp;
                        <BiChevronRight className={styles.icon} />
                      </div>
                    </div>
                  </div>
                )
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CalculatePaymentCards;