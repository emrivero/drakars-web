import { FC } from "react";
import { Layout } from "../../components/templates/client/layout";
import { NotFoundTemplate } from "../../components/templates/client/not-found";

export const NotFoundPage: FC = () => {
  return (
    <Layout showFooter={false}>
      <NotFoundTemplate />
    </Layout>
  );
};
