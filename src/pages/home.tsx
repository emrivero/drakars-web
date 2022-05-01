import { Container } from "@mui/material";
import { FavDestinations } from "../components/organism/fav-destinations";
import { RentCars } from "../components/organism/rent-cars";
import { RentFilter } from "../components/organism/rent-filter";
import { Layout } from "../components/templates/layout";

const Home = () => {
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
      <Container maxWidth="lg">
        <FavDestinations />
      </Container>
      <Container maxWidth="lg">
        <RentCars />
      </Container>
    </Layout>
  );
};

export default Home;
