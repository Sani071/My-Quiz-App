import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-dropdown-select";
import {
    Button, FormGroup, Input, Label, ListGroup, ListGroupItem,
} from "reactstrap";
import { QuizContext, QuizDispatchContext } from "../../context/QuizContext";
import { genUniqId, isImageUrl } from "../../helper";
import MyQuizList from "./myQuizList";

export default function CreateQuizForm() {
    const { setQuizHandler, countQuestionByQuizId } = useContext(QuizDispatchContext);
    const { quizList } = useContext(QuizContext);

    const [quizTitle, setQuizTitle] = useState("");
    const [quizId, setQuizId] = useState("");
    const [questionTitle, setQuestionTitle] = useState("");
    const [options, setOptions] = useState([]);
    const [option, setOption] = useState("");
    const [correctOption, setCorrectOption] = useState();
    const [isFormValid, setIsFormValid] = useState(false);
    const [rewardPoint, setRewardPoint] = useState(1);
    const [isMultiChoice, setIsMultiChoice] = useState(false);

    /**
     * Handler for set option by Enter pressing.
     * 
     * @param {Object} event 
     */
    const handleOptionSet = (event) => {
        const title = event.target.value;
        if (event.key === "Enter" && title) {
            const option = {
                title,
                id: genUniqId(),
                isImage: isImageUrl(title)
            };

            setOptions([option, ...options]);
            // Clearing option input value to set new
            setOption("");
        }
    };

    /**
    * Handler for set correct option.
    * 
    * @param {string} optionId 
    */
    const onCorrectOptionSelection = (optionId) => {
        if (isMultiChoice) {
            setCorrectOption([...correctOption, optionId]);
        } else {
            setCorrectOption(optionId);
        }
    };

    /**
     * Handler for quiz type selection from existing quiz list
     * 
     * @param {Array} value 
     */
    const onExistingQuizSelect = (value) => {
        setQuizId(value[0]?.id);
        setQuizTitle("");
    };


    /**
     * set correct option as single if question is single choice otherwise make it multiple (array) 
     */
    useEffect(() => {
        if (isMultiChoice && !Array.isArray(correctOption)) {
            setCorrectOption(correctOption ? [correctOption] : []);
        } else if (!isMultiChoice && Array.isArray(correctOption) && correctOption.length) {
            setCorrectOption(correctOption?.pop());
        }
    }, [isMultiChoice, correctOption]);

    /**
     * Reset form handler
     */
    const resetFrom = () => {
        setQuestionTitle("");
        setOptions([]);
        setOption("");
        setQuizTitle("");
        setCorrectOption();
        setIsFormValid(false);
        setIsMultiChoice(false);
        setRewardPoint(1);
    };

    /**
     * Quiz creation handler
     */
    const createQuiz = () => {
        if (isFormValid) {

            const doSave = (quiz, order) => {
                const question = {
                    id: genUniqId(),
                    correctOption,
                    isMultiChoice,
                    options,
                    order,
                    quizId: quiz?.id || quizId,
                    title: questionTitle,
                    rewardPoint: parseInt(rewardPoint) > 0 ? +rewardPoint : 1
                };
                setQuizHandler(question, quiz?.id ? quiz : null);
                resetFrom();
            };
            if (quizTitle) {
                const quiz = {
                    id: genUniqId(),
                    title: quizTitle
                };
                doSave(quiz, 1);
            } else {
                countQuestionByQuizId(quizId, (value) => {
                    doSave(null, value + 1);
                });
            }

        } else {
            alert("Please provide required data for the quiz");
        }
    };

    /**
     * Setting form submit button status based on form required fields.
     */
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
                        <Label htmlFor="quizList">
                            Select from existing
                        </Label>

                        <Select
                            options={quizList}
                            labelField="title"
                            valueField="id"
                            disabled={quizList.length <= 0}
                            onChange={onExistingQuizSelect} />

                    </FormGroup>
                </div>
            </div>

            {/* Question Form */}
            <FormGroup>
                <Label htmlFor="questionTitle">Question Title *</Label>
                <Input
                    placeholder="Press Enter to add"
                    id="questionTitle"
                    name="questionTitle"
                    value={questionTitle}
                    required
                    onChange={(e) => setQuestionTitle(e.target.value)}
                />
            </FormGroup>

            <FormGroup>
                <Label htmlFor="rewardPoint">Reward Point</Label>
                <Input
                    placeholder="Reward point"
                    id="rewardPoint"
                    name="rewardPoint"
                    type="number"
                    min="1"
                    step="1"
                    value={rewardPoint}
                    required
                    onChange={(e) => setRewardPoint(e.target.value)}
                />
            </FormGroup>

            {/* Option section */}
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
                    <ListGroupItem color={correctOption?.includes(option.id) || option.id === correctOption ? "primary" : "secondary"} className="mb-2" key={option.id} onClick={() => onCorrectOptionSelection(option.id)}>

                        {option.isImage ? <img alt="loading.." src={option.title} /> : <p>{option.title}</p>}
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
