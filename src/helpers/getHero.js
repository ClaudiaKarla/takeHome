

export const getHero = async() => {
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
              description: hero.description
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