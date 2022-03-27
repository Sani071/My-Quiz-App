import React, { useCallback, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { QuizContext, QuizDispatchContext } from "../../context/QuizContext";
import { ListGroup, ListGroupItem } from "reactstrap";
import QuestionItemCard from "./questionItem";
// import update from 'immutability-helper';

export default function QuestionList() {
    let { id } = useParams();
    const { questionList } = useContext(QuizContext);
    const { getQuestionByQuiz } = useContext(QuizDispatchContext);
    useEffect(() => {
        getQuestionByQuiz(id);
    }, [id]);

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        // setCards((prevCards) => update(prevCards, {
        //     $splice: [
        //         [dragIndex, 1],
        //         [hoverIndex, 0, prevCards[dragIndex]],
        //     ],
        // }));
        console.log({ dragIndex, hoverIndex });
    }, []);

    const renderCard = useCallback((question, index) => {
        return (<QuestionItemCard key={question.id} index={index} title={question.title} moveCard={moveCard} />);
    }, []);

    return (
        <>
            <h4 className="text-center">All questions</h4>
            <hr />
            {questionList?.length > 0 ?
                <div>
                    <ListGroup>
                        {questionList.map((question, idx) => {
                            return <ListGroupItem className="mb-1 cursor-pointer" key={question.id}>
                                {renderCard(question, idx)}
                            </ListGroupItem>;
                        })}
                    </ListGroup>
                </div>
                : <span>loading...</span>}
        </>
    );
}
