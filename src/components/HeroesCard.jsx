import React, { useEffect, useState } from 'react'

import { HeroesItem } from './HeroesItem';
import { getHero } from '../helpers/getHero';
import { Grid } from '@mui/material';

export const HeroesCard = ({heroe}) => {

    const [ heroes, setHeroes] = useState([]);

    useEffect(() => {
        const getHeroesData = async () => {
            try {
                const heroesData = await getHero();
                setHeroes(heroesData);
            } catch (error) {
                console.error('Error al obtener datos de los héroes:', error.message);
            }
        };

        getHeroesData();
    }, []);

  return (
    <>
    <div>{heroe}</div>
    <Grid container spacing={3} style={{padding:'20px'}}>
    {
        heroes.map((hero) => (
            <Grid item key={hero.id} xs={12} sm={6} md={4} lg={3}>
            <HeroesItem
            name={hero.name}
            thumbnail= {hero.thumbnail}
            description={hero.description}
            />
            </Grid>
        ))
    }
     </Grid>
  
    </>
  )
}
