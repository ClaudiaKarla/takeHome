import { collection, getDocs, query, where } from 'firebase/firestore';
import { FirebaseDB } from '../firebase/config';

export const getHeroesFromFirebase = async (searchText) => {
  const heroesCollection = collection(FirebaseDB, 'heroes');
  const q = query(heroesCollection, where('name', '>=', searchText), where('name', '<=', searchText + '\uf8ff'));
  const querySnapshot = await getDocs(q);
  const heroes = [];

  querySnapshot.forEach((doc) => {
    heroes.push({ id: doc.id, ...doc.data() });
  });

  return heroes;
};