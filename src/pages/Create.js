import React from 'react';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { ButtonGroup } from '@material-ui/core';
import { Container } from '@material-ui/core';
import AcUnitOutlinedIcon from '@material-ui/icons/AcUnitOutlined';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import {useState} from 'react';
import { Radio } from '@material-ui/core';
import { RadioGroup,FormControlLabel } from '@material-ui/core';
import { FormControl, FormLabel } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  field: {
    marginTop:20,
    marginBottom:20,
    display:'block'
  }
})

export default function Create() {

  const classes = useStyles()
  const history = useHistory()
  const [title,setTitle] = useState('');
  const [details,setDetails] = useState('')
  const [titleError,setTitleError] = useState(false);
  const [detailsError,setDetailsError] = useState(false);
  const [category,setCategory] = useState('todos')


  const handleSubmit = (e) =>{
    e.preventDefault()

    if(title && details && category) {
      console.log(title, details,category)
      fetch('https://material-ui-c76dd-default-rtdb.firebaseio.com/.json',{
        method:'POST',
        headers:{'Content-type': 'application/json'},
        body: JSON.stringify({
          details: details,
          category:category,
          title:title 
        })
      }).then(() => history.push('/'))
        
      
    }
    if(!title){
      setTitleError(true)
    }else{
      setTitleError(false)
    }
    if(!details){
      setDetailsError(true)
    }else{
      setDetailsError(false)
    }

    
  }

  return (
      <Container>
      <Typography 
        variant='h6'
        color='textSecondary'
        component='h2'
        gutterBottom>
        Create a new Note
      </Typography>
      <form noValidate autoComplete='off' onSubmit={handleSubmit}>
      <TextField 
          onChange={(e) => setTitle(e.target.value)}
          className={classes.field}
          label='Note Title' 
          variant='outlined'
          color='secondary'
          fullWidth
          required
          error={titleError}/>
      <TextField 
          onChange={(e) => setDetails(e.target.value)}
          className={classes.title}
          label='Details' 
          variant='outlined'
          color='secondary'
          multiline
          rows={4}
          fullWidth
          required
          error={detailsError}/>

          <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
            <FormControlLabel value='money' control={<Radio />} label='Money'/>
            <FormControlLabel value='todos' control={<Radio />} label='Todos'/>
            <FormControlLabel value='reminders' control={<Radio />} label='Reminders'/>
            <FormControlLabel value='work' control={<Radio />} label='Work'/>
          </RadioGroup>
          </FormControl>
    <Button
        className={classes.btn}
        onClick={() => console.log('you click me')} 
        type='submit'
        color='secondary'
        variant='contained'
        disableElevation
        endIcon={<KeyboardArrowRightIcon/>}>
          Submit
      </Button>
      </form>
      
      
      
      <br/>
     {/* <AcUnitOutlinedIcon/>
      <AcUnitOutlinedIcon color='secondary' fontSize='large'/>
      <AcUnitOutlinedIcon color='secondary' fontSize='small'/>
      <AcUnitOutlinedIcon color='action' fontSize='small'/>
      <AcUnitOutlinedIcon color='error' fontSize='small'/>
      <AcUnitOutlinedIcon color='secondary' fontSize='small'/>
      <Button type='submit' color='primary'>Submit</Button>
      <Button type='submit' color='secondary' variant='outlined'>Submit</Button>
      <ButtonGroup color='secondary' variant='contained'>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
  </ButtonGroup>*/}
  </Container>
  )
}
