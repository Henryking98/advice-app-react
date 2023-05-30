import React, {useState, useEffect, useCallback} from 'react';

import './App.css';

const App = () => {
    const [advice, setAdvice] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAdviceHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://api.adviceslip.com/advice');

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();

            const transformAdvice = data.slip.advice;

            setAdvice(transformAdvice);
            setIsLoading(false);
        } catch (error) {
            setError(error.message);
            setAdvice('');
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchAdviceHandler();
    }, [fetchAdviceHandler]);

    return (
        <div className="app">
            <div className="card">
                {!isLoading && advice.length > 0 && <h1 className="heading">{advice}</h1>}
                {!isLoading && advice.length === 0 && !error && <p>Found no advice. Please check your connection and try again</p>}
                {isLoading && <p className="loadingText">Loading...</p>}
                {!isLoading && error && <p className="errorText">{error}</p>}
                <button className="button" onClick={fetchAdviceHandler}>
                    <span>Give me Advice</span>
                </button>
            </div>
        </div>
    )
}
export default App;