export function getFromCache(audioId) {
  return openDatabase().then((db) => {
    const transaction = db.transaction("sampleStore", "readonly");
    const store = transaction.objectStore("sampleStore");
    const request = store.get(audioId);

    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        resolve(event.target.result ? event.target.result.blob : null);
      };
      request.onerror = (event) => reject(event.target.error);
    });
  });
}

export function openDatabase() {
  const dbName = "sampleDB";
  const storeName = "sampleStore";

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore(storeName, { keyPath: "id" });
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.errorCode);
    };
  });
}
