export const DB_NAME = "TimeBoxDB";
export const DB_VERSION = 1;

export function initializeDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Create DayTask object store with composite key [date]
      if (!db.objectStoreNames.contains("DayTask")) {
        db.createObjectStore("DayTask", { keyPath: "date" }); // date is the primary key
      }
      // Create TimeFrame object store
      if (!db.objectStoreNames.contains("TimeFrame")) {
        const timeFrameStore = db.createObjectStore("TimeFrame", {
          keyPath: "id",
          autoIncrement: true,
        });
        timeFrameStore.createIndex("day_task_date", "day_task_date", {
          unique: false,
        });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = (event) => reject(event.target.error);
  });
}

export function addDayTask(db, dayTask) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("DayTask", "readwrite");
    const store = transaction.objectStore("DayTask");
    const request = store.put(dayTask); // `put` to allow updating existing data

    request.onsuccess = () => resolve(request.result);
    request.onerror = (event) => reject(event.target.error);
  });
}

export function addTimeFrame(db, timeFrame) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("TimeFrame", "readwrite");
    const store = transaction.objectStore("TimeFrame");
    const request = store.add(timeFrame);

    request.onsuccess = () => resolve(request.result);
    request.onerror = (event) => reject(event.target.error);
  });
}

export function getDayTask(db, date) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("DayTask", "readonly");
    const store = transaction.objectStore("DayTask");
    const request = store.get(date);

    request.onsuccess = () => resolve(request.result);
    request.onerror = (event) => reject(event.target.error);
  });
}

export function getTimeFramesByDate(db, date) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("TimeFrame", "readonly");
    const store = transaction.objectStore("TimeFrame");
    const index = store.index("day_task_date");
    const request = index.getAll(date);

    request.onsuccess = () => resolve(request.result);
    request.onerror = (event) => reject(event.target.error);
  });
}