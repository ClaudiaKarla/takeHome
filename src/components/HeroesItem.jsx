import React from 'react'
import Card from 'react-bootstrap/Card';
import { startDeletingHeroes, startSaveActualizacion } from '../store/marvel/thunks';
import { useDispatch } from 'react-redux';

export const HeroesItem = ({id, name,  thumbnail, description}) => {

    const dispatch = useDispatch();

    const onDelete = () => {
        dispatch(startDeletingHeroes(id));
      }
    
      const onSave = () => {
        dispatch(startSaveActualizacion(id));
      }

  return (
  
    <Card style={{width: '18rem', backgroundColor:'#faedcd'}} >
        <div className='container col-6'>
            <div className='image-container'>
    <Card.Img className='imagen'
    src={`${thumbnail.path}.${thumbnail.extension}`}
        />
        </div>
    <Card.Body style={{ textAlign: 'center', fontSize:'20px' }}>
      <Card.Title>{name}</Card.Title>
      <Card.Text>{description}</Card.Text>
      <button onClick={onDelete}>Borrar</button>
      <button onClick={onSave}>Actualizar</button>
    </Card.Body>
    </div>
  </Card>


  )
}
