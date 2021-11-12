import React, { Component } from 'react';
import axios from 'axios';
import NavbarUser from '../components/navbaruser';
import ReactLoading from 'react-loading';
import Note from './note';

export default class NoteBook extends Component {

    constructor(props){

        super(props);   

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeNoteText = this.onChangeNoteText.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
                
        this.state = {
            apartment: "",
            empty: false,
            note: [],
            loading: true,
            success: false,
            name: "",
            notetext: "",
        } 
    }

    async componentDidMount() {

        const apartmentName = this.props.location.pathname.split('/notebook/')[1];

        document.body.style = 'background: #f2EAEA';

        // let token = JSON.parse(localStorage.getItem("x-api-key"));

        // if(token) {
        //     axios.defaults.headers = {
        //         Authorization: token
        //     }
        // } else {
        //     delete axios.defaults.headers.Authorization;
        // }

        const nameapartment = {
            apart: apartmentName
        }

        await axios.post("http://localhost:5000/note/getnote", nameapartment)
        .then(res => {
            this.setState({note: res.data, loading: false, apartment: apartmentName})           
        })
        .catch(err => {
            this.setState({});
        })

    }
    
    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeNoteText(e) {
        this.setState({
            notetext: e.target.value
        });
    }

     async onSubmit(e) {

        e.preventDefault();

        const date = new Date();
        const newNote = {
            apartment: this.state.apartment,
            name: this.state.name,
            notetext: this.state.notetext,
            date: date.toLocaleDateString()
        }

        // let token = JSON.parse(localStorage.getItem("x-api-key"));

        // if(token) {
        //     axios.defaults.headers = {
        //         Authorization: token
        //     }
        // } else {
        //     delete axios.defaults.headers.Authorization;
        // }



        await axios.post("http://localhost:5000/note/addnote", newNote)
        .then(res => {
            this.setState({name: "", notetext: ""});
        })

        const nameapartment = {
            apart: this.state.apartment
        }

        await axios.post("http://localhost:5000/note/getnote", nameapartment)
        .then(res => {
            this.setState({note: res.data})           
        })
        .catch(err => {
            this.setState({});
        })
    }


    render() {
        return (
            <div>
               <NavbarUser/>
                <div className="container">  
                    <div>                    
                    {
                        this.state.loading 
                        ?
                                <div>
                                <div>
                                    <h5 style={{marginTop:"100px"}}>{this.state.apartment}</h5>
                                </div>
                                <form className="note new" onSubmit={this.onSubmit}> 
                                    <input
                                    type="text"
                                    class="form-control"
                                    placeholder="שם"
                                    className="input-name"
                                    required
                                    value={this.state.name}
                                    onChange={this.onChangeName}
                                    ></input>
                                    <textarea
                                    row='8'
                                    cols='10'
                                    placeholder='הקלד להכניס למחברת.'
                                    value={this.state.notetext}
                                    onChange={this.onChangeNoteText}
                                    ></textarea>
                                    <div className="note-footer">
                                        <input type="submit" value="שמור" className=" btn btn-success"/>
                                    </div>
                                </form>
                                <Loading/>
                            </div>
                        :
                            <div>
                                <div style={{marginBottom:'10px', marginTop:'10px'}}>
                                    <h5>{this.state.apartment}</h5>
                                </div>
                                <form className="note new" onSubmit={this.onSubmit}> 
                                    <input
                                    type="text"
                                    class="form-control"
                                    placeholder="שם"
                                    className="input-name"
                                    required
                                    value={this.state.name}
                                    onChange={this.onChangeName}
                                    ></input>
                                    <textarea
                                    row='8'
                                    cols='10'
                                    placeholder='הקלד להכניס למחברת.'
                                    value={this.state.notetext}
                                    onChange={this.onChangeNoteText}
                                    ></textarea>
                                    <div className="note-footer">
                                        <input type="submit" value="שמור" className=" btn btn-success"/>
                                    </div>
                                </form>
                                <br/> 

                                {
                                    this.state.note.length === 0 && <Empty/>
                                }

                            </div>                      
                    }
                    <NoteList notes={this.state.note}/>
                    </div>
                </div>
            </div>
        )
    }
}

const NoteList = ({notes}) => {
    return  <div className="notes-list">  
                {notes.slice(0).reverse().map((note, i) => (
                    <div key={i}>
                        <Note note={note}/>
                    </div>
                ))}
            </div>
}


const Empty = () => { 
    return <div>
        <br/>
       <h6 style={{color:'rgba(255, 99, 132, 1)', textAlign:"center=-"}}>The Note Book is empty</h6>
    </div>
}

const Loading = () => {
    return <div>
        <div style={{ display: "flex", justifyContent: "center"}}>
            <ReactLoading type={"bubbles"} color={"black"} height={'10%'} width={'10%'} />
        </div>
    </div>
}
