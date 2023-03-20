import { useState, useEffect } from 'react';
import axios from 'axios';

interface SubmittedRowProps {
    guess: string,
  }

const SubmittedRow = ( { guess }: SubmittedRowProps ) => {

    const [ currentEvaluation, setCurrentEvaluation ] = useState([]);
 
    useEffect(() => {
        axios.post("/api/check-tiles", { guess: guess })
        .then((res) => {
        setCurrentEvaluation(res.data.evaluations);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        // eslint-disable-next-line
	}, []);

    return (
        <>
        {currentEvaluation.map((evaluation, index) => (
            <div className={`rounded-sm p-3 md:p-6 drop-shadow-xl submitted-tile border-solid border-2 animate-flip outline-slate-200 outline ${evaluation === "present" ? "bg-yellow-400 border-yellow-300" : ''} ${evaluation === "absent" ? "bg-gray-500 border-gray-400 " : ''} ${evaluation === "correct" ? "bg-green-600 border-green-400" : ''}`} data-testid={`submitted-tile-${index}-${guess[index]}`} key={index}>{guess[index]}</div> 
        ))}
    </>
    )
};

export default SubmittedRow;
