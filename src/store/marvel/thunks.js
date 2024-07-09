import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { addHeroe, deleteHeroeById, savingNewHeroe, setActiveHeroe, setHeroe, setSavingHeroe, startLoadingHeroes, updateHeroe } from "./marvelSlice"
import { FirebaseDB } from "../../firebase/config";
 
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