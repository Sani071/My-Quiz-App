import React from "react";
import {
    Routes,
    Route,
} from "react-router-dom";
import HomeScreen from "./view/Homescreen/index.jsx";
import CreateQuizForm from "./components/dashboard/createQuizForm.jsx";
import Dashboard from "./view/Dashboard/index.jsx";
import QuizBoard from "./view/Quizboard/index.jsx";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create-quiz" element={<CreateQuizForm />} />
                <Route path="/play-quiz" element={<QuizBoard />} />
                {/* <Route path="invoices" element={<Invoices />} /> */}
            </Routes>
        </div>
    );
}

export default App;
