/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import styles from "./pricingCards.module.scss";
import { AiOutlineCheck } from "react-icons/ai";
import { BiChevronRight } from "react-icons/bi";
import { PlanTypeEnum } from "@component/utills/enum";
import usePricing from "./usePricing";

interface Prop {
  setActivePaymentMethod?: (prop: any) => void;
  handleActivePayment?: any;
  plansDetails?: any;
  loading?: boolean;
}

const PublicPricingCards = (prop: Prop) => {
  const { handleActivePayment } = prop;
  const { plansDetails } = usePricing();
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.cardWrapper}>
            {plansDetails?.map((item, index) => {
              if (item?.title === PlanTypeEnum.EnterprisePlan) {
                return (
                  <div
                    className={styles.card}
                    id={styles.differentCard}
                    key={index}
                  >
                    <div className={styles.popular}>
                      <p>Most Popular</p>
                    </div>
                    <div className={styles.header}>
                      <div className={styles.title}>{item?.title}</div>
                      <div className={styles.headingWrapper}>
                        <div className={styles.left}>
                          <div className={styles.heading}>${item?.price}</div>
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
                      <div
                        className={styles.btn}
                        onClick={() => handleActivePayment(item)}
                      >
                        Get Started &nbsp;
                        <BiChevronRight className={styles.icon} />
                      </div>
                    </div>
                  </div>
                );
              }
            })}
            {plansDetails?.map((item, index) => {
              if (item?.title === PlanTypeEnum.ProfessionalPlan) {
                return (
                  <div className={styles.card} key={index}>
                    <div className={styles.header}>
                      <div className={styles.title}>{item?.title}</div>
                      <div className={styles.headingWrapper}>
                        <div className={styles.left}>
                          <div className={styles.heading}>${item?.price}</div>
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
                      <div
                        className={styles.btn}
                        onClick={() => handleActivePayment(item)}
                      >
                        Get Started <BiChevronRight className={styles.icon} />
                      </div>
                    </div>
                  </div>
                );
              }
            })}
            {plansDetails?.map((item, index) => {
              if (item?.title === PlanTypeEnum.StarterPlan) {
                return (
                  <div className={styles.card} key={index}>
                    <div className={styles.header}>
                      <div className={styles.title}>{item?.title}</div>
                      <div className={styles.headingWrapper}>
                        <div className={styles.left}>
                          <div className={styles.heading}>
                            {item?.price === 0 ? "Free" : item?.price}
                          </div>
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
                      <div className={styles.btn} id={styles.lastbtn}>
                        Get Started &nbsp;
                        <BiChevronRight className={styles.icon} />
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicPricingCards;
