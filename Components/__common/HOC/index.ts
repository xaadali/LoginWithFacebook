import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export function requireAuthentication(gssp: any) {
  return async (context: GetServerSidePropsContext) => {
    const res: any = await getSession(context);
    const token = res?.user?.token;
    if (!token) {
      return {
        redirect: {
          destination: "/",
        },
      };
    }
    return await gssp(token);
  };
}
