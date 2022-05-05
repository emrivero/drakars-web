import produce, { Draft } from "immer";
import create, { GetState, Mutate, SetState, StoreApi } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { OfficeSlice } from "../service/office/state";
import { VehicleSlice } from "../service/vehicle/state";
import { SidebarSlice } from "./sidebar/state";

type AppState = typeof SidebarSlice & typeof VehicleSlice & typeof OfficeSlice;

export const useStore = create<
  AppState,
  SetState<any>,
  GetState<any>,
  Mutate<StoreApi<AppState>, [["zustand/subscribeWithSelector", never]]>
>(
  subscribeWithSelector(() => ({
    ...SidebarSlice,
    ...VehicleSlice,
    ...OfficeSlice,
  }))
);

export const set: SetState<AppState> = (newState: any, replace?: boolean) => {
  console.log("[Applying Changes]", newState);
  useStore.setState(newState, replace);
  console.log("[New State]", useStore.getState());
};

export const get: GetState<AppState> = useStore.getState;

export const changeState: SetState<Draft<AppState>> = (
  recipe: (draft: Draft<AppState>) => Draft<AppState>,
  replace?: boolean
) => {
  useStore.setState(produce<AppState>(get(), recipe), replace);
};
