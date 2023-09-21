import { getSepaIntent, getStripeIntent } from "@component/services/Payment";
import { IbanElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
interface PlanValidity {
  currency: string;
  amount: number | string;
  companyId: string | number;
  planId: number;
  duration: number | string;
  planTitle: string | number;
  email: string | number;
  iban: number | string;
}
const useCheckoutSepa = ({ setpopupvisible }) => {
  const [sepaForm, setSepaForm] = useState<any>({
    name: "",
    email: "",
    IBAN: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const { tempPlanInfo, payableAmount } = useSelector(
    (state: any) => state.plan
  );
  const { user } = useSelector((state: any) => state.user);

  const handleGetValue = (key: any, value: any) => {
    setSepaForm({ ...sepaForm, [key]: value });
  };
  const handleSubmit = async (stripe: any, elements: any) => {
    const ibanElement = elements.getElement(IbanElement);

    const findPrice =
      tempPlanInfo?.price === "$5" ? 5 : tempPlanInfo?.price === "$10" ? 10 : 0;
    let params: PlanValidity = {
      currency: "usd",
      amount: payableAmount,
      companyId: user?.data?.user?.id,
      planId: tempPlanInfo?.id,
      duration: tempPlanInfo?.duration,
      planTitle: tempPlanInfo?.title,
      email: user?.data?.user?.email,
      iban: "DE89370400440532013000",
    };

    const email = user?.data?.user?.email;
    try {
      setLoading(true);
      const resData = await getSepaIntent(params);
      const paymentMethod = await stripe?.createPaymentMethod({
        type: "sepa_debit",
        sepa_debit: ibanElement,
        billing_details: {
          email,
          name: "Xaad Ali",
        },
      });
      if (paymentMethod?.error) {
        toast.error(paymentMethod?.error?.message);
        setLoading(false);
        return;
      }
      const clientSecret = resData?.data?.data?.client_secret;

      const paymentMethodId = paymentMethod?.paymentMethod?.id;

      const finalResponse = await stripe.confirmSepaDebitPayment(clientSecret, {
        payment_method: paymentMethodId,
      });
      if (finalResponse?.paymentIntent?.status === "succeeded") {
        toast.success("Congratulations Payment Successful!");
        setpopupvisible(true);
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
        setLoading(false);
      }

      toast.error(finalResponse?.error?.message);
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
    loading,
    handleGetValue,
  };
};

export default useCheckoutSepa;
