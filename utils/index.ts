import { format } from "date-fns";

// format counter time in mm:ss
export const formatTime = (seconds: number) => {
  const date = new Date(seconds * 1000);
  return format(date, "mm:ss");
};
