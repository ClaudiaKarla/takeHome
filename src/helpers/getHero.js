import { addDoc, collection, getDocs, query, runTransaction, where } from "firebase/firestore";
import { setHeroe, startLoadingHeroes } from "../store/marvel/marvelSlice";
import { FirebaseDB } from "../firebase/config";


export const getHeroData = async() => {
    const url =`https://gateway.marvel.com:443/v1/public/characters?ts=0526&apikey=9db902ff00bb0731b41e5a585761c905&hash=d6a81a86fc19e8cfc0c1748cd9fbc92a` 

    try {
      const resp = await fetch(url);
      if (!resp.ok) {
          throw new Error(`HTTP error! status: ${resp.status}`);
      }
      const data = await resp.json();

      if (data && data.data && data.data.results) {
          const heroesData = data.data.results.map(hero => ({
              id: hero.id,
              name: hero.name,
              thumbnail: {
                  path: hero.thumbnail.path,
                  extension: hero.thumbnail.extension
              },
              description: hero.description || 'No tiene descripcion' 
          }));
          return heroesData;
      } else {
          console.error('Error: No se encontraron resultados válidos en la respuesta de la API');
          return [];
      }
  } catch (error) {
      console.error('Error en el getHero:', error.message);
      return [];
  }
}



export const  getHeroes = (name) => {
    return async(dispatch, getState) => {
        dispatch(startLoadingHeroes());

        try{
            const resp = await fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=0526&apikey=9db902ff00bb0731b41e5a585761c905&hash=d6a81a86fc19e8cfc0c1748cd9fbc92a`)
        const data = await resp.json();
        
        dispatch(setHeroe({heroes:data.data.results,name:name}))

        //para guardar los datos en Firestore
        const heroesColeccion = collection(FirebaseDB, 'heroes');
        await runTransaction(FirebaseDB, async (transaction) => {
        for(const hero of data.data.results) {
            //si un hero ya esta
            const heroQuery = query(heroesColeccion, where('name', '==', hero.name));
            const heroSnapshot = await getDocs(heroQuery);
            if(heroSnapshot.empty){
                await addDoc(heroesColeccion, {
                    name: hero.name,
                    description: hero.description,
                    thumbnail:`${hero.thumbnail.path}.${hero.thumbnail.extension}`
                })
            }else {
                console.log(`El héroe ${hero.name} ya existe en la base de datos.`);
            }
        }
        });
        return data.data.results;
        }catch(error){
            console.log('Error Fetch heroes', error);
            throw error;
        }
        
    }
}