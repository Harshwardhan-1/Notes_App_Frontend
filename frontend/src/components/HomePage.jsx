import './HomePage.css';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
export default function HomePage({userData}){
    const [data,setData]=useState([]);
    const [title,setTitle]=useState('');
    const [content,setContent]=useState('');

        const fetchNotes=async()=>{
            try{
     const response=await axios.get('https://notes-app-backend-4sb5.onrender.com/api/notes/getAllNotes',{withCredentials:true});
       setData(response.data.getAllNotes);
            }catch(err){
                console.log(err);
            }
        };
        useEffect(()=>{
            fetchNotes();
        },[]);
    const handle=async(e)=>{
        e.preventDefault();
    const send={title,content};
    try{
    const response=await axios.post('https://notes-app-backend-4sb5.onrender.com/api/notes/addNotes',send,{withCredentials:true})
    if(response.data.message==="note add successfully"){
        alert('notes added successfully');
        fetchNotes();
        setTitle('');
        setContent('');
    }    
}catch(err){
    if(err.response?.data?.message=== 'make notes properly'){
        alert('fill detail properly');
    }
}
}




const handleDelete=async(_id)=>{
const send={_id};
try{
const response=await axios.post("https://notes-app-backend-4sb5.onrender.com/api/notes/deleteNotes",send,{withCredentials:true})
if(response.data.message=== 'findAndDelete'){
    alert('deleted succwessfully');
    fetchNotes();
}
}catch(err){
    if(err.response?.data?.message=== 'no id found'){
        alert('make sure you enter correct request');
    }
}
}
    return(
        <>
        <h1>Welcome to the notes group <p>{userData?.name}</p></h1>
        <form onSubmit={handle}>
    <input type="text" placeholder='Enter your title here' value={title} onChange={(e)=>setTitle(e.target.value)} />
    <input type="text" placeholder='Enter your content here' value={content} onChange={(e)=>setContent(e.target.value)} />
       <button type='submit'>Add Task</button>
        </form>



        {
            data.map((note)=>(
                <div key={note._id}>
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                    <button onClick={()=>handleDelete(note._id)}>Delete</button>
                    <button>Update</button>
                </div>
            ))
        }
        </>
    );
}