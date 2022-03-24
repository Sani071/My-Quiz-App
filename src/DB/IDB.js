const dbVersion = 1;

export default () => {
    const request = indexedDB.open("quiz", dbVersion);

    request.onerror = (e) => {
        console.log("Database Error", e);
    };

    request.onsuccess = () => {
        console.log("Database Opened");
    };

    request.onupgradeneeded = (e) => {
        const db = e.target.result;
        db.createObjectStore("quiz", { autoIncrement: true });
    };

    return request;
};