import { useState, useContext, useReducer, useMemo, useRef, useCallback } from "react";
import ThemeContext from '../context/ThemeContext'
import useCharacter from "../hooks/useCharacter";
import Search from "./Search";

function Characters() {
  const initialState = {favorites: []}
  const API = 'https://rickandmortyapi.com/api/character'
  const {theme, } = useContext(ThemeContext)
  const [search, setSearch ] = useState('')
  const searchInput = useRef(null)
  const characters=useCharacter(API)
  
  const favouriteReducer = (state, action) =>{
    switch(action.type){
      case 'ADD_TO_FAVOURITES':
        const notRepeated = state.favorites?.filter(character => character.name==action.payload.name)
        if(notRepeated.length==0){
          return {
            ...state,
            favorites: [...state.favorites, action.payload]
          }
        }else{
          return state
        }
      case 'REMOVE_FAVOURITE':{
        const newFavorites = state.favorites.filter(character=> character.id !== action.payload.id);
        return({
          ...state,
          favorites: newFavorites
        })
      }
      default:
        return state
      }
      }
  
  const [favoritesChars, dispatch] = useReducer(favouriteReducer, initialState )
      
  const handleAdd = (character)=>{
    dispatch({
      type:'ADD_TO_FAVOURITES',
      payload: character
    })
  }

  const handleRemove = (character)=>{
    dispatch({
      type:'REMOVE_FAVOURITE',
      payload: character
    })
  }
  
  
  const filteredChars = useMemo(()=>
    characters.filter(character=>{
      return character.name.toLowerCase().includes(search.toLowerCase())
      })
  ,[search, characters])

  
  const headerTheme = theme
  ? "bg-gray-200 text-black"
  : "text-blue-700 bg-black"
  
  
  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value)
  })

    return (
    <>
      <Search handleSearch={handleSearch} searchInput={searchInput} />
      <div className=" favorties h-50 ml-10 mr-10 mb-10 w-full flex gap-10">
        {favoritesChars.favorites.map(character =>(
          <div key={character.id} className="relative">
            <img src={character.image} alt="favorite character" className="rounded-full h-14 w-14"/>
            <button onClick={()=>{handleRemove(character)}} className="h-6 w-6 bg-red-400 text-white text-xs rounded-full absolute top-1 left-12" >╳</button>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
          {filteredChars.map((character) => (
            <div key={character.id} className="h-60 w-48 flex relative bg-image bg-[url('https://th.bing.com/th/id/OIP.Np_wq-bzfkL6E5c86pCCIgHaEK?pid=ImgDet&rs=1')]  rounded-xl"> 
              <h3 className={"absolute mt-[210px] w-full text-xs font-sans font-medium z-20 " + headerTheme}>{character.name}</h3>
              <img src={character.image} alt="character" className="rounded-full h-40 mx-auto self-center z-10"/>
              <div className="absolute h-1/2 w-full bg-gray-800 top-1/2 rounded-b-xl"></div>
              <svg onClick={()=>handleAdd(character)} className="z-10 absolute h-8 ml-36 mt-3 "xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#ffff" d="M287.9 0C297.1 0 305.5 5.25 309.5 13.52L378.1 154.8L531.4 177.5C540.4 178.8 547.8 185.1 550.7 193.7C553.5 202.4 551.2 211.9 544.8 218.2L433.6 328.4L459.9 483.9C461.4 492.9 457.7 502.1 450.2 507.4C442.8 512.7 432.1 513.4 424.9 509.1L287.9 435.9L150.1 509.1C142.9 513.4 133.1 512.7 125.6 507.4C118.2 502.1 114.5 492.9 115.1 483.9L142.2 328.4L31.11 218.2C24.65 211.9 22.36 202.4 25.2 193.7C28.03 185.1 35.5 178.8 44.49 177.5L197.7 154.8L266.3 13.52C270.4 5.249 278.7 0 287.9 0L287.9 0zM287.9 78.95L235.4 187.2C231.9 194.3 225.1 199.3 217.3 200.5L98.98 217.9L184.9 303C190.4 308.5 192.9 316.4 191.6 324.1L171.4 443.7L276.6 387.5C283.7 383.7 292.2 383.7 299.2 387.5L404.4 443.7L384.2 324.1C382.9 316.4 385.5 308.5 391 303L476.9 217.9L358.6 200.5C350.7 199.3 343.9 194.3 340.5 187.2L287.9 78.95z"/></svg>       
            </div>
              )
          )}
      </div>
    </>
  )
}

export default Characters