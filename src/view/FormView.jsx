import { DeleteOutline, SaveOutlined, UploadFileOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { useEffect, useRef } from 'react'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import { setActiveHeroe } from '../store/marvel/marvelSlice'
import { startDeletingHeroes, startSaveActualizacion } from '../store/marvel/thunks'

export const NoteView = () => {

const dispatch = useDispatch();

const {active:heroeActive, messageSaved, isSaving} = useSelector( state => state.marvel);

const {name, description, onInputChange, formState} = useForm(heroeActive);

const fileInputRef = useRef();

useEffect(() => {
    dispatch(setActiveHeroe(formState));
}, [formState]);

useEffect(() => {
    if(messageSaved.trim().length > 0){
        Swal.fire('Nota actualizada', messageSaved, 'success');
    }
}, [messageSaved]);

const onSave = () => {
    dispatch(startSaveActualizacion());
}

const onDelete = () => {
    dispatch(startDeletingHeroes());
}

  return (
  <div style={{overflow:'auto', maxHeight:'calc(100vh - 100px)' }}>
   <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{mb:1}}>
    <Grid container justifyContent='end'>
        <IconButton style={{ color:'#8338ec'}}
        disabled={isSaving}
        onClick={() => fileInputRef.current.click()}>
            <UploadFileOutlined style={{fontSize:'30', mr:1}}/>
        </IconButton>
    <Button disabled={isSaving} onClick={onSave} style={{ color:'#8338ec'}} sx={{padding:6}}> 
<SaveOutlined sx={{fontSize:30, mr:1}}/>
Guardar
    </Button>

    <Button onClick={onDelete}
                style={{ color:'#8338ec'}}>
                    <DeleteOutline style={{fontSize:'30'}}/>
                    Borrar
                </Button>
    </Grid>

    <Grid container style={{marginRight:'2%', backgroundColor:'rgba(31, 97, 141, 0.5)'}}>
<TextField type='text'   
           variant='filled' 
           fullWidth placeholder='Ingrese un nombre' 
           label='Nombre del Heroe' 
           sx={{border:'none', mb:1}}
           name="name"
           value={name}
           onChange={onInputChange}
           />

<TextField type='text' 
            variant='filled' 
            fullWidth 
            multiline 
            placeholder='Descripción del Evento' 
            minRows={3}
            name="description"
            value={description}
            onChange={onInputChange}/>
    </Grid>

   </Grid>
   </div>
  )
}
