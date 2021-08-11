import React,{useEffect,useState} from 'react'
import {Container, Grid} from '@material-ui/core';
import {Paper} from '@material-ui/core';
import NoteCard from '../components/NoteCard'
import { Note } from '@material-ui/icons';

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
    fetch('https://material-ui-c76dd-default-rtdb.firebaseio.com/'+id + '.json' ,{
      method: 'DELETE'
    })
    setNotes([...notes.filter(item => item.id != id)])
  }

  return (
    <Container>
      {/*<Grid container>
       <Grid item xs={12} sm={6} md={3}>
         <Paper>1</Paper>
       </Grid>
       <Grid item xs={12} sm={6} md={3}>
         <Paper>2</Paper>
       </Grid>
       <Grid item xs={12} sm={6} md={3}>
         <Paper>3</Paper>
       </Grid>
       <Grid item xs={12} sm={6} md={3}>
         <Paper>4</Paper>
       </Grid>
      </Grid>*/}

      <Grid container spacing={3}>
      {notes.map(item =>(
        <Grid item key={item.id} xs={12} md={6} lg={4}>
          <NoteCard note={item} handleDelete={handleDelete}/>
        </Grid>
      ))}
      </Grid>
      </Container>
  )
}
