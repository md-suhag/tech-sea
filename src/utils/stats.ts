const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const SHORT_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const fillMonthlyStats = (
  stats: { month: string; count: number; year: number }[],
  year: number
) => {
  const map = new Map(stats.map((s) => [s.month, s.count]));

  return MONTHS.map((month, index) => ({
    month: SHORT_MONTHS[index],
    year,
    count: map.get(month) ?? 0,
  }));
};
