// assets
import notification_icon from '../../assets/newInterface/home/notification_icon.svg';
import upvote_icon from '../../assets/newInterface/home/upvote_icon.svg';
import downvote_icon from '../../assets/newInterface/home/downvote_icon.svg';
import comment_icon from '../../assets/newInterface/home/comment_icon.svg';
import save_icon from '../../assets/newInterface/home/save_icon.svg';



export const NewProjectLaptop = (props) => {
    return(
            <div className={"flex flex-row justify-between h-[20rem] rounded-3xl " + props.width}>
                {/* left */}
                <div className="px-8 bg-white bg-opacity-70 rounded-l-3xl h-full">
                    <div className='py-6 flex flex-col  justify-between h-full'>
                        <button>
                            <img className='w-7' src={upvote_icon}/>
                        </button>
                        <button>
                            <img className='w-7' src={downvote_icon}/>
                        </button>
                        <button>
                            <img className='w-7' src={comment_icon}/>
                        </button>
                    </div>
                </div>
                {/*  main screen */}
                <div className='flex flex-grow bg-white w'>

                </div>
                {/* collaborators */}
                <div className='px-2 py-4 w-52 bg-white bg-opacity-70 rounded-r-3xl h-full'>
                    <h1 className='font-inter text-xl font-medium'>Collaborators</h1>
                    <div className="flex items-center h-10">
                        <img className="rounded-full h-full" />
                        <div className="flex flex-col px-1">
                            <label className="text-[11pt]">Hamid Mubariz</label>
                            <label className="text-[9pt]">Designer</label>
                        </div>
                    </div>

                </div>
            </div>
    );
}

export const NewProjectMobile = (props) => {
    return (
        <div className={"flex rounded-xl justify-between bg-white w-full px-10 py-9 "}>
            {/* username, date, save and notification button */}
            <div className="flex flex-row justify-between text-xs w-full">
                <div className='flex flex-row'>
                    <img className="rounded-full h-full cursor-pointer"/>
                    <label className="">Jamshed Karimnazarov</label>
                    <label className=""> - </label>
                    <label className="">September, 2012</label>
                </div>
                <div className='flex flex-row'>
                    <button>
                        <img className='w-3' src={save_icon}/>
                    </button>
                    <button>
                        <img className='w-3' src={notification_icon}/>
                    </button>
                </div>
            </div>
        </div>
    );
}
