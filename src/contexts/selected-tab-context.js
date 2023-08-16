import { createContext, useState } from "react";

const SelectedTabContext = createContext({
  selectedTab: "discussions",
  setSelectedTab: () => {},
});

export const SelectedTabContextProvider = (props) => {
    const [selectedTab, setSelectedTab] = useState("discussions");

    const contextValue = {
        selectedTab: selectedTab,
        setSelectedTab: setSelectedTab,
    };

    return (
        <SelectedTabContext.Provider value={contextValue}>
            {props.children}
        </SelectedTabContext.Provider>
    );
};

export default SelectedTabContext;
