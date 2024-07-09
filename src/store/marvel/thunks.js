import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { addHeroe, deleteHeroeById, savingNewHeroe, setActiveHeroe, setHeroe, setSavingHeroe, startLoadingHeroes, updateHeroe } from "./marvelSlice"
import { FirebaseDB } from "../../firebase/config";
 
// export const  getHeroes = (name) => {
//     return async(dispatch, getState) => {
//         dispatch(startLoadingHeroes());

//         try{
//             const resp = await fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=0526&apikey=9db902ff00bb0731b41e5a585761c905&hash=d6a81a86fc19e8cfc0c1748cd9fbc92a`)
//         const data = await resp.json();
        
//         dispatch(setHeroe({heroes:data.data.results,name:name}))

//         //para guardar los datos en Firestore
//         const heroesColeccion = collection(FirebaseDB, 'heroes');
//         data.data.results.forEach(async(hero) => {
//             //si un hero ya esta
//             const heroQuery = query(heroesColeccion, where('name', '==', hero.name));
//             const heroSnapshot = await getDocs(heroQuery);
//             if(heroSnapshot.empty){
//                 await addDoc(heroesColeccion, {
//                     name: hero.name,
//                     description: hero.description,
//                     thumbnail:`${hero.thumbnail.path}.${hero.thumbnail.extension}`
//                 })
//             }else {
//                 console.log(`El héroe ${hero.name} ya existe en la base de datos.`);
//             }
//         });
//         return data.data.results;
//         }catch(error){
//             console.log('Error Fetch heroes', error);
//             throw error;
//         }
        
//     }
// }

export const startNewHeroe = () => {
    return async(dispatch, getState) =>{
        dispatch(savingNewHeroe());

        const newHeroe = {
            name:'',
            description:''
        }

        const heroesCollection = collection(FirebaseDB, 'marvel/heroes');
        const newHeroDoc = doc(heroesCollection);
        await setDoc(newHeroDoc, newHeroe) ;

        newHeroe.id = newHeroDoc.id;

        dispatch(addHeroe(newHeroe));
        dispatch(setActiveHeroe(newHeroe));
    }  
}

//para actualizar
export const startSaveActualizacion = () => {
    return async(dispatch, getState) => {
        dispatch(setSavingHeroe());

        const {active: heroeActive} = getState().marvel;

         // Verificar si heroeActive es null o undefined
         if (!heroeActive || !heroeActive.id) {
            console.error("No hay un héroe activo para actualizar.");
            return;
        }

        const heroeToFireStore = {...heroeActive};
        delete heroeToFireStore.id;

        
        const docRef = doc(FirebaseDB, `marvel/heroes/${heroeActive.id}`);
        await setDoc(docRef, heroeToFireStore, {merge:true});

        dispatch(updateHeroe(heroeActive));
    }
}

//borrar un heroe
export const startDeletingHeroes = (id) => {
    return async(dispatch, getState) => {
        
        const docRef = doc(FirebaseDB, `marvel/heroes/${id}`);
        //para eliminar
        await deleteDoc(docRef);

        dispatch(deleteHeroeById(id));
       
    }
}