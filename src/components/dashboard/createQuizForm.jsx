import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Button, FormGroup, Input, Label, ListGroup, ListGroupItem,
} from "reactstrap";
import { QuizDispatchContext } from "../../context/QuizContext";
import { genUniqId } from "../../helper";
import MyQuizList from "./myQuizList";

export default function CreateQuizForm() {
    const setQuiz = useContext(QuizDispatchContext);

    const [quizTitle, setQuizTitle] = useState("");
    const [quizOptions, setQuizOptions] = useState([]);
    const [quizOption, setQuizOption] = useState("");
    const [correctOption, setCorrectOption] = useState();
    const [isFormValid, setIsFormValid] = useState(false);

    const [isMultiChoice, setIsMultiChoice] = useState(false);

    const handleQuizOptionSet = (event) => {
        if (event.key === "Enter" && event.target.value) {
            const option = {
                title: event.target.value,
                id: genUniqId(),
            };

            setQuizOptions([option, ...quizOptions]);
            setQuizOption("");
        }
    };
    const onCorrectOptionSelect = (optionId) => {
        if (isMultiChoice) {
            setCorrectOption([...correctOption, optionId]);
        } else {
            setCorrectOption(optionId);
        }
    };

    useEffect(() => {

        if (isMultiChoice && !Array.isArray(correctOption)) {
            setCorrectOption(correctOption ? [correctOption] : []);
        }

        else if (!isMultiChoice && Array.isArray(correctOption) && correctOption.length) {
            setCorrectOption(correctOption?.pop());
        }
    }, [isMultiChoice, correctOption]);

    const resetFrom = () => {
        setQuizTitle("");
        setQuizOptions([]);
        setQuizOption("");
        setCorrectOption();
        setIsFormValid(false);
        setIsMultiChoice(false);
    };

    const createQuiz = () => {
        if (isFormValid) {
            const quiz = {
                id: genUniqId(),
                correctOption,
                title: quizTitle,
                isMultiChoice,
                options: quizOptions,

            };
            setQuiz(quiz);
            resetFrom();
        } else {
            alert("Please provide required data for the quiz");
        }
    };

    useEffect(() => {
        if (quizTitle && quizOptions.length > 1) {
            if (Array.isArray(correctOption) && correctOption.length) {
                setIsFormValid(true);
            } else if (!Array.isArray(correctOption) && correctOption) {
                setIsFormValid(true);
            }
        } else {
            setIsFormValid(false);
        }
    }, [quizTitle, quizOptions, correctOption]);

    return (
        <>
            <div className="text-end">
                <Link to="/dashboard"><Button className="btn-primary">Go Dashboard</Button></Link>
            </div>
            <h4 className="text-center">Create Quiz</h4>
            {/* <hr /> */}
            <FormGroup>
                <Label htmlFor="quizTitle">Quiz Title *</Label>
                <Input
                    placeholder="Quiz title"
                    id="quizTitle"
                    name="quizTitle"
                    value={quizTitle}
                    required
                    onChange={(e) => setQuizTitle(e.target.value)}
                />
            </FormGroup>
            <p className="fw-bold">Option List <small className="text-muted">(You have to add minimum 2 options)</small></p>
            <FormGroup>
                <Label htmlFor="optionTitle">Option {quizOptions.length + 1}</Label>
                <Input
                    placeholder="Press Enter to add"
                    id="optionTitle"
                    name="optionTitle"
                    value={quizOption}
                    onKeyUp={handleQuizOptionSet}
                    onChange={(e) => setQuizOption(e.target.value)}
                />
            </FormGroup>
            {quizOptions.length ? <p>Click on the correct option(s) <small className="text-muted">(Have to select at least one)</small></p> : ""}
            <ListGroup>
                {quizOptions.map((option) => (
                    <ListGroupItem color={correctOption?.includes(option.id) || option.id === correctOption ? "primary" : "secondary"} className="mb-2" key={option.id} onClick={() => onCorrectOptionSelect(option.id)}>

                        {option.title}
                    </ListGroupItem>
                ))}
            </ListGroup>
            <FormGroup>
                <Input
                    id="isMultiChoice"
                    type="checkbox"
                    name="isMultiChoice"
                    checked={isMultiChoice}
                    onChange={(e) => setIsMultiChoice(e.target.checked)}
                />
                <Label className="ms-2" htmlFor="isMultiChoice">Multi choice</Label>
            </FormGroup>
            <div className="text-center">
                <Button disabled={!isFormValid} onClick={createQuiz} color="primary">Create</Button>
            </div>
            <MyQuizList preview />
        </>
    );
}
