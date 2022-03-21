import React, { useState } from 'react';
import { FormGroup, Input, Label, ListGroup, ListGroupItem } from 'reactstrap';
import { genUniqId } from '../../helper';

export default function CreateQuizForm() {
    const [quizTitle, setQuizTitle] = useState();
    const [quizOptions, setQuizOptions] = useState([]);
    const [quizOption, setQuizOption] = useState("");

    const [isMultiChoice, setIsMultiChoice] = useState();

    const handleQuizOptionSet = (event) => {
        if (event.key === "Enter" && event.target.value) {
            const quizOption = {
                title: event.target.value,
                id: genUniqId()
            }
            setQuizOptions([...quizOptions, quizOption]);
            setQuizOption("");
        }
    }
    return (
        <>
            <h1>Create Quiz</h1>
            <FormGroup>
                <Label htmlFor="quizTitle">Quiz Title</Label>
                <Input
                    placeholder="Quiz title"
                    id="quizTitle"
                    name="quizTitle"
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                />
            </FormGroup>
            <h3>Option List</h3>
            <FormGroup>
                <Label htmlFor="optionTitle">Option 1</Label>
                <Input
                    placeholder="Option title"
                    id="optionTitle"
                    name="optionTitle"
                    value={quizOption}
                    onKeyUp={handleQuizOptionSet}
                    onChange={(e) => setQuizOption(e.target.value)}

                />
            </FormGroup>
            <ListGroup>
                {quizOptions.map(option => <ListGroupItem key={option.id}>
                    {option.title}
                </ListGroupItem>)}
            </ListGroup>
            <FormGroup>
                <Label htmlFor="isMultiChoice">Multi choice</Label>
                <Input
                    id="isMultiChoice"
                    type="checkbox"
                    name="isMultiChoice"
                    checked={isMultiChoice}
                    onChange={e => setIsMultiChoice(e.target.checked)}
                />
            </FormGroup>
        </>
    );
}
