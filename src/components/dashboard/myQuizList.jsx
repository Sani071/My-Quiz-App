import { Button } from "reactstrap";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { QuizContext } from "../../context/QuizContext";

export default function MyQuizList({ preview, visitor }) {
    const { quizList } = useContext(QuizContext);
    return (
        <>
            {!preview && !visitor &&
                <>
                    <div className="d-flex justify-content-between">
                        <h1>My Quiz List</h1>
                        <Link to="/create-quiz"><Button className="btn-primary">Create New</Button></Link>
                    </div>
                    <hr />
                </>
            }
            {visitor && <><h4>Play quiz by quiz category</h4><hr /></>}

            {
                quizList.length ? <ol>
                    {quizList.map(quiz =>
                        <li className="h4 px-2" key={quiz.id}>
                            <div className="d-flex justify-content-between">
                                <p className="text-truncate">{quiz.title}</p>
                                {visitor && <div> <Link to={`/quiz/${quiz.id}`}> <Button>Play</Button></Link></div>}
                            </div>
                        </li>
                    )}
                </ol> : !preview ? <h3 className="text-center">You do not have any quiz</h3> : ""
            }
        </>
    );
}
