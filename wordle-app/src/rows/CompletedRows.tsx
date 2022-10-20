import SubmittedRow from "./SubmittedRow";

interface CompletedRowProps {
  guessedWords: string[],
}
  

const CompletedRows = ( { guessedWords }: CompletedRowProps ) => {

    return (
        <>
            {guessedWords.map((guess, index) => (
             <SubmittedRow guess={guess} key={index}/>
            ))}
        </>
    )
};

export default CompletedRows;