let eventGuid = 0;
let today = new Date();
let todayStr = today.toISOString().slice(0, 10); // YYYY-MM-DD of today
let yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);
let yesterdayStr = yesterday.toISOString().slice(0, 10); // YYYY-MM-DD of yesterday
let tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
let tomorrowStr = tomorrow.toISOString().slice(0, 10); // YYYY-MM-DD of tomorrow

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: "Sleeping time",
    start: todayStr,
    end: tomorrowStr,
    startTime: "23:00:00",
    endTime: "29:00:00",
    color: "gray",
    display: "background",
    classNames: "sleep-time",
    textColor: "blue",
    editable: false,
    startRecur: yesterdayStr + "T15:00:00",
    endRecur: tomorrowStr + "T20:00:00",
    // daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    id: createEventId(),
    title: "Tyne It ",
    start: todayStr,
    end: todayStr,
    startTime: "8:45:00",
    endTime: "17:00:00",
    display: "background",
    editable: false,
    color: "red",
    text: "blue",
    description: "This event is scheduled for your milk job",
    startRecur: yesterdayStr + "T15:00:00",
    endRecur: tomorrowStr + "T20:00:00",
    daysOfWeek: [0, 1, 2, 3, 4, 5],
  },
];

export function createEventId() {
  return String(eventGuid++);
}
