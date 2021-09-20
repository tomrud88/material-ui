import React,{useEffect,useState} from 'react'
import {Container, Grid} from '@material-ui/core';
import {Paper} from '@material-ui/core';
import NoteCard from '../components/NoteCard'
import { Note } from '@material-ui/icons';
import Masonry from 'react-masonry-css';

export default function Notes() {

  const [notes,setNotes] = useState([])
  const [error,setError] = useState()

  useEffect(()=>{
    const fetchList = async() =>{
     const response = await fetch('https://material-ui-c76dd-default-rtdb.firebaseio.com/.json')
     
     if(!response.ok){
      throw new Error('something went wrong')
    }

    const data = await response.json();
    
     let loadedItems = [];

     for(const key in data){
       loadedItems.push(
       {
         id: key,
         title: data[key].title,
         details: data[key].details,
         category: data[key].category
       })
     }
       setNotes(loadedItems)
    }
    fetchList().catch(error =>{
      setError(error.message);
   })

  },[])

  const handleDelete = async(id) =>{
    fetch('https://material-ui-c76dd-default-rtdb.firebaseio.com/'+ id + '.json' ,{
      method: 'DELETE'
    })
    setNotes([...notes.filter(item => item.id != id)])
  }

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
  }

  return (
    <Container>
      <Masonry
      breakpointCols={breakpoints}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
      >
      {notes.map(item =>(
        <div item key={item.id}>
          <NoteCard note={item} handleDelete={handleDelete}/>
        </div>
      ))}
      </Masonry>
      </Container>
  )
}
