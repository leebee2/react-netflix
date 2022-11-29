import React, { useState, createContext } from "react";

export const StoreContext = createContext(null);

function StoreProvider ({children}) {
    const [keyword, setKeyword] = useState('');
    const [navShow, setNavShow] = useState(false);
    const [activePage, setActivePage] = useState(1);
    const [selectGenre, setSelectGenre] = useState(0);

    const store = {
        keyword: [keyword, setKeyword],
        navShow: [navShow, setNavShow],
        activePage: [activePage, setActivePage],
        selectGenre : [selectGenre, setSelectGenre]
    }

    return (<StoreContext.Provider value={store}>{children}</StoreContext.Provider>)
};

export default StoreProvider;

