import { useState, useEffect } from "react"

export default function useCharacter(url){
 const [characters,setCharacters] = useState([])

 useEffect(()=>{
    fetch(url)
    .then(response => response.json())
    .then(data => setCharacters(data.results))
 },[url])
return characters
}