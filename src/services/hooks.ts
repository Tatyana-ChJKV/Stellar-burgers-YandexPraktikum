import {TypedUseSelectorHook, useDispatch as useDispatchRedux, useSelector as useSelectorRedux} from "react-redux";
import {AppDispatch, RootState} from "./store";
// данный хук будет знакть какие методы бывают - асинхронные.неасинхронные
export const useDispatch = () => useDispatchRedux<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorRedux;
