import React from "react";
import {
    Routes,
    Route,
} from "react-router-dom";
import QuizScreen from "./view/Quiz/index.jsx";
import HomeScreen from "./view/Homescreen/index.jsx";
import CreateQuizForm from "./components/dashboard/createQuizForm.jsx";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/create-quiz" element={<CreateQuizForm />} />
                <Route path="/view/:id" element={<QuizScreen />} />
                {/* <Route path="invoices" element={<Invoices />} /> */}
            </Routes>
        </div>
    );
}

export default App;
