import DB from "./IDB";

const onRequestError = (e) => {
    console.log("Database Error", e);
};

export const addQuiz = (quiz) => {
    const request = DB();

    request.onerror = onRequestError;

    request.onsuccess = (e) => {
        const db = e.target.result;
        const transaction = db.transaction(["quiz"], "readwrite");
        const store = transaction.objectStore("quiz");
        store.add(quiz);
    };
};

export const getQuiz = (callback) => {
    const request = DB();

    request.onerror = onRequestError;

    request.onsuccess = (e) => {
        const db = e.target.result;
        const transaction = db.transaction(["quiz"], "readonly");
        const store = transaction.objectStore("quiz");
        store.getAll().onsuccess = (ev) => {
            callback(ev.target.result);
        };
    };
};