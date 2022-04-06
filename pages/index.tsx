import { Box } from "@mui/material";
import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect } from "react";
import { get } from "../src/api";
import { Layout } from "../src/components/templates/layout";

const Home: NextPage = () => {
  useEffect(() => {
    get("vehicle");
  }, []);

  return (
    <Layout>
      <Box sx={{ flexGrow: 1 }}></Box>;
    </Layout>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "header"])),
    },
  };
}

export default Home;
