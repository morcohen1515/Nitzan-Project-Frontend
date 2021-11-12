// import {useState} from 'react';
// //import axios from 'axios';

// const AddNote = () => {

//     const [name, setName] = useState('');
//     const [noteText, setNoteText] = useState('');
//     const [success, setSuccess] = useState(false);

//     const handleChangeName = (event) => {
//         setName(event.target.value);
//     }

//     const handleChangeNoteText = (event) => {
//         setNoteText(event.target.value);
//     }

//     async function handleSaveClick() {

//         const date = new Date();
//         const newNote = {
//             name: name,
//             text: noteText,
//             date: date.toLocaleDateString()
//         }

//         // let token = JSON.parse(localStorage.getItem("x-api-key"));

//         // if(token) {
//         //     axios.defaults.headers = {
//         //         Authorization: token
//         //     }
//         // } else {
//         //     delete axios.defaults.headers.Authorization;
//         // }



//         // await axios.post("http://localhost:5000/users/getappartments", newNote)
//         // .then(res => {
//                 //setSuccess(true)
//         // })
//     }

//     return (
//         <div className="note new">
//             <input
//             type="text"
//             class="form-control"
//             placeholder="שם"
//             className="input-name"
//             required
//             value={name}
//             onChange={handleChangeName}
//             ></input>
//             <textarea
//             row='8'
//             cols='10'
//             placeholder='הקלד להכניס למחברת.'
//             value={noteText}
//             onChange={handleChangeNoteText}
//             ></textarea>
//             <div className="note-footer">
//                 <small>200 Remaining</small>
//                 <button className="save-note" type="button" onClick={handleSaveClick} class="btn btn-success">שמור</button>
//             </div>

//         </div>
//     )
// }

// export default AddNote;