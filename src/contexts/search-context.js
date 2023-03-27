import { createContext, useState } from "react";
/*  
 * For storing search value as it will be used in different routes. Context API looses teh value when switching 
 * to a different route, so storing it in local storage and then retreieve it
 */
const SearchContext = createContext({
    query: " ",
    enterPressed: false,
    UpdateQuery: () => {},
    updateEnterPressed: () => {}
})
export const SearchContextProvider = (props) => {
    // TODO: Storing search query in local storage is a temporary solution. Try find another fix
    const storedQuery= localStorage.getItem('searchQuery');
    const storedEnterPressed = localStorage.getItem('enterPressed')
    const [query, setquery] = useState(storedQuery);
    const [enterPressed, setEnterPressed] = useState(storedEnterPressed);


    const UpdateQuery = (newQuery) => {
        setquery(newQuery);
        localStorage.setItem('searchQuery', newQuery);

    }
    const updateEnterPressed = () => {
        setEnterPressed(!enterPressed)
        localStorage.setItem('enterPressed', enterPressed);
    }
    

    const contextValue = {
        query: query,
        enterPressed: enterPressed,
        UpdateQuery: UpdateQuery,
        updateEnterPressed: updateEnterPressed
    }

    return <SearchContext.Provider value={contextValue}>{props.children}</SearchContext.Provider>
}

export default SearchContext;