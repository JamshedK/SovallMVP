import bell_icon_selected from '../../assets/newInterface/navbar/bell_icon_selected.svg';
import bell_icon_unselected from '../../assets/newInterface/navbar/bell_icon_unselected.svg';
import save_icon_selected from '../../assets/newInterface/navbar/save_icon_selected.svg';
import save_icon_unselected from '../../assets/newInterface/navbar/save_icon_unselected.svg';
import add_project_icon_selected from '../../assets/newInterface/navbar/add_project_icon_selected.svg';
import add_project_icon_unselected from '../../assets/newInterface/navbar/add_project_icon_unselected.svg';
import home_icon_selected from '../../assets/newInterface/navbar/home_icon_selected.svg';
import home_icon_unselected from '../../assets/newInterface/navbar/home_icon_unselected.svg';
import example_image from '../../assets/newInterface/home/example_image.jpg';

import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import UserContext from '../../contexts/user';
const BottomNavBar = () => {
    const [currentMenuOption, setCurrentMenuOption] = useState(3);
    const profilePicStyle = currentMenuOption === 4 ? "border-[#F7B618]" : "border-[#044A54]";
    const userCtx = useContext(UserContext)
    const navigate = useNavigate()
    const menuOptionsArray = [
        [bell_icon_unselected, bell_icon_selected, '/comingsoon'],
        [save_icon_unselected,save_icon_selected, 'comingsoon'],
        [add_project_icon_unselected,add_project_icon_selected, '/newproject'],
        [home_icon_unselected,home_icon_selected, '/']
    ]

    const handleMenuOptionSelected = (e) =>{
        const value = parseInt(e.currentTarget.value)
        // If profile page is selected, navigate to /profile
        if(value==4){
            navigate('/profile')
        } else{
            navigate(menuOptionsArray[value][2])
        }
        // Update the current selected menu option
        setCurrentMenuOption(parseInt(value));
    }

    const menuOptions = menuOptionsArray.map((item, i) =>{
        const h = i === 1 ? "h-full" : "h-[80%]";
        const j = i === currentMenuOption ? 1 : 0;
        return (
            <button key={"menu-option-" + i} className={h} value={i} onClick={handleMenuOptionSelected}>
                <img className="w-7" src={item[j]} />
            </button>
          );
    })

    return (
            <div className='w-full flex flex-row justify-between px-8 py-3 bg-[#044A54]'>
                {menuOptions}
                <button value={4} onClick={handleMenuOptionSelected}>
                    <div className={"rounded-full h-7 w-7 border-2 " + profilePicStyle} >
                        <img 
                            className="rounded-full h-full w-full object-cover cursor-pointer" 
                            src={userCtx.profilePicPath} alt="Profile"
                        />
                    </div>
                </button>
            </div>
    )
}

export default BottomNavBar;