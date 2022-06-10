import { FavDestinations } from "../../components/organism/fav-destinations";
import { RentCars } from "../../components/organism/rent-cars";
import { RentFilter } from "../../components/organism/rent-filter";
import { Layout } from "../../components/templates/client/layout";
import { CommonSection } from "../../components/templates/client/layout/common-section";

const Home = () => {
  return (
    <Layout>
      <CommonSection>
        <RentFilter image="img/portrait.jpg" />
        <FavDestinations />
        <RentCars />
      </CommonSection>
    </Layout>
  );
};

export default Home;
