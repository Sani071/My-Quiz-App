import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Button, FormGroup, Input, Label, ListGroup, ListGroupItem,
} from "reactstrap";
import { QuizContext, QuizDispatchContext } from "../../context/QuizContext";
import { genUniqId } from "../../helper";
import MyQuizList from "./myQuizList";

export default function CreateQuizForm() {
    const { setQuizHandler } = useContext(QuizDispatchContext);
    const { quizList } = useContext(QuizContext);

    const [quizTitle, setQuizTitle] = useState("");
    const [quizId, setQuizId] = useState("");
    const [questionTitle, setQuestionTitle] = useState("");
    const [options, setOptions] = useState([]);
    const [option, setOption] = useState("");
    const [correctOption, setCorrectOption] = useState();
    const [isFormValid, setIsFormValid] = useState(false);

    const [isMultiChoice, setIsMultiChoice] = useState(false);

    const handleOptionSet = (event) => {
        if (event.key === "Enter" && event.target.value) {
            const option = {
                title: event.target.value,
                id: genUniqId(),
            };

            setOptions([option, ...options]);
            setOption("");
        }
    };
    const onCorrectOptionSelect = (optionId) => {
        if (isMultiChoice) {
            setCorrectOption([...correctOption, optionId]);
        } else {
            setCorrectOption(optionId);
        }
    };

    const quizSelectionHandler = (e) => {
        setQuizId(e.target.value);
        setQuizTitle("");
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
        setQuestionTitle("");
        setOptions([]);
        setOption("");
        setCorrectOption();
        setIsFormValid(false);
        setIsMultiChoice(false);
    };

    const createQuiz = () => {
        if (isFormValid) {
            let quiz = null;
            if (quizTitle) {
                quiz = {
                    id: genUniqId(),
                    title: quizTitle
                };
            }

            const question = {
                id: genUniqId(),
                quizId: quiz?.id || quizId,
                correctOption,
                title: questionTitle,
                isMultiChoice,
                options,

            };
            setQuizHandler(question, quiz?.id ? quiz : null);
            resetFrom();
        } else {
            alert("Please provide required data for the quiz");
        }
    };

    useEffect(() => {

        if ((quizTitle || quizId) && questionTitle && options.length > 1) {
            if (Array.isArray(correctOption) && correctOption.length) {
                setIsFormValid(true);
            } else if (!Array.isArray(correctOption) && correctOption) {
                setIsFormValid(true);
            } else {
                setIsFormValid(false);
            }
        } else {
            setIsFormValid(false);
        }
    }, [questionTitle, quizId, quizTitle, options, correctOption]);

    return (
        <>
            <div className="text-end">
                <Link to="/dashboard"><Button className="btn-primary">Go Dashboard</Button></Link>
            </div>
            <h4 className="text-center">Create Quiz</h4>

            {/* Quiz Title section */}
            <div className="d-flex justify-content-between">
                <div className="w-50">
                    <FormGroup>
                        <Label htmlFor="quizTitle">Quiz title *</Label>
                        <Input
                            placeholder="Quiz title"
                            id="quizTitle"
                            name="quizTitle"
                            value={quizTitle}
                            required
                            onChange={(e) => {
                                setQuizTitle(e.target.value);
                                setQuizId("");
                            }}
                        />
                    </FormGroup>
                </div>

                <span className="mx-2">or</span>
                <div className="w-50">
                    <FormGroup>
                        <Label for="quizList">
                            Select from existing
                        </Label>
                        <Input
                            id="quizList"
                            name="select"
                            type="select"
                            value={quizId}
                            onChange={quizSelectionHandler}
                        >
                            <option disabled>select</option>
                            {quizList?.map(itm => <option key={itm.id} value={itm.id}>{itm.title}</option>)}
                        </Input>
                    </FormGroup>
                </div>
            </div>

            {/* Question Form */}
            <FormGroup>
                <Label htmlFor="questionTitle">Question Title *</Label>
                <Input
                    placeholder="Quiz title"
                    id="questionTitle"
                    name="questionTitle"
                    value={questionTitle}
                    required
                    onChange={(e) => setQuestionTitle(e.target.value)}
                />
            </FormGroup>
            <p className="fw-bold">Option List <small className="text-muted">(You have to add minimum 2 options)</small></p>
            <FormGroup>
                <Label htmlFor="optionTitle">Option {options.length + 1}</Label>
                <Input
                    placeholder="Press Enter to add"
                    id="optionTitle"
                    name="optionTitle"
                    value={option}
                    onKeyUp={handleOptionSet}
                    onChange={(e) => setOption(e.target.value)}
                />
            </FormGroup>
            {options.length ? <p>Click on the correct option(s) <small className="text-muted">(Have to select at least one)</small></p> : ""}
            <ListGroup>
                {options?.map((option) => (
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
