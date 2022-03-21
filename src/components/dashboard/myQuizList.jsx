import { Button } from 'reactstrap';
import React from 'react';
import seeds from "../../seeds.json";

export default function MyQuizList() {
    return (
        <>
            <div className="d-flex justify-content-between">
                <h1>My Quiz List</h1>
                <Button className="btn-primary">Create New</Button>
            </div>
            <hr />
            <ol>
                {seeds.map(quiz => <li className="h4" key={quiz.id}>{quiz.title}</li>)}
            </ol>
        </>
    );
}
