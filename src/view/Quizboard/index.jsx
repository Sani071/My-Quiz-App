import React, { useContext, useState } from "react";
import { Button } from "reactstrap";
import QuizOption from "../../components/quiz/option";
import QuizTitle from "../../components/quiz/title";
import { QuizContext } from "../../context/QuizContext";

export default function QuizBoard() {
    const quizList = useContext(QuizContext);
    const [isCorrectAnswer, setCorrectAnswer] = useState(false);
    const [answeredId, setAnsweredId] = useState();
    const [point, setPoint] = useState(0);
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);

    const reset = () => {
        setCorrectAnswer(false);
        setAnsweredId();
    };

    const validateAnswer = (answerId, correctAnswer) => {
        if (!answeredId) {
            setAnsweredId(answerId);
            const isCorrect = answerId === correctAnswer;
            setCorrectAnswer(isCorrect);
            setPoint(isCorrect ? point + 1 : point - 1);
        }
    };

    const onNextHandler = () => {
        if (quizList.length - 1 > currentQuizIndex) {
            setCurrentQuizIndex(currentQuizIndex + 1);
            reset();
        }
    };


    return (
        <>
            <span>{point}</span>
            {
                quizList?.length ? [quizList[currentQuizIndex]].map((quiz) => {
                    return <div key={quiz.id}>
                        <QuizTitle title={quiz.title} />

                        {quiz.options.map((option) =>
                            <div key={option.id}
                                onClick={() => validateAnswer(option.id, quiz.correctOption)}
                                aria-hidden="true"
                            >
                                <QuizOption
                                    isCorrectAnswer={answeredId === option.id && isCorrectAnswer}
                                    isItAnsweredId={answeredId}
                                    title={option.title}
                                    bgClass={answeredId ? answeredId === option.id && isCorrectAnswer ? "bg-success" : answeredId === option.id && !isCorrectAnswer ? "bg-danger" : "" : ""}
                                />
                            </div>
                        )}
                    </div>;
                })
                    : ""}

            <div className="text-center mt-3">
                <Button
                    disabled={!answeredId || !(quizList.length - 1 > currentQuizIndex)}
                    size="lg"
                    onClick={onNextHandler}>Next</Button>
            </div>
        </>
    );
}
