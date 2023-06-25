// assets
import notification_icon from '../../../assets/newInterface/home/notification_icon.svg';
import upvote_icon_disabled from '../../../assets/newInterface/home/upvote_icon_disabled.svg';
import downvote_icon from '../../../assets/newInterface/home/downvote_icon.svg';
import comment_icon from '../../../assets/newInterface/home/comment_icon.svg';
import save_icon from '../../../assets/newInterface/home/save_icon.svg';
import issue_icon from '../../../assets/newInterface/home/issue_icon.svg';
import recruiting_icon from '../../../assets/newInterface/home/recruiting_icon.svg';
import example_image from '../../../assets/newInterface/home/example_image.jpg';

import profile from '../../../assets/common/profile.jpg';

export const ProjectCard = (props) => {
    var buttonsArray = [issue_icon, recruiting_icon, comment_icon, downvote_icon, upvote_icon_disabled]
    const bottomButtons = buttonsArray.map((icon, i) => {
        return(
            <button>
                <img className='w-4' src={icon}/>
            </button>
        )
    })
    return (
        <div className={"flex flex-col rounded-xl justify-between bg-white w-full px-10 py-9 "}>
            {/* username, date, save and notification button */}
            <div className="flex flex-row justify-between text-xs w-full">
                <div className='flex flex-row space-x-1'>
                    <div className="rounded-full h-3 w-3">
                        <img className="rounded-full h-full w-full object-cover cursor-pointer" src={profile} alt="Profile" />
                    </div>
                    <label className="">Jamshed Karimnazarov</label>
                    <label className=""> - </label>
                    <label className="">September, 2012</label>
                </div>
                <div className='flex flex-row space-x-5'>
                    <button>
                        <img className='w-3' src={save_icon}/>
                    </button>
                    <button>
                        <img className='w-3' src={notification_icon}/>
                    </button>
                </div>
            </div>
            <h1 className='pt-2 pb-1 text-sm font-bold'>Attention Span</h1>
            {/* Text and image */}
            <div className='pl-2 text-[12px]'>
                {/* TODO: Control the paragraph length to 5 and add "see more" right after cropping the text in the same last line */}
                <p>
                    Heya, I just realized we are now a community of a hundred. yay! I was wondering if there could be better ways of 
                    increasing/improving attention span. I have tried a few things and wanted to share. Since I have a chill semester abroad 
                    I get to spend  I get to speak ... 
                </p>
                <button className="flex flex-row font-bold justify-end w-full">see more</button>
                <img className='rounded-xl pt-2' src={example_image}></img>
            </div>
            {/* Bottom buttons */}
            <div className='flex justify-between text-xs pt-4'>
                {bottomButtons}
            </div>
        </div>
    );
}
