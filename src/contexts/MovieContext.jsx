import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {
  
  const [favorites,setFavorites] = useState ([])
  
  useEffect(() => {
    const storedFavs = localStorage.getItem('favorites')

    if (storedFavs) setFavorites(JSON.parse(storedFavs)) // Favs are stored in a list- coverted into Json string and stored in local storage(bcoz local storage can only store string) -- & when we want to read it in -- JSON.parse coverts it back into a js object/array - then set that as favorites
  },[])

  useEffect(() => {
    localStorage.setItem('favorites',JSON.stringify(favorites)) //convert array into string
  },[favorites]) //runs when favorites changes


  //3 operations: 1) to add  2)to remove  3)to check if favorite
  const addToFavorites = (moive) => {
    setFavorites(prev => [...prev,moive])
  }
  const removeFromFavorites = (movieId) => {
    setFavorites(prev => prev.filter(movie => movie.id !== movieId)) // creates new array- contain all movies that are not equal to the one that we want to remove
  }
  const isFavorite = (movieId) => {
    return favorites.some(movie => movie.id === movieId) //checks all movieIds in favorites - see if 1 of them is equal to movieId that we are looking at - it it is, return true - else false
  }

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  }

  
  return <MovieContext.Provider value={value}>
    {children}
  </MovieContext.Provider> //{childer can access everthing inside value -i.e favorites..isFavorite}
}

