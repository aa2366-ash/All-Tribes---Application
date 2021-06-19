import dayjs from "dayjs";

export const DayConvert = (date: string) => {
  return dayjs(date).format("MMM D, YYYY h:mm A");
};
