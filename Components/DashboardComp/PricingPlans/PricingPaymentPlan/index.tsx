/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-key */
import React, { useEffect } from "react";
import styles from "./payment.module.scss";
import { AiOutlineCheck } from "react-icons/ai";
import { BiChevronRight } from "react-icons/bi";
import { PlanTypeEnum } from "@component/utills/enum";
import { Bars } from "react-loader-spinner";
import PaymentCycle from "./PaymentCycle";
import UsePaymentMethod from "../paymentMethods/usePaymentMethods";

interface Prop {
  setActivePaymentMethod?: (prop: any) => void;
  handleActivePayment?: any;
  plansDetails?: any;
  loading?: boolean;
  planLoading?: boolean;
  planLoadingIndex?: number;
  setActive?: any;
  planData?: any;
  setPlandata?: any;
  afterDiscount?: number;
  billingMethod?: number;
  setBillingmethod?: any;
  activePaymentMethod?: any;
  setReload?: any;
  reload?: any;
}

const PricingPaymentCards = (prop: Prop) => {
  const {
    handleActivePayment,
    plansDetails,
    planLoading,
    planLoadingIndex,
    setActive,
    planData,
    setPlandata,
    afterDiscount,
    billingMethod,
    setBillingmethod,
    setActivePaymentMethod,
    activePaymentMethod,
    reload,
    setReload,
  } = prop;
  return (
    <>
      <div className={styles.container}>
        <h1>Pricing Plans</h1>
        <div className={styles.wrapper}>
          <div className={styles.cardWrapper}>
            {plansDetails?.map((item, index) => {
              if (item?.title === PlanTypeEnum.EnterprisePlan) {
                return (
                  <div
                    className={
                      planData?.title === "Enterprise Plan"
                        ? styles.cardBorder
                        : styles.card
                    }
                    id={styles.differentCard}
                    onClick={() => {
                      setPlandata(item), setBillingmethod(1);
                      setReload(1);
                    }}
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
                        {item?.enterprisePlanBenefits?.addCategory}
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
                  </div>
                );
              } else if (item?.title === PlanTypeEnum.ProfessionalPlan) {
                return (
                  <div
                    className={
                      planData?.title === "Professional Plan"
                        ? styles.cardBorder
                        : styles.card
                    }
                    onClick={() => {
                      setPlandata(item), setBillingmethod(1);
                      setReload(0);
                    }}
                  >
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
                        {item?.professionalPlanBenefits?.videos}
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
                        {item?.professionalPlanBenefits?.addCategory}
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
                  </div>
                );
              }
            })}
          </div>
          <div className={styles.paymentCycleWrap}>
            <PaymentCycle
              buttonVisible={true}
              planData={planData}
              billingMethod={billingMethod}
              setBillingmethod={setBillingmethod}
              setActivePaymentMethod={setActivePaymentMethod}
              activePaymentMethod={activePaymentMethod}
              setReload={setReload}
              reload={reload}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingPaymentCards;
