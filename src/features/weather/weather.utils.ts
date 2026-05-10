export function formatHour(time: string, timezone: string) {
  return new Date(time).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h24",
    timeZone: timezone,
  });
}

export function formatDateToNumber(date: string, timezone: string) {
  return new Date(date).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    timeZone: timezone,
  });
}

export function formatDateToWeekday(date: string, timezone: string) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    timeZone: timezone,
  });
}
