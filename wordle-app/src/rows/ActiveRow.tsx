interface ActiveRowProps{
    guess: string[],
    showAlert: boolean
}
  

const ActiveRow = ( { guess, showAlert }: ActiveRowProps ) => {

    return (
        <>
            {Array.from({length: 5}).map((_, index) => {
                return <div className={`border-4 border-x-slate-300 active-tile rounded-sm md:p-7 
                bg-gray-100 p-3 shadow-orange-300 shadow-2xl outline-1 outline-white ${showAlert === true ? "animate-shake" : ''}`} data-testid={`active-tile-${index}-${guess[index]}`} data-cy={`active-tile-${index}`}  tabIndex={index} key={index}>{guess[index]}</div> 
            })}
        </>
    )
};

export default ActiveRow;