import { useDispatch, useSelector } from "react-redux";
import { getHeroes, startDeletingHeroes, startNewHeroe, startSaveActualizacion } from "../store/marvel/thunks";
import { useEffect } from "react";
import { BuscarHeroes } from "./BuscarHeroes";
import { HeroesCard } from "./HeroesCard";
import { setActiveHeroe } from "../store/marvel/marvelSlice";
import { useForm } from "../hooks/useForm";

export const Marvel = () => {

  const dispatch =useDispatch();
  const {heroes, active:noteActive} = useSelector(state => state.marvel);

  const {formState} = useForm(noteActive);

  useEffect(() => {
    dispatch(getHeroes());
  }, [dispatch])


  const onClickNewHeroe = () => {
    dispatch(startNewHeroe());
  }

  useEffect(() => {
    dispatch(setActiveHeroe(formState));
  }, [formState]);

  return (
  <>
<h1 className="marvel">API Marvel</h1>

<div className="buscar">
<BuscarHeroes />
</div>

<button onClick={onClickNewHeroe}>Agregar</button>

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
