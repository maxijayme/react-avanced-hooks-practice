import React from 'react'

function Search({searchInput,handleSearch}) {
  return (
    <div className="Search mt-10 mb-10">
        <label for="filter" className='mr-4'>Search</label>
        <input type="text" name="filter" ref={searchInput} onChange={handleSearch} className="border "  />
      </div>
  )
}

export default Search