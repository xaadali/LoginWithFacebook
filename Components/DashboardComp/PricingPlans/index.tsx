import PricingCards from "@component/Components/PricingComponents/pricingCards";
import { saveTempPlan } from "@component/store/reducers/planReducer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaymentMethod from "./paymentMethods";
import styles from "./pricing.module.scss";
import UsePaymentMethod from "./paymentMethods/usePaymentMethods";
import moment from "moment";
import { CompLoader } from "@component/Components/__common/loader/Loader";
import { checkPlanValidity } from "@component/services/Payment";
import modifyError from "@component/helper";
import PricingPaymentCards from "./PricingPaymentPlan";
import Banner from "@component/Components/__common/Banner";
import Modal from "@component/Components/__common/modal";
import DeletePackagePopup from "./cancelPackagemodal";
import { postBillingMethod } from "@component/services/PricePlans";
import PaymentCycle from "./PricingPaymentPlan/PaymentCycle";
import { PlanTypeEnum } from "@component/utills/enum";

const CompanyPricingPlan = () => {
  const [planLoading, setPlanLoading] = useState<boolean>(false);
  const [planLoadingIndex, setPlanLoadingIndex] = useState<any>(false);
  const [active, setActive] = useState<number | undefined>(0);
  const [billingMethod, setBillingmethod] = useState<number | undefined>(0);
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [activePaymentMethod, setActivePaymentMethod] =
    useState<boolean>(false);
  const [reload, setReload] = useState(0);
  const {
    currentPlanInfo,
    plansDetails,
    loading,
    showBanner,
    handlePackage,
    setpopupvisible,
    popupvisible,
    expireTimeDuration,
  } = UsePaymentMethod();
  console.log(
    "🚀 ~ file: index.tsx:40 ~ CompanyPricingPlan ~ expireTimeDuration:",
    expireTimeDuration
  );
  console.log(
    "🚀 ~ file: index.tsx:40 ~ CompanyPricingPlan ~ showBanner:",
    showBanner
  );

  const handleActivePayment = async (item: any, index: number) => {
    setActivePaymentMethod(true);
    return;
    setPlanLoadingIndex(index);
    try {
      setPlanLoading(true);
      let params: any = {
        companyId: user?.data?.user?.id,
        planTitle: item?.title,
      };
      const response = await checkPlanValidity(params);
      if (response?.data) {
        dispatch(saveTempPlan(item));
        setActive(1);
      }
      setPlanLoading(false);
    } catch (error) {
      setActive(0);
      setPlanLoading(false);
      modifyError(error);
    }
  };
  useEffect(() => {}, [active]);
  const [planData, setPlandata] = useState<any>();

  useEffect(() => {}, [planData]);

  return (
    <>
      {/* {showBanner && expireTimeDuration ? (
        <div style={{ width: "90%" }}>
          <Banner currentPlanInfo={currentPlanInfo} />
        </div>
      ) : null} */}
      {activePaymentMethod ? (
        <>
          <PaymentMethod />
          <div className={styles.paymentCycleWrap}>
            <PaymentCycle
              buttonVisible={false}
              planData={planData}
              billingMethod={billingMethod}
              setBillingmethod={setBillingmethod}
              setActivePaymentMethod={setActivePaymentMethod}
              activePaymentMethod={activePaymentMethod}
              setReload={setReload}
              reload={reload}
            />
          </div>
        </>
      ) : (
        <>
          {loading ? (
            <CompLoader />
          ) : active === 0 ? (
            <div className={styles.container}>
              <h1>Pricing Plans</h1>
              <div className={styles.wrapper}>
                {showBanner && expireTimeDuration ? (
                  <Banner currentPlanInfo={currentPlanInfo} />
                ) : null}

                <div className={styles.header}>
                  <div className={styles.leftSide}>
                    <div className={styles.heading}>
                      Current Plan :{" "}
                      <span>
                        {currentPlanInfo?.isTrial
                          ? "Trial Offer"
                          : currentPlanInfo?.planTitle}
                      </span>
                    </div>
                    <div className={styles.date}>
                      Renew Date:{" "}
                      {currentPlanInfo?.renewDate === "lifetime"
                        ? currentPlanInfo?.renewDate.toUpperCase()
                        : moment(currentPlanInfo?.renewDate).format("lll")}
                    </div>
                  </div>
                  {currentPlanInfo?.planTitle ===
                  PlanTypeEnum.StarterPlan ? null : (
                    <>
                      <div
                        className={styles.btnWrapper}
                        onClick={handlePackage}
                      >
                        <div className={styles.btn}>Cancel</div>
                      </div>
                    </>
                  )}
                </div>
                <div className={styles.middleWrapper}>
                  <div className={styles.heading}>
                    Supercharge your <br />
                    security. Start free.
                  </div>
                  <div className={styles.para}>
                    Get the security and controls you need. No credit card
                    required.
                  </div>
                </div>
                <PricingCards
                  planLoadingIndex={planLoadingIndex}
                  planLoading={planLoading}
                  handleActivePayment={handleActivePayment}
                  plansDetails={plansDetails}
                  setActive={setActive}
                  setPlandata={setPlandata}
                  // handleBillingpayment={handleBillingpayment}
                  setBillingmethod={setBillingmethod}
                  currentPlanInfo={currentPlanInfo}
                />
              </div>
            </div>
          ) : active === 1 ? (
            <PricingPaymentCards
              planLoadingIndex={planLoadingIndex}
              planLoading={planLoading}
              handleActivePayment={handleActivePayment}
              plansDetails={plansDetails}
              setActive={setActive}
              planData={planData}
              setPlandata={setPlandata}
              // afterDiscount={afterDiscount}
              billingMethod={billingMethod}
              setBillingmethod={setBillingmethod}
              setActivePaymentMethod={setActivePaymentMethod}
              activePaymentMethod={activePaymentMethod}
              setReload={setReload}
              reload={reload}
            />
          ) : (
            ""
          )}
        </>
      )}
      <Modal visible={popupvisible} onClose={setpopupvisible} btn>
        <DeletePackagePopup
          popupvisible={popupvisible}
          onClose={handlePackage}
        />
      </Modal>
    </>
  );
};

export default CompanyPricingPlan;
