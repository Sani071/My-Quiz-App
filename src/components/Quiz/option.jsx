import React from "react";

export default function QuizOption({ title, bgClass }) {
    return (
        <>
            <div
                className={"quiz-option p-1 mb-2 cursor-pointer " + bgClass}>
                <h3 className="ms-2">{title}</h3>
            </div>
        </>
    );
}
