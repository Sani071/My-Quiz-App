import React, { createContext, useState } from "react";

// Create two context:
// QuizContext: to query the context state
// QuizDispatchContext: to mutate the context state
const QuizContext = createContext(undefined);
const QuizDispatchContext = createContext(undefined);

// A "provider" is used to encapsulate only the
// components that needs the state in this context
function QuizProvider({ children }) {
    const [quizList, setQuizList] = useState([]);
    const setQuizHandler = (quiz) => {
        setQuizList([quiz, ...quizList]);
    };

    return (
        <QuizContext.Provider value={quizList}>
            <QuizDispatchContext.Provider value={setQuizHandler}>
                {children}
            </QuizDispatchContext.Provider>
        </QuizContext.Provider>
    );
}

export { QuizProvider, QuizContext, QuizDispatchContext };