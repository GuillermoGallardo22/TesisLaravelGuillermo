import { useState } from "react";

const App = () => {
    const [count, setCount] = useState(0);

    return (
        <div className="App">
            <header className="App-header">
                <p>Hello Vite + React!</p>
            </header>
        </div>
    );
};

export default App;
