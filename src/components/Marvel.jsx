import { useDispatch, useSelector } from "react-redux";
import { startNewHeroe } from "../store/marvel/thunks";
import { useEffect } from "react";
import { BuscarHeroes } from "./BuscarHeroes";
import { HeroesCard } from "./HeroesCard";
import { setActiveHeroe, setHeroe } from "../store/marvel/marvelSlice";
import { useForm } from "../hooks/useForm";
import { getHeroData } from "../helpers/getHero";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const Marvel = () => {

  const dispatch =useDispatch();
  const {heroes} = useSelector(state => state.marvel);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const heroesData = await getHeroData();
            return heroesData;
        } catch (error) {
            console.error('Error al obtener héroes:', error.message);
            return [];
        }
    };

    fetchData().then(heroesData => {
        dispatch(setHeroe({ heroes: heroesData, name: 'Marvel Heroes' }));
    });
}, [dispatch]);

if (heroes.length === 0) {
  return <p>Cargando héroes...</p>; 
}

  const onClickNewHeroe = () => {
    dispatch(startNewHeroe());
  }

  return (
  <>
<h1 className="marvel">API Marvel</h1>

<div className="buscar">
<BuscarHeroes />
</div>


<Form className="agregar">
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Nombre del Heroe</Form.Label>
        <Form.Control type="text" placeholder="nombre" className="formularios" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Descripción</Form.Label>
        <Form.Control as="textarea" rows={3} className="formularios"/>
      </Form.Group>
      <Button style={{width:'150px', backgroundColor:'#606c38'}} variant="primary" type="submit" onClick={onClickNewHeroe}>
        Agregar
      </Button>
    </Form>

  {
    heroes.map((heroe) => (
      <HeroesCard
      key={heroe.id}
      name={heroe.name}
      description={heroe.description}
      />
     
    ))
  }

  </>
  )
}
