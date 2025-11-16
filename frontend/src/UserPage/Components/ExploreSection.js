import React, { useEffect, useState } from "react";
import axios from 'axios'

import { Search, SearchCheckIcon } from "lucide-react";
import SuggestionProfile from "./SuggestionProfile.js";
const ExploreSection = () => {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState([]);
const [suggestions,setSuggestions]=useState([]);
const [error,setError] =useState(false)

  const handleSearch = () => {
    const filtered = suggestions.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
    setSearched(true);
  };

 
  useEffect(()=>{
    const getSuggestions=async()=>{
      
      try{
const result= await axios.get('http://localhost:8585/users/suggestions',{
        withCredentials:true
      })
      
      if(result.status===200){
       
        setSuggestions(result.data.suggestions);
       
      }
      }
      catch(error){
        console.log("error occured ")
        setError(true);
      }
    }
    getSuggestions();
  },[]);
  return (
    <div className="px-4 py-6 w-full mx-auto text-gray-900 dark:text-gray-100 h-screen">
      <div className="flex items-center gap-2 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts..."
          className="w-full text-sm sm:flex-1 px-3 py-2 rounded-md border dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="w-fit sm:w-auto bg-blue-600 text-white px-2 py-1  rounded-md hover:bg-blue-700 transition duration-200"
        >
         <Search/>
        </button>
      </div>

      {!searched && (
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(100px,_1fr))] gap-4 justify-items-center">
           {
            suggestions.map(user=>
              <SuggestionProfile key={user._id} profileId={user._id} username={user.username} profileImg={user.avatar}/>
            )
           }
        </div>
      )}

      {searched && (
        <div>
          <h3 className="text-xl font-medium mb-3">Search Results</h3>
          {results.length > 0 ? (
            <ul className="space-y-3">
              {results.map((post) => (
                <li
                  key={post.id}
                  className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  {post.title}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 dark:text-gray-400 italic">
              No results found for "<span className="font-medium">{query}</span>".
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ExploreSection;
