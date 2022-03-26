import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "reactstrap";
import QuizOption from "../../components/quiz/option";
import QuizTitle from "../../components/quiz/title";
import { QuizContext, QuizDispatchContext } from "../../context/QuizContext";

export default function QuizBoard() {
    let { id } = useParams();
    const { questionList } = useContext(QuizContext);
    const { getQuestionByQuiz } = useContext(QuizDispatchContext);
    const [isCorrectAnswer, setCorrectAnswer] = useState(false);
    const [answeredId, setAnsweredId] = useState();
    const [point, setPoint] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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
        if (questionList.length - 1 > currentQuestionIndex) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            reset();
        }
    };

    useEffect(() => {
        console.log("id ", id);
        getQuestionByQuiz(id);
    }, [id]);

    return (
        <>
            <h5 className="text-end pe-3">Your Point <span className="border d-inline-block p-2 rounded-circle border-info">{point}</span></h5>
            {
                questionList?.length ? [questionList[currentQuestionIndex]].map((quiz) => {
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
                    disabled={!answeredId || !(questionList.length - 1 > currentQuestionIndex)}
                    size="lg"
                    onClick={onNextHandler}>Next</Button>
            </div>
        </>
    );
}
