import { getStripeIntent } from "@component/services/Payment";
import { resetUserState } from "@component/store/reducers/userReducer";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
interface PlanValidity {
  currency: string;
  amount: number | string;
  companyId: string | number;
  planId: number;
  duration: number | string;
  planTitle: string | number;
  email: string | number;
  setpopupvisible?: any;
  billingType?: string;
}
const useCheckout = ({ setpopupvisible }) => {
  const [name, setName] = useState<string>("");
  const [country, setCountry] = useState<string>("Select Country");
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState(false);
  const location = useRouter();
  const dispatch = useDispatch();

  const { tempPlanInfo, payableAmount } = useSelector(
    (state: any) => state.plan
  );
  const { user } = useSelector((state: any) => state.user);

  const handleSubmit = async (stripe: any, elements: any) => {
    if (name?.length < 1) {
      toast.error("The name is Required");
      return;
    }
    const cardElement = elements.getElement(
      CardNumberElement,
      CardExpiryElement,
      CardCvcElement
    );
    const findPrice = tempPlanInfo?.price;
    let params: PlanValidity = {
      currency: "usd",
      amount: payableAmount,
      companyId: user?.data?.user?.id,
      planId: tempPlanInfo?.id,
      duration: tempPlanInfo?.duration,
      planTitle: tempPlanInfo?.title,
      email: user?.data?.user?.email,
      billingType: tempPlanInfo?.billingType,
    };
    const email = user?.data?.user?.email;
    try {
      setLoading(true);
      const resData = await getStripeIntent(params);
      const paymentMethod = await stripe?.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          email,
        },
      });

      if (paymentMethod?.error) {
        toast.error(paymentMethod?.error?.message);
        setLoading(false);
        return;
      }
      const clientSecret = resData?.data?.data?.client_secret;

      const paymentMethodId = paymentMethod?.paymentMethod?.id;

      const finalResponse = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodId,
      });
      if (finalResponse?.paymentIntent?.status === "succeeded") {
        setVisible(true);
        const timer = setTimeout(() => {
          // toast.success("Congratulations Payment Successful!");
          dispatch(resetUserState());
          setVisible(false);
          location.push("/login");
        }, 2000);
        setpopupvisible(true);
        return () => clearTimeout(timer);

        // let walletParams = {
        //   userId: user?._id,
        //   nftId: data?._id,
        //   walletAddress: namiWalletAddress,
        //   transactionNumberOrHash: finalResponse?.paymentIntent?.id,
        //   amount: String(
        //     Math.round(
        //       Number(
        //         (data?.value + multiValue) * counter * usdPrice + Number.EPSILON
        //       ) * 100
        //     ) / 100
        //   ),
        //   countOfNftToMint: counter,
        // };
        // const res = await CreateWalletOrderWithStripe(walletParams);
        // toast.success(res?.data?.message);
      }

      toast.error(finalResponse?.error?.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const errorMessage = error?.response?.data?.message
        ? error?.response?.data?.message
        : error?.error?.message;
      toast.error(errorMessage);
    }
  };

  return {
    handleSubmit,
    country,
    setName,
    setCountry,
    loading,
    setVisible,
    visible,
  };
};

export default useCheckout;
