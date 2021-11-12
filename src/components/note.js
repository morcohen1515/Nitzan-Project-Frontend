const Note = ({note}) => {
    return (
        <div className="note">
            <span>{note.name}</span>
            <div className="note-footer"><p className="max-lines">{note.notetext}</p></div>
            <small>{note.date}</small>
            <br/>
            <button style={{width:"80px"}} type="button" className="btn btn-danger">מחק</button>
        </div>
    )
};

export default Note;