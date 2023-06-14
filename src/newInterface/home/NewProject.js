// assets
import notification_icon from '../../assets/newInterface/home/notification_icon.svg';
import upvote_icon from '../../assets/newInterface/home/upvote_icon.svg';
import downvote_icon from '../../assets/newInterface/home/downvote_icon.svg';
import comment_icon from '../../assets/newInterface/home/comment_icon.svg';
import save_icon from '../../assets/newInterface/home/save_icon.svg';



const NewProject = (props) => {
    return(
            <div className={"flex flex-row justify-between h-[20rem] rounded-3xl " + props.width}>
                {/* left */}
                <div className="px-8 bg-white bg-opacity-70 rounded-l-3xl h-full">
                    <div className='py-6 flex flex-col  justify-between h-full'>
                        <button>
                            <img className='w-7' src={notification_icon}/>
                        </button>
                        <div className='flex flex-col space-y-2'>
                            <button>
                                <img className='w-7' src={upvote_icon}/>
                            </button>
                            <button>
                                <img className='w-7' src={downvote_icon}/>
                            </button>
                        </div>
                        <button>
                            <img className='w-7' src={comment_icon}/>
                        </button>
                        <button>
                            <img className='w-7' src={save_icon}/>
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

export default NewProject;