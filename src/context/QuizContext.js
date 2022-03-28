import React, { createContext, useEffect, useState } from "react";
import {
    getQuiz,
    setQuiz,
    setQuestion,
    getQuestionById,
    getQuestionByQuizId,
    countQuestionByQuizId,
    updateQuestionOrderByQuestionId,
    updateQuestionById
} from "../DB/useQuizIDB";

// Create two context:
// QuizContext: to query the context state
// QuizDispatchContext: to mutate the context state
const QuizContext = createContext(undefined);
const QuizDispatchContext = createContext(undefined);

// A "provider" is used to encapsulate only the
// components that needs the state in this context
function QuizProvider({ children }) {
    const [quizList, setQuizList] = useState([]);
    const [questionList, setQuestionList] = useState([]);

    const setQuizHandler = (question, quiz, updateId, cb) => {
        if (quiz) {
            setQuizList([quiz, ...quizList]);
            setQuiz(quiz, cb);
        }
        if (updateId) {
            updateQuestionById(question, updateId, cb);
        } else {
            setQuestion(question, updateId, cb);
        }
    };

    const getQuestionByQuiz = (quizId) => {
        getQuestionByQuizId(quizId, setQuestionList);
    };

    useEffect(() => {
        getQuiz((quiz) => setQuizList(quiz));
    }, []);

    return (
        <QuizContext.Provider value={{ quizList, questionList }}>
            <QuizDispatchContext.Provider
                value={{
                    setQuizHandler,
                    getQuestionByQuiz,
                    countQuestionByQuizId,
                    updateQuestionOrderByQuestionId,
                    getQuestionById,
                }}
            >
                {children}
            </QuizDispatchContext.Provider>
        </QuizContext.Provider>
    );
}

export { QuizProvider, QuizContext, QuizDispatchContext };
