export const formatTodayDate = () => {
  const today = new Date();

  // Get short day name (Mon, Tue, etc.)
  const dayName = today.toLocaleDateString("en-US", { weekday: "short" });

  // Get numeric day
  const day = today.getDate();

  // Get short month name (Jul, Aug, etc.)
  const month = today.toLocaleDateString("en-US", { month: "short" });

  // Get year
  const year = today.getFullYear();

  return `Today . ${dayName} ${day} ${month} ${year}`;
};
