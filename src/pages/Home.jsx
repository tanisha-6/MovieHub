// UI for the home page
import { useEffect, useState} from 'react'
import MovieCard from '../components/MovieCard'
import '../css/Home.css'
import { searchMovies, getPopularMovies} from '../services/api'

function Home() {

  const [searchQuery, setSearchQuery] = useState('') //searchQuery- stores what is typed in the search-input box
  const [movies,setMovies] = useState([])
  
  //when loading api- setup 2 state
  const [error, setError] = useState(null) //to store potential error
  const [loading, setLoading] = useState(true) //to store the loading state


  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies()
        setMovies(popularMovies)
      }catch (err) {
        console.log(err)
        setError('Failed to load movies..')
      }
      finally {
        setLoading(false)
      }
    }
    loadPopularMovies()
  }, []) // to load the movies (once)


  const handleSearch = async (e) => {
    e.preventDefault() //after clicking button- the typed text stays (by defalut the page refreshes and the text is go)
    if (!searchQuery.trim()) return //trim- remove spaces (leading & trailing)
    if (loading) return //won't allow to search if we are already searching 

    setLoading(true)
    try {
        const searchResults = await searchMovies(searchQuery)
        setMovies(searchResults)
        setError(null)
      }catch (err) {
        console.log(err)
        setError('Failed to search movies..')
      }
      finally {
        setLoading(false)
      }
  } 


  return (
    <div className='home'>
      <form onSubmit={handleSearch} className='search-form'>
        <input 
          type='text' 
          placeholder='Search for movies..' 
          className='search-input'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} //allows you to type. So whenever you type something(on change) the setSearchQuery function updates the searchQuery state and the state automatically updates the page
        />
        <button type='submit' className='search-button'>Search</button>
      </form>

      <div className='movies-grid'>
        {movies.map(movie => (
          <MovieCard movie={movie} key={movie.id}/> //key- important
        ))}
      </div>

      {/* error handling :

      {error && <div className='error-message'>{error}</div>} 

      {loading ? (
        <div className='loading'>Loading...</div> 
      ): (
        <div className='movies-grid'>
          {movies.map(movie => (
            <MovieCard movie={movie} key={movie.id}/>
          ))}
        </div>
      )} */} 
  </div>
  )
}

export default Home