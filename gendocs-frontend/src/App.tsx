import Login from "pages/public/Login";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
