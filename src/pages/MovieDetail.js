import  {useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

export const MovieDetail = () => {
  const params = useParams();
  const [movie, setMovie] = useState({});
  const image = movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`: "https://img.freepik.com/premium-vector/movie-background-film-frames-tape-reels-camera-video-illustrations-vector-movie-tape-cinema-film-cinematography-negative-filmstrip_80590-8801.jpg?w=740" ;

  useEffect(() => {
    async function fetchMovie(){
      const response = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=3940476344e0c898d841daf3c33b3755`)
      const json = await response.json()
      setMovie(json);
      
    }
    fetchMovie();

  }, [params.id])

  useEffect(() =>{
    document.title = `${movie.title} / Moovio`
  });

  
  return (
    <main>
      <section className="flex justify-around flex-wrap py-5">
        <div className="max-w-sm">
          <img className="rounded" src={image} alt={movie.title} />
        </div>
        <div className="max-w-2xl text-gray-700 text-lg">
          <h1 className="text-4xl font-bold my-3 text-centre lg:text-left">{movie.title}</h1>
          <p className="my-4 text-justify">{movie.overview}</p>
            { movie.genres ? (
                <p className="my-7 flex flex-wrap gap-2">
                { movie.genres.map((genre) => (
                  <span className="mr-2 border border-gray-200 rounded dark:border-gray-600 p-2" key={genre.id}>{genre.name}</span>
                )) }
              </p>
              ) : "" }

              <div className="flex items-center">
                  <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Rating star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  <p className="ml-2 text-gray-900 dark:text-white">{movie.vote_average}</p>
                  <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                  <span className=" text-gray-900">{movie.vote_count}</span>
              </div>

              <p className='my-4 text-left'>
                <span className='mr-2 font-bold'>Runtime:</span>
                <span>{movie.runtime} min</span>

              </p>
              <p className='my-4 text-left'>
                <span className='mr-2 font-bold'>Budget:</span>
                <span>${movie.budget}</span>

              </p>
              <p className='my-4 text-left'>
                <span className='mr-2 font-bold'>Revenue:</span>
                <span>{movie.revenue}</span>

              </p>
              <p className='my-4 text-left'>
                <span className='mr-2 font-bold'>Release Date:</span>
                <span>{movie.release_date}</span>

              </p>
              <p className='my-4 text-left'>
                <span className='mr-2 font-bold'>IMDB Code:</span>
                <a href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank" rel='noreferrer'>{movie.imdb_id}</a>

              </p>


        </div>
      </section>
    </main>
  )
}
