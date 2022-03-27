import DB from "./IDB";

const onRequestError = (e) => {
    console.log("Database Error", e);
};

const quizStore = "quiz";
const questionStore = "question";

/**
 * storing quiz to IndexDB
 * @param {Object} quiz 
 */
export const setQuiz = (quiz) => {
    const request = DB();

    request.onerror = onRequestError;

    request.onsuccess = (e) => {
        const db = e.target.result;
        const transaction = db.transaction([quizStore], "readwrite");
        const store = transaction.objectStore(quizStore);
        store.add(quiz);
    };
};

/**
 * Retrieving quiz from IndexDB
 * @param {Object} quiz 
 */
export const getQuiz = (callback) => {
    const request = DB();

    request.onerror = onRequestError;

    request.onsuccess = (e) => {
        const db = e.target.result;
        const transaction = db.transaction([quizStore], "readonly");
        const store = transaction.objectStore(quizStore);
        store.getAll().onsuccess = (ev) => {
            callback(ev.target.result);
        };
    };
};

/**
 * storing question to IndexDB
 * @param {Object} quiz 
 */
export const setQuestion = (question) => {
    const request = DB();

    request.onerror = onRequestError;

    request.onsuccess = (e) => {
        const db = e.target.result;
        const transaction = db.transaction([questionStore], "readwrite");
        const store = transaction.objectStore(questionStore);
        store.add(question);
    };
};

/**
 * Retrieving question by quiz id from IndexDB
 * @param {Object} quiz 
 */
export const getQuestionByQuizId = (quizId, callback) => {
    const request = DB();

    request.onerror = onRequestError;

    request.onsuccess = (e) => {
        const db = e.target.result;
        const transaction = db.transaction([questionStore], "readonly");
        const store = transaction.objectStore(questionStore);
        store.getAll().onsuccess = (ev) => {
            const questions = ev.target.result;
            let payload = [];
            if (Array.isArray(questions)) {
                payload = questions.filter(question => question.quizId === quizId);
            }
            callback(payload);
        };
    };
};