import { create } from "zustand";
import createCartSlice from "./cartStore";

const useStore = create(createCartSlice);
