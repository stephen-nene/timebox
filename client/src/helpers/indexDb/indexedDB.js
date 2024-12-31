export const DB_NAME = "TimeBoxDB";
export const DB_VERSION = 1;

export function initializeDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains("DayTask")) {
        const dayTaskStore = db.createObjectStore("DayTask", { keyPath: "id" }); // id is the primary key
        dayTaskStore.createIndex("date", "date", { unique: true }); // For querying by date
        dayTaskStore.createIndex("sync", "sync", { unique: false }); // For querying unsynced tasks
        dayTaskStore.createIndex("timestamp", "timestamp", { unique: false }); // For purging old tasks
      }

      // Create TimeFrame object store
      if (!db.objectStoreNames.contains("TimeFrame")) {
        const timeFrameStore = db.createObjectStore("TimeFrame", {
          keyPath: "id",
          autoIncrement: true,
        });
        timeFrameStore.createIndex("day_task_id", "day_task_id", {
          unique: false,
        });
        timeFrameStore.createIndex("sync", "sync", { unique: false });
        timeFrameStore.createIndex("timestamp", "timestamp", {
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
    const request = store.put(dayTask); 

    request.onsuccess = () => resolve(request.result);
    request.onerror = (event) => reject(event.target.error);
  });
}

export function addTimeFrame(db, timeFrame) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("TimeFrame", "readwrite");
    const store = transaction.objectStore("TimeFrame");
    const request = store.put(timeFrame);

    request.onsuccess = () => resolve(request.result);
    request.onerror = (event) => reject(event.target.error);
  });
}


export function getDayTask(db, date) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("DayTask", "readonly");
    const store = transaction.objectStore("DayTask");
    const index = store.index("date"); // Use the date index
    const request = index.get(date); // Get all tasks for the given date

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

export function cleanUpOldData(db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("DayTask", "readwrite");
    const store = transaction.objectStore("DayTask");
    const request = store.getAll();

    request.onsuccess = () => {
      const oneWeek = 7 * 24 * 60 * 60 * 1000; // One week in ms
      const now = Date.now();
      const data = request.result;

      data.forEach((record) => {
        if (now - record.timestamp > oneWeek) {
          store.delete(record.date); // Delete stale records
        }
      });
      resolve();
    };

    request.onerror = (event) => reject(event.target.error);
  });
}
