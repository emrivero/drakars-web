import { CarRental, Person } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { FC } from "react";
import { useAuth } from "../../../auth/use-auth";
import { useTranslate } from "../../../i18n/useTranslate";
import { Capitalize } from "../../atoms/transforms/capitalize";

export const BottomBar: FC = () => {
  const { t } = useTranslate();
  const { login } = useAuth();
  return (
    <BottomNavigation
      sx={{
        display: { md: "none" },
        width: "100%",
        position: "fixed",
        bottom: 0,
        zIndex: 10,
      }}
      showLabels
    >
      <BottomNavigationAction
        label={<Capitalize>{t("manage_booking")}</Capitalize>}
        icon={<CarRental />}
        href="/home/services/manage-booking"
      />
      <BottomNavigationAction
        onClick={login}
        label={<Capitalize>{t("enter")}</Capitalize>}
        icon={<Person />}
      />
    </BottomNavigation>
  );
};
