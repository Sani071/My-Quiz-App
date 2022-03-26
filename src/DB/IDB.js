const dbVersion = 1;

export default () => {
    const dbName = "Quiz";
    const request = indexedDB.open(dbName, dbVersion);

    request.onerror = (e) => {
        console.log(`Database error for ${dbName}`, e);
    };

    request.onsuccess = () => {
        console.log(`Database Opened for ${dbName}`,);
    };

    request.onupgradeneeded = (e) => {
        const db = e.target.result;
        db.createObjectStore("quiz", { autoIncrement: true });
        db.createObjectStore("question", { autoIncrement: true });
    };

    return request;
};