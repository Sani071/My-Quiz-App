import { Button } from "reactstrap";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { QuizContext } from "../../context/QuizContext";

export default function MyQuizList({ preview }) {
    const quizList = useContext(QuizContext);
    return (
        <>
            {!preview && <div className="d-flex justify-content-between">
                <h1>My Quiz List</h1>
                <Link to="/create-quiz"><Button className="btn-primary">Create New</Button></Link>
                <hr />
            </div>}
            {quizList.length ? <ol>
                {quizList.map(quiz => <li className="h4" key={quiz.id}>{quiz.title}</li>)}
            </ol> : !preview ? <h3 className="text-center">You do not have any quiz</h3> : ""}
        </>
    );
}
