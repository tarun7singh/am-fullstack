export const getIconUrl = (icon: string) =>
  `https://openweathermap.org/img/w/${icon}.png`;

export const formatDay = (date: number) => {
  const day = new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
  });
  return day;
};

export const formatTime = (date: number) => {
  const time = new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
  return time;
};
