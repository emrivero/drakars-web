import { FC } from "react";
import { Layout } from "../components/templates/layout";
import { NotFoundTemplate } from "../components/templates/not-found";

export const NotFoundPage: FC = () => {
  return (
    <Layout showFooter={false}>
      <NotFoundTemplate />
    </Layout>
  );
};
