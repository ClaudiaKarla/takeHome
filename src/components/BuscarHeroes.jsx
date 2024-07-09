import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

import Card from 'react-bootstrap/Card';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { RiSearchFill } from "react-icons/ri";

import React, { useEffect, useRef, useState } from 'react'
import Overlay from 'react-bootstrap/Overlay';
import { HeroesCard } from './HeroesCard';
import { useForm } from '../hooks/useForm';
import { getHeroesFromFirebase } from '../helpers/getHeroesFromFirebase';
import { useDispatch } from 'react-redux';
import { getHeroes } from '../helpers/getHero';


export const BuscarHeroes = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [show, setShow] = useState(false);
    const target = useRef(null);

const {q = ''} = queryString.parse(location.search);

const [filteredHeroes, setFilteredHeroes] = useState([]);
const showSearch = (q.length === 0);
const showError = (q.length > 0 ) && filteredHeroes.length === 0;

  const {searchText, onInputChange} = useForm({
   searchText: q
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (q.length > 0) {
        const bdFB = async () => {
            const hero = await getHeroesFromFirebase(q);
            setFilteredHeroes(hero);
        };
        bdFB();
    }
}, [q]);

  const onSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`?q=${searchText}`);
    dispatch(getHeroes(searchText));
  }

  return (
    <>
    <div className="row">
    <div className="col">
      <div className='lupaPrincipal'>
        <Button
          className="btn mt-2"
          variant="outlined"
          style={{fontSize:35, color:'transparent'}}
          ref={target} 
          onClick={() => setShow(!show)}
          >
           <RiSearchFill style={{marginRight:'22px', color:'#0a9396'}}/> 
         <span style={{color:'black'}}>Buscar</span>
        </Button>
        </div>

<div className='text-center'>
      <Overlay target={target.current} show={show} placement="left">
        {({
          placement: _placement,
          arrowProps: _arrowProps,
          show: _show,
          popper: _popper,
          hasDoneInitialMeasure: _hasDoneInitialMeasure,
          ...props
        }) => (
          <div
            {...props}
            style={{
              position: 'absolute',
              backgroundColor: 'rgba(23, 32, 42 , 0.8)',
              padding: '5px 10px',
              margin:'1%',
              color: 'white',
              borderRadius: 3,
              ...props.style,
            }}
          >
           <div className='tituloDeBusqueda'>
            <p className='text-center mt-3'>Buscar Heroes</p>
            </div>
                        <Form onSubmit={onSearchSubmit}>
                          <Form.Group className="mb-3">
                            <Form.Control type="text" 
                              style={ {backgroundColor:'#a8dadc' }}
                              placeholder="Heroes"
                              className="form-control"
                              name="searchText"
                              autoComplete="off"
                              value={ searchText }
                              onChange={ onInputChange }           
                            />
                          </Form.Group>
                                  <Button 
                                    variant="info"
                                    type="submit"
                                  >
                                    Buscar
                                  </Button>
                        </Form>
                              <div className="m-1">
                                <Card style={{width: '28rem'}}>      
                                    <div className="contenidoBuscar">
                                       
                                            <div className='alert text-center alert-primary m-1'
                                             style={{display: showSearch ? '' : 'none'}}
                                             >
                                             Escribe en el buscador el producto que deseas
                                            </div>
                                       
                                            <div 
                                            className='alert text-center alert-danger m-1'
                                            style={{display:showError?'':'none'}}
                                            >                                         
                                            No hay resultados de esa busqueda <b>{ q }</b>
                                            </div>

                                        <div className='cardBuscar'>
                                          <div className='contenidoBuscar'>
              
                                            {filteredHeroes.map(hero => (
                                     
                                            <HeroesCard
                                            key={hero.id}
                                            name={hero.name}
                                            thumbnail= {hero.thumbnail}
                                            description={hero.description}
                                            />
                                   
                                      ))}
                                         </div> 
                                         </div>
                                    </div>
                                </Card>     
                                </div>               
          </div>
        )}
          </Overlay> 
          </div>      
          </div>
    </div>                     
    </>
  )
}
