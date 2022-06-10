interface LoggedInfoProps {
  logged: boolean;
}

export const LoggedInfoSlice: { loggedInfoState: LoggedInfoProps } = {
  loggedInfoState: {
    logged: false,
  },
};
