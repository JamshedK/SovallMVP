// assets
import notification_icon from '../../../assets/newInterface/home/notification_icon.svg';
import downvote_icon from '../../../assets/newInterface/home/downvote_icon.svg';
import comment_icon from '../../../assets/newInterface/home/comment_icon.svg';
import save_icon from '../../../assets/newInterface/home/save_icon.svg';
import profile from '../../../assets/common/profile.jpg';



export const NewProjectLaptop = (props) => {
    return(
            <div className={"flex flex-row justify-between h-[20rem] rounded-3xl " + props.width}>
                {/* left */}
                <div className="px-8 bg-white bg-opacity-70 rounded-l-3xl h-full">
                    <div className='py-6 flex flex-col  justify-between h-full'>
                        <button>
                            <img className='w-7' src=''/>
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
        <div className="relative h-full w-full bg-[#3C9A9A] flex items-center justify-center h-screen">
            <div className={"flex flex-col justify-center rounded-xl bg-green w-full bg-white pl-3 pt-4 mx-2 pr-5"}>
                {/* username and profile NewProjectMobile */}
                <div className='flex flex-row space-x-1 text-[13px]'>
                    <div className="rounded-full h-5 w-5">
                        <img className="rounded-full h-full w-full object-cover cursor-pointer" src={profile} alt="Profile" />
                    </div>
                    <label className="">Jamshed Karimnazarov</label>
                </div>
                {/* project details */}
                <input className="font-medium pt-3 outline-none"placeholder='Project Title ... (35 characters)'></input>
                <div className='min-h-[10rem]'>
                    <textarea className='relative border-hidden pl-0 focus:ring-0' placeholder='Project Description'></textarea>
                </div>
                <hr className='border-gray-300 my-4'/>
                {/* collaborators */}
                <div>
                    <h1 className='text-center text-[12px] pb-2'>Project Collaborators</h1>
                    <div className='flex flex-row justify-between align-top min-h-[8rem] items-start'>
                        <input className='outline-none text-[11px]' placeholder='Add a collaborator'/>
                        <div className='px-3 pb-2 border-2 border-dashed text-[9px]'>
                            <input className='outline-none' placeholder='Post a recruitments notice'/>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-center text-[11px]'>   
                    <button type="submit" className='bg-[#00AAC1] py-1 px-2 rounded-2xl mb-5 flex justify-center w-15'>Start my project</button>
                </div>
            </div>
        </div>
    );
}
