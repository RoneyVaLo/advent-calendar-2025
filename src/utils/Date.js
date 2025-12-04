export const getDay = (day) => {
  const date = new Date(day + "T00:00:00");
  return date.getDate();
};
