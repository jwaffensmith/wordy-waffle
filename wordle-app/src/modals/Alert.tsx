interface AlertProps {
    alertMessage: string,
}

const Alert = ( { alertMessage }: AlertProps ) => {
    return (
        <div className="container flex justify-center mx-auto">
            <div className="absolute inset-x-0 top-24 flex items-center justify-center">
                <div className="bg-zinc-800 text-white absolute
                rounded-lg text-700 p-4 mt-20" role="alert">
                    <p className="font-bold">{alertMessage}</p>
                </div>
            </div>
        </div>
    )
}

export default Alert; 