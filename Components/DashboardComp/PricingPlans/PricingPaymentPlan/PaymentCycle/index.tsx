import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AiOutlineCheck } from "react-icons/ai";
import { RotatingLines } from "react-loader-spinner";
import styles from "./paymentCycle.module.scss";
import { postBillingMethod } from "@component/services/PricePlans";
import {
  saveTempPlan,
  setPayableAmount,
} from "@component/store/reducers/planReducer";

interface Prop {
  planData?: any;
  // afterDiscount?: any;
  billingMethod?: number;
  setBillingmethod?: any;
  setActivePaymentMethod?: any;
  buttonVisible: Boolean;
  activePaymentMethod: any;
  setReload: any;
  reload: any;
}
const PaymentCycle = (prop: Prop) => {
  const { user } = useSelector((state: any) => state.user);
  const {
    planData,
    billingMethod,
    setBillingmethod,
    setActivePaymentMethod,
    buttonVisible,
    activePaymentMethod,
    setReload,
    reload,
  } = prop;
  const [afterDiscount, setAfterdiscount] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleBillingpayment = async () => {
    try {
      if (billingMethod === 1) {
        setLoading(true);
        let param = {
          companyId: user?.data?.user?.id,
          planId: planData?.id,
          billingType: "yearly",
        };
        const response = await postBillingMethod(param);
        setAfterdiscount(response?.data?.payableAmount);
        const newObj = { ...planData, billingType: "yearly" };
        dispatch(saveTempPlan(newObj));
        dispatch(setPayableAmount(response?.data?.payableAmount));
        toast.success(response?.data?.message);
        setLoading(false);
      } else {
        setLoading(true);
        let param = {
          companyId: user?.data?.user?.id,
          planId: planData?.id,
          billingType: "monthly",
        };
        const response = await postBillingMethod(param);
        const newObj = { ...planData, billingType: "monthly" };
        setAfterdiscount(response?.data?.payableAmount);
        dispatch(saveTempPlan(newObj));
        dispatch(setPayableAmount(response?.data?.payableAmount));
        toast.success(response?.data?.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    handleBillingpayment();
  }, [afterDiscount, billingMethod, activePaymentMethod, reload]);

  useEffect(() => {}, [afterDiscount]);
  return (
    <div className={styles.Wrapper}>
      {planData?.title === "Professional Plan" ? (
        <>
          {" "}
          <div className={styles.paymentCycle}>
            <div className={styles.header}>
              <h1>{planData?.title}</h1>
              <p>Billing cycle</p>
              <div className={styles.radioButtonsWrapper}>
                <div className={styles.creditCard}>
                  <div
                    className={styles.checkbox}
                    // onClick={}
                  >
                    <input
                      type="radio"
                      id="s-option"
                      defaultChecked={billingMethod === 1 ? true : false}
                      name="selector"
                      onClick={() => {
                        setBillingmethod(1), handleBillingpayment();
                      }}
                    />
                    <div className={styles.text}>Annual</div>
                  </div>
                  {billingMethod === 1 ? (
                    <div className={styles.cals}>
                      <p className={styles.off}>First 3 Month Save up to 15%</p>
                    </div>
                  ) : null}
                </div>
                <div className={styles.creditCard}>
                  <div className={styles.checkbox}>
                    <input
                      defaultChecked={billingMethod === 0 ? true : false}
                      type="radio"
                      id="s-option"
                      name="selector"
                      onClick={() => {
                        setBillingmethod(0), handleBillingpayment();
                      }}
                    />
                    <div className={styles.text}>Monthly</div>
                  </div>
                  {billingMethod === 0 ? (
                    <div className={styles.cal}>
                      <p className={styles.off}>First 3 Month Save up to 15%</p>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className={styles.amount}>
                <div className={styles.plans}>
                  <h1>{planData?.title}</h1>
                </div>
                <div className={styles.cal}>
                  {loading ? (
                    <RotatingLines
                      strokeColor="  #3D83DF"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="22"
                      visible={true}
                    />
                  ) : (
                    <>
                      <p>
                        <span>
                          $
                          {billingMethod === 1
                            ? planData?.price * 12
                            : planData?.price}
                        </span>
                        ${afterDiscount}
                      </p>
                      <p className={styles.off}>
                        {billingMethod === 1 ? "15% off" : "15% Off"}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.details}>
                <div className={styles.textWrapper}>
                  <div className={styles.imgWrapper}>
                    <AiOutlineCheck />
                  </div>
                  {planData?.professionalPlanBenefits?.profileEditor}
                </div>
                <div className={styles.textWrapper}>
                  <div className={styles.imgWrapper}>
                    <AiOutlineCheck />
                  </div>
                  {planData?.professionalPlanBenefits?.uploadphotos}
                </div>
                <div className={styles.textWrapper}>
                  <div className={styles.imgWrapper}>
                    <AiOutlineCheck />
                  </div>
                  {planData?.professionalPlanBenefits?.workSpecialties}
                </div>
                <div className={styles.textWrapper}>
                  <div className={styles.imgWrapper}>
                    <AiOutlineCheck />
                  </div>
                  {planData?.professionalPlanBenefits?.videos}
                </div>
                <div className={styles.textWrapper}>
                  <div className={styles.imgWrapper}>
                    <AiOutlineCheck />
                  </div>
                  {planData?.professionalPlanBenefits?.certificates}
                </div>
                <div className={styles.textWrapper}>
                  <div className={styles.imgWrapper}>
                    <AiOutlineCheck />
                  </div>
                  {planData?.professionalPlanBenefits?.description}
                </div>
                <div className={styles.textWrapper}>
                  <div className={styles.imgWrapper}>
                    <AiOutlineCheck />
                  </div>
                  {planData?.professionalPlanBenefits?.ratings}
                </div>
                <div className={styles.textWrapper}>
                  <div className={styles.imgWrapper}>
                    <AiOutlineCheck />
                  </div>
                  {planData?.professionalPlanBenefits?.phoneNo}
                </div>
                <div className={styles.textWrapper}>
                  <div className={styles.imgWrapper}>
                    <AiOutlineCheck />
                  </div>
                  {planData?.professionalPlanBenefits?.addCategory}
                </div>

                <div className={styles.textWrapper}>
                  <div className={styles.imgWrapper}>
                    <AiOutlineCheck />
                  </div>
                  {planData?.professionalPlanBenefits?.workshopAddress}
                </div>
                <div className={styles.textWrapper}>
                  <div className={styles.imgWrapper}>
                    <AiOutlineCheck />
                  </div>
                  {planData?.professionalPlanBenefits?.bookingSystem}
                </div>
                <div className={styles.textWrapper}>
                  <div className={styles.imgWrapper}>
                    <AiOutlineCheck />
                  </div>
                  {planData?.professionalPlanBenefits?.supportChat}
                </div>
                <div className={styles.textWrapper}>
                  <div className={styles.imgWrapper}>
                    <AiOutlineCheck />
                  </div>
                  {planData?.professionalPlanBenefits?.clientChat}
                </div>
                <div className={styles.textWrapper}>
                  <div className={styles.imgWrapper}>
                    <AiOutlineCheck />
                  </div>
                  {planData?.professionalPlanBenefits?.upgradePlans}
                </div>
                <div className={styles.textWrapper}>
                  <div className={styles.imgWrapper}>
                    <AiOutlineCheck />
                  </div>
                  {planData?.professionalPlanBenefits?.deleteAccount}
                </div>
              </div>
              {buttonVisible && (
                <div className={styles.btnWrapper}>
                  <div
                    className={styles.btn}
                    onClick={() => {
                      !loading ? setActivePaymentMethod(true) : null;
                      // dispatch(saveTempPlan(planData));
                    }}
                  >
                    {/* {planLoadingIndex === index && planLoading ? (
                          <Bars
                            height="30"
                            width="100"
                            color="white"
                            ariaLabel="bars-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                          />
                        ) : (
                          <> */}
                    Continue
                    {/* </>
                        )} */}
                  </div>
                </div>
              )}
            </div>
            <div className={styles.subTotal}>
              <p>Subtotal</p>
              {loading ? (
                <RotatingLines
                  strokeColor="  #3D83DF"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="22"
                  visible={true}
                />
              ) : (
                <>
                  <p>${afterDiscount}</p>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.paymentCycle}>
            <div className={styles.header}>
              <h1>{planData?.title}</h1>
              <p>Billing cycle</p>
              <div className={styles.radioButtonsWrapper}>
                <div className={styles.creditCard}>
                  <div className={styles.checkbox}>
                    <input
                      type="radio"
                      id="s-option"
                      // checked={billingMethod && reload === 1 ? true : false}
                      defaultChecked={billingMethod === 1 ? true : false}
                      name="selector"
                      value={billingMethod}
                      onClick={() => {
                        setBillingmethod(1), handleBillingpayment();
                      }}
                    />
                    <div className={styles.text}>Annual</div>
                  </div>
                  {billingMethod === 1 ? (
                    <div className={styles.cals}>
                      <p className={styles.off}>First 3 Month Save up to 15%</p>
                    </div>
                  ) : null}
                </div>
                <div className={styles.creditCard}>
                  <div className={styles.checkbox}>
                    <input
                      type="radio"
                      id="s-option"
                      name="selector"
                      defaultChecked={billingMethod === 0 ? true : false}
                      onClick={() => {
                        setBillingmethod(0), handleBillingpayment();
                      }}
                    />
                    <div className={styles.text}>Monthly</div>
                  </div>
                  {billingMethod === 0 ? (
                    <div className={styles.cal}>
                      <p className={styles.off}>First 3 Month Save up to 15%</p>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className={styles.amount}>
                <div className={styles.plans}>
                  <h1>{planData?.title}</h1>
                </div>
                <div className={styles.cal}>
                  {loading ? (
                    <RotatingLines
                      strokeColor="  #3D83DF"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="22"
                      visible={true}
                    />
                  ) : (
                    <>
                      <p>
                        <span>
                          ${" "}
                          {billingMethod === 1
                            ? planData?.price * 12
                            : planData?.price}
                        </span>{" "}
                        ${afterDiscount}
                      </p>
                      <p className={styles.off}>
                        {" "}
                        {billingMethod === 1 ? "15% off" : "15% Off"}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.details}>
                <div className={styles.textWrapper}>
                  <div className={styles.imgWrapper}>
                    <AiOutlineCheck />
                  </div>
                  {planData?.enterprisePlanBenefits?.profileEditor}
                </div>
                <div className={styles.textWrapper}>
                  <div className={styles.imgWrapper}>
                    <AiOutlineCheck />
                  </div>
                  {planData?.enterprisePlanBenefits?.uploadphotos}
                </div>
                <div className={styles.textWrapper}>
                  <div className={styles.imgWrapper}>
                    <AiOutlineCheck />
                  </div>
                  {planData?.enterprisePlanBenefits?.workSpecialties}
                </div>
                <div className={styles.textWrapper}>
                  <div className={styles.imgWrapper}>
                    <AiOutlineCheck />
                  </div>
                  {planData?.enterprisePlanBenefits?.description}
                </div>
                <div className={styles.textWrapper}>
                  <div className={styles.imgWrapper}>
                    <AiOutlineCheck />
                  </div>
                  {planData?.enterprisePlanBenefits?.ratings}
                </div>
                <div className={styles.textWrapper}>
                  <div className={styles.imgWrapper}>
                    <AiOutlineCheck />
                  </div>
                  {planData?.enterprisePlanBenefits?.phoneNo}
                </div>
                <div className={styles.textWrapper}>
                  <div className={styles.imgWrapper}>
                    <AiOutlineCheck />
                  </div>
                  {planData?.enterprisePlanBenefits?.addCategory}
                </div>
                <div className={styles.textWrapper}>
                  <div className={styles.imgWrapper}>
                    <AiOutlineCheck />
                  </div>
                  {planData?.enterprisePlanBenefits?.workshopAddress}
                </div>
                <div className={styles.textWrapper}>
                  <div className={styles.imgWrapper}>
                    <AiOutlineCheck />
                  </div>
                  {planData?.enterprisePlanBenefits?.bookingSystem}
                </div>
                <div className={styles.textWrapper}>
                  <div className={styles.imgWrapper}>
                    <AiOutlineCheck />
                  </div>
                  {planData?.enterprisePlanBenefits?.supportChat}
                </div>
                <div className={styles.textWrapper}>
                  <div className={styles.imgWrapper}>
                    <AiOutlineCheck />
                  </div>
                  {planData?.enterprisePlanBenefits?.clientChat}
                </div>
                <div className={styles.textWrapper}>
                  <div className={styles.imgWrapper}>
                    <AiOutlineCheck />
                  </div>
                  {planData?.enterprisePlanBenefits?.exportData}
                </div>
                <div className={styles.textWrapper}>
                  <div className={styles.imgWrapper}>
                    <AiOutlineCheck />
                  </div>
                  {planData?.enterprisePlanBenefits?.videos}
                </div>
                {/* <div className={styles.textWrapper}>
                  <div className={styles.imgWrapper}>
                    <AiOutlineCheck />
                  </div>
                  {planData?.enterprisePlanBenefits?.companyChat}
                </div>

                <div className={styles.textWrapper}>
                  <div className={styles.imgWrapper}>
                    <AiOutlineCheck />
                  </div>
                  {planData?.enterprisePlanBenefits?.languages}
                </div> */}

                <div className={styles.textWrapper}>
                  <div className={styles.imgWrapper}>
                    <AiOutlineCheck />
                  </div>
                  {planData?.enterprisePlanBenefits?.certificates}
                </div>
                <div className={styles.textWrapper}>
                  <div className={styles.imgWrapper}>
                    <AiOutlineCheck />
                  </div>
                  {planData?.enterprisePlanBenefits?.downgradePlans}
                </div>
                <div className={styles.textWrapper}>
                  <div className={styles.imgWrapper}>
                    <AiOutlineCheck />
                  </div>
                  {planData?.enterprisePlanBenefits?.deleteAccount}
                </div>
              </div>
              {buttonVisible && (
                <div className={styles.btnWrapper}>
                  <div
                    className={styles.btn}
                    onClick={() => {
                      !loading ? setActivePaymentMethod(true) : null;
                      // dispatch(saveTempPlan(planData));
                    }}
                  >
                    {/* {planLoadingIndex === index && planLoading ? (
                          <Bars
                            height="30"
                            width="100"
                            color="white"
                            ariaLabel="bars-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                          />
                        ) : (
                          <> */}
                    Continue
                    {/* </>
                        )} */}
                  </div>
                </div>
              )}
            </div>
            <div className={styles.subTotal}>
              <p>Subtotal</p>
              {loading ? (
                <RotatingLines
                  strokeColor="  #3D83DF"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="22"
                  visible={true}
                />
              ) : (
                <>
                  <p>${afterDiscount}</p>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentCycle;
