/* Header for Desktop */
import bell_icon_selected from '../../assets/newInterface/navbar/bell_icon_selected.svg';
import bell_icon_unselected from '../../assets/newInterface/navbar/bell_icon_unselected.svg';
import save_icon_selected from '../../assets/newInterface/navbar/save_icon_selected.svg';
import save_icon_unselected from '../../assets/newInterface/navbar/save_icon_unselected.svg';
import add_project_icon_selected from '../../assets/newInterface/navbar/add_project_icon_selected.svg';
import add_project_icon_unselected from '../../assets/newInterface/navbar/add_project_icon_unselected.svg';
import home_icon_selected from '../../assets/newInterface/navbar/home_icon_selected.svg';
import home_icon_unselected from '../../assets/newInterface/navbar/home_icon_unselected.svg';

import { useState, useEffect, useContext } from "react";
import sovall from "../../assets/common/sovall_2.svg";
import searchIcon from "../../assets/common/search_icon_white.svg";
import dotsMenu from "../../assets/common/dots_menu.svg";
import Search from "../../views/common/Search";
import SearchContext from "../../contexts/search-context";
import UserContext from "../../contexts/user";
import AuthContext from "../../contexts/auth-context";
import {useLocation, useNavigate } from "react-router-dom";


function TopNavBar(props) {
  const [currentFilter, setCurrentFilter] = useState(0);
  const [currentMenuOption, setCurrentMenuOption] = useState(3);
  const searchCtx = useContext(SearchContext);
  const userCtx = useContext(UserContext);
  const authCtx = useContext(AuthContext)

  const [showLogOutButton, setShowLogOutButton] = useState(false);
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
     // if at route /home, set currentMenuOption to 4
    if(location.pathname === '/home'){
      setCurrentMenuOption(4)
    }
  }, [])

  /*Hardtyped arrays*/
  const menuOptionsData = [
        [save_icon_unselected,save_icon_selected, 'comingsoon'],
        [add_project_icon_unselected,add_project_icon_selected, '/newproject'],
        [home_icon_unselected,home_icon_selected, '/']
  ];
  const filterOptionsData = []
    
  const handleMenuOptionSelected = (e) =>{
    const value = parseInt(e.currentTarget.value)
        // If profile page is selected, navigate to /profile
        if(value==4){
            navigate('/profile')
        } else{
            navigate(menuOptionsData[value][2])
        }
        // Update the current selected menu option
        setCurrentMenuOption(parseInt(value));
  }

  const menuOptions = menuOptionsData.map((item, i) => {
    const h = i === 1 ? "h-full" : "h-[80%]";
    const j = i === currentMenuOption ? 1 : 0;
    return (
      <button key={"menu-option-" + i} className={h} onClick={handleMenuOptionSelected} value={i}>
        <img className="w-7" src={item[j]} />
      </button>
    );
  });

  const onEnterButtonClicked = (e) => {
    // if (e.key === 'Enter') {
    //   searchCtx.updateEnterPressed();
    //   if(currentFilter === 1){
    //     console.log(searchCtx.query);
    //     navigate('/search/people')
    //   }
    //   else{
    //     console.log(searchCtx.query);
    //     navigate('/search/posts')
    //   }
    // }
  }

  const onLogOutClicked = () => {
    if(window.confirm("Are you sure you want to log out?")){
      authCtx.logout();
      navigate('/');
    }
  }

  const profilePicStyle = currentMenuOption === 4 ? "bg-yellow-2" : "";

  return (
    <div className="h-[5rem] w-full bg-green-6 px-7 py-1 flex flex-wrap gap-[0.3rem] items-center justify-center text-white drop-shadow-xl z-20">
      <div className="flex flex-1 items-center justify-left gap-6">
        <div className="flex items-center gap-2">
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
		<div className="flex flex-1 gap-8 justify-end items-center">
          {menuOptions}
          <a href="/profile">
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

export default TopNavBar;
