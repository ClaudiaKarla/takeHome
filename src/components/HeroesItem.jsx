import React from 'react'
import Card from 'react-bootstrap/Card';
import { startDeletingHeroes, startSaveActualizacion } from '../store/marvel/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveHeroe } from '../store/marvel/marvelSlice';

export const HeroesItem = ({id, name,  thumbnail, description}) => {

    const dispatch = useDispatch();
    const heroeActive = useSelector(state => state.marvel.active);

    const onDelete = () => {
        dispatch(startDeletingHeroes(id));
      }
    
      const onSave = () => {
        if (heroeActive && heroeActive.id === id) {
            dispatch(startSaveActualizacion());
        } else {
            console.error("No hay un héroe activo válido para guardar.");
        }
    }

    const onSetActive = () => {
      dispatch(setActiveHeroe({ id, name, thumbnail, description }));
    };

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
      <button onClick={onSetActive}>Seleccionar</button>
    </Card.Body>
    </div>
  </Card>


  )
}
