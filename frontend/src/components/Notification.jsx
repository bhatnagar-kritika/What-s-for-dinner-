const Notification = ({ message, type }) => {
    if(!message) return null

    return(
        <div className={`p-4 mb-4 text-sm rounded-md ${type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
        </div>
    )
}

export default Notification