import create, { GetState, Mutate, SetState, StoreApi } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { SidebarSlice } from "./sidebar/state";

type State = typeof SidebarSlice;

export const useStore = create<
  State,
  SetState<any>,
  GetState<any>,
  Mutate<StoreApi<State>, [["zustand/subscribeWithSelector", never]]>
>(
  subscribeWithSelector(() => ({
    ...SidebarSlice,
  }))
);

// Logging middleware setState
export const set: SetState<State> = (newState: any, replace?: boolean) => {
  console.log("[Applying Changes]", newState);
  useStore.setState(newState, replace);
  console.log("[New State]", useStore.getState());
};

export const get: GetState<State> = useStore.getState;
