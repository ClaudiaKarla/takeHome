import { createSlice } from '@reduxjs/toolkit';

export const marvelSlice = createSlice({
name: 'marvel',
initialState: {
    isSaving:false,
    messageSaved:'',
    heroes:[],
    isLoading:false,
    active:null, 
},
reducers: {
    setHeroe: (state,  action ) => {
        state.heroes = action.payload.heroes;
        state.name = action.payload.name;
    },
    startLoadingHeroes:(state) =>{
        state.isLoading = true;
    },
   addHeroe: (state,  action ) => {
    //agregar el heroe solo si no esta ya en la lista
    const newHero = action.payload;
    const yaExiste = state.heroes.some(hero => hero.id === newHero.id);
    if(yaExiste){
        state.heroes.push(newHero);
    }
    state.isSaving = false;
    },
    setActiveHeroe:(state, action) => {
        state.active = action.payload;
    },
    savingNewHeroe: (state) => {
        state.isSaving = true;
    },
    setSavingHeroe: (state) => {
        state.isSaving = true;
        state.messageSaved = '';
    },
    updateHeroe: (state,  action ) => {
        state.isSaving = false;
        state.heroes = state.heroes.map(heroe => 
            heroe.id === action.payload.id ? action.payload : heroe
        );
        state.messageSaved = `${action.payload.name}, actualizado correctamente`;
    },
    deleteHeroeById: (state,  action ) => {
        state.active = null;
        state.heroes = state.heroes.filter(heroe => heroe.id !== action.payload);
    },
    clearHeroeLogout:(state) => {
        state.isSaving = false;
        state.messageSaved = '',
        state.heroes = [];
        state.active = null;
    },
}
});
// Action creators are generated for each case reducer function
export const { 
setHeroe,
startLoadingHeroes,
addHeroe,
setActiveHeroe,
savingNewHeroe,
setSavingHeroe,
updateHeroe,
deleteHeroeById,
clearHeroeLogout
 } = marvelSlice.actions;