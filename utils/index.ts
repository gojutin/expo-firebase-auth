import * as Haptic from "expo-haptics";
import { format } from "date-fns";

export { default as useDimensions } from "./useDimensions";
export { default as useFade } from "./useFade";
export { default as useDarkMode} from './useDarkMode'

export const generateHaptic = () => {
  Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Medium);
};

export const formatDate = date => format(date, "YYYY-MM-DD");

export const formatPrettyDate = date => format(date, "ddd, MMMM DD, YYYY");

export const colors = {
  darkGray: "#333",
  lightGray: "#DADADA",
  blue: "#03A9F4"
};
