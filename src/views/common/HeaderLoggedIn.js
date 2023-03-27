/* Header for after LogIn */
import { useState, useEffect, useContext } from "react";
import arrowPrev from "../../assets/common/arrow_prev.svg";
import resources_plain from "../../assets/common/header_icon_1.svg";
import resources_selected from "../../assets/common/resources_selected.svg";

import rocket_plain from "../../assets/common/header_icon_2.svg";
import rocket_selected from "../../assets/common/rocket_selected.svg";
import saved_plain from "../../assets/common/header_icon_3.svg";
import saved_selected from "../../assets/common/saved_selected.svg";
import mainfeed_selected from "../../assets/common/header_icon_4.svg";
import mainfeed_plain from "../../assets/common/home_plain.svg";

import sovall from "../../assets/common/sovall_2.svg";
import searchIcon from "../../assets/common/search_icon_white.svg";
import dotsMenu from "../../assets/common/dots_menu.svg";
import Search from "./Search";
import SearchContext from "../../contexts/search-context";
import UserContext from "../../contexts/user";
import AuthContext from "../../contexts/auth-context";
import {useNavigate } from "react-router-dom";


function HeaderLoggedIn(props) {
  const [currentFilter, setCurrentFilter] = useState(0);
  const [currentMenuOption, setCurrentMenuOption] = useState(-1);
  const searchCtx = useContext(SearchContext);
  const userCtx = useContext(UserContext);
  const authCtx = useContext(AuthContext)

  const [showLogOutButton, setShowLogOutButton] = useState(false);
  const navigate = useNavigate();

  /*Hardtyped arrays*/
  const menuOptionsData = [
    [resources_plain, resources_selected, "/"],
    [rocket_plain, rocket_selected, "/"],
    [saved_plain, saved_selected, "/"],
    [mainfeed_plain, mainfeed_selected, "/mainfeed"],
  ];
  const filterOptionsData = [
    ["Posts", "/"],
    // ["Problem", "/"],
    // ["Solutions", "/"],
    // ["Resources", "/"],
    // ["Opportunities", "/"],
    ["People", "/"],
    // ["Other", "/"],
  ];

    
  const handleMenuOptionSelected = (e) =>{
    const value = parseInt(e.currentTarget.value)
    setCurrentMenuOption(parseInt(value));
    navigate('/mainfeed');
    console.log(e.currentTarget.value)
  }

  const menuOptions = menuOptionsData.map((item, i) => {
    const h = i === 1 ? "h-full" : "h-[80%]";
    const j = i === currentMenuOption ? 1 : 0;
    console.log("For menu " + i + " the value of j is " + j);
    return (
      <button key={"menu-option-" + i} className={h} onClick={handleMenuOptionSelected} value={i}>
        <img className="h-5" src={item[j]} />
      </button>
    );
  });

  /*Handlers*/
  const handleFilter = (e) => {
    const value = parseInt(e.target.value);
    setCurrentFilter(value);
    if(value===1){
      searchCtx.updateEnterPressed();
      navigate('/search/people');
    }
    if(value === 0){
      navigate('/mainfeed');
    }
  };

  /* Pill menu code */
  const filterOptions = filterOptionsData.map((item, i) => {
    const style =
      i === currentFilter ? "bg-white text-green-4" : "bg-green-7 text-white";
    return (
      <button
        key={"filter-option-" + i}
        value={i}
        className={
          "h-full rounded-full flex items-center text-[8pt] px-2 " + style
        }
        onClick={handleFilter}
      >
        {item[0]}
      </button>
    );
  });

  const onEnterButtonClicked = (e) => {
    if (e.key === 'Enter') {
      searchCtx.updateEnterPressed();
      if(currentFilter === 1){
        console.log(searchCtx.query);
        navigate('/search/people')
      }
      else{
        console.log(searchCtx.query);
        navigate('/search/posts')
      }
    }
  }

  const onLogOutClicked = () => {
    if(window.confirm("Are you sure you want to log out?")){
      authCtx.logout();
      navigate('/');
    }
  }

  const profilePicStyle = currentMenuOption === -1 ? "bg-yellow-2" : "";

  return (
    <div className="h-[5rem] w-full bg-green-6 px-7 py-1 flex gap-[0.3rem] items-center justify-center text-white drop-shadow-xl z-20">
      <div className="flex flex-1 items-center justify-left gap-6">
        <div className="flex items-center gap-2">
          <a href="/">
            <img className="h-3" src={arrowPrev} />
          </a>
          <a href="/">
            <img className="h-5" src={sovall} />
          </a>
        </div>
        <div className="flex">
          <Search
            onEnterButtonClicked = {onEnterButtonClicked} icon={searchIcon} placeholder="Search"
            placeholderColor="text-white" style="text-white border border-white"
            w="full" h="5"
          />
        </div>
      </div>
        <div className="flex flex-2 py-1 gap-4 items-center">{filterOptions}</div>
		<div className="flex flex-1 gap-8 justify-end items-center">
          {menuOptions}
          <a href="/">
            <img
              className={"w-8 rounded-full p-[0.05rem] " + profilePicStyle}
              src={userCtx.profilePicPath}
            />
          </a>
          <button className="h-full flex items-center">
            <img className="rounded-full h-fit" src={dotsMenu} onClick={() => setShowLogOutButton(!showLogOutButton)} />
          </button>
          {showLogOutButton && <button onClick={onLogOutClicked}>Logout</button>}
        </div>
    </div>
  

  );
}

export default HeaderLoggedIn;
