import { Temporal } from "temporal-polyfill";

export const nowJp = () => Temporal.Now.zonedDateTimeISO("Asia/Tokyo");
export const weekday = () => {
  const now = nowJp();
  const options = { weekday: "long" };
  return now.toLocaleString("en", options);
};
export const time = () => {
  const now = nowJp();
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return now.toLocaleString("en", options);
};
