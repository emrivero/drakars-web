import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import ReactDOM from "react-dom";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import AboutUs from "./pages/about/about-us";
import Contact from "./pages/about/contact";
import Covid19 from "./pages/about/covid19";
import Faq from "./pages/about/faq";
import AdminHome from "./pages/admin";
import Home from "./pages/home";
import theme from "./theme";

ReactDOM.render(
  <ThemeProvider theme={theme.themeClient}>
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminHome />}></Route>
        <Route path="/about"></Route>
        <Route path="/vehicles">
          <Route path="about-us" element={<AboutUs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="covid19" element={<Covid19 />} />
          <Route path="faq" element={<Faq />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>,
  document.querySelector("#root")
);
