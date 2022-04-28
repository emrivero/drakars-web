import { Container } from "@mui/material";
import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { RentFilter } from "../src/components/organism/rent-filter";
import { Layout } from "../src/components/templates/layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <Container
        maxWidth="xl"
        sx={{
          width: "70vw",
        }}
      >
        <RentFilter image="/img/portrait.jpg" />
      </Container>
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
