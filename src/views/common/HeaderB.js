/* Header for after LogIn */
import { useState, useEffect, useContext } from "react";
import arrowPrev from "../../assets/common/arrow_prev.svg";
import quick_1 from "../../assets/common/header_icon_1.svg";
import quick_2 from "../../assets/common/header_icon_2.svg";
import quick_3 from "../../assets/common/header_icon_3.svg";
import quick_4 from "../../assets/common/header_icon_4.svg";
import sovall from "../../assets/common/sovall_2.svg";
import profile from "../../assets/common/profile.jpg";
import searchIcon from "../../assets/common/search_icon_white.svg";
import dotsMenu from "../../assets/common/dots_menu.svg";
import Search from "./Search";
import SearchContext from "../../contexts/search-context";
import { useLocation, useNavigate } from "react-router-dom";


function HeaderB(props) {
  const [currentFilter, setCurrentFilter] = useState(0);
  const [enterPressed, setEnterPressed] = useState();
  const searchCtx = useContext(SearchContext);
  const navigate = useNavigate();

  /*Hardtyped arrays*/
  const quickAccessData = [
    [quick_1, "/"],
    [quick_2, "/"],
    [quick_3, "/"],
    [quick_4, "/mainfeed"],
  ];
  const filterOptionsData = [
    ["All", "/"],
    ["Problem", "/"],
    ["Solutions", "/"],
    ["Resources", "/"],
    ["Opportunities", "/"],
    ["People", "/"],
    ["Other", "/"],
  ];

  const quickAccess = quickAccessData.map((item, i) => {
    const h = i === 1 ? "h-full" : "h-[80%]";
    return (
      <a key={"quick-acces-" + i} className={h} href={item[1]}>
        <img className="h-5" src={item[0]} />
      </a>
    );
  });

  /*Handlers*/
  const handleFilter = (e) => {
    const value = parseInt(e.target.value);
    setCurrentFilter(value);
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
      if(currentFilter === 5){
        console.log(searchCtx.query);
        navigate('/search/people')
      }
      else{
        console.log(searchCtx.query);
        navigate('/search/posts')
      }
    }
  }

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
            onEnterButtonClicked = {onEnterButtonClicked}
            icon={searchIcon}
            placeholder="Search"
            placeholderColor="text-white"
            style="text-white border border-white"
            w="full"
			h="5"
          />
        </div>
      </div>
        <div className="flex flex-2 py-1 gap-4 items-center">{filterOptions}</div>
		<div className="flex flex-1 gap-8 justify-end items-center">
          {quickAccess}
          <a href="/">
            <img
              className="w-8 rounded-full bg-yellow-2 p-[0.05rem]"
              src={profile}
            />
          </a>
          <a className="h-full flex items-center" href="/">
            <img className="rounded-full h-fit" src={dotsMenu} />
          </a>
        </div>
    </div>
  );
}

export default HeaderB;
