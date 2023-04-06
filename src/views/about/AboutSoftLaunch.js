import React, { useState} from 'react';
import Wheel from "./components/About.wheel";
import FounderInfo from "./components/About.FounderInfo";
import Header from './components/Header';
import sovall_main from '../../assets/common/sovall_main_2.svg';


const AboutSoftLaunch = (props) => {
    
    const aboutText = ["2022, spring semester at Ringling College of Art and Design: a conversation that sparked the creation of Sovall. I told my friend Elena about a transportation project I was working on for a neighborhood in Cleveland, Ohio, in collaboration with another good friend.",
        "It has been difficult for Elena, having lost her mother to cancer in 2021. She loves making art, but grief made her reexamine her choices. She thought she could be helping others more directly, just as her mother did as an accomplished professor and clinician. She has stunning artistic skills and, most importantly, a creative mind wholly open to new learning experiences and challenges. All of those elements indicate the immense, unimaginable potential she has. But she did not know where to start.",
        "She asked if she could be invited onto any projects I had ongoing. \"I want to help make the world a better place. Life is fragile - I want to do something that matters today. How do you come up with ideas for your projects?\"",
        "I told her, \"Look around! Any problem that bothers you probably bothers a lot of other people.The bigger the problem, the bigger the opportunity.\"",
        "The following Monday, in my Design for Business class, we had to identify a problem, devise a solution, and brand it. All of my classmates were designers and creative people. I noticed some of them needed help to come up with ideas. I decided to make that my project: Create an online community where members can identify real-world problems and work with each other to solve them.",
        "I chose the name Sovall because one of our approaches is root cause analysis. Many problems originate from a primary issue; if we don't identify and solve that, many secondary problems will always arise. By solving the root cause, so too can we address secondary problems: Sovall is the shorter version of \"Solve All\".",
        "I want to thank Mafer Bencomo Arevalo for help with making the first version of the phone app of Sovall and Rin Yokoi for her help with the demo video's music."
    ];
    const [currentF, setCurrentF] = useState(0);
    
    const handleFounderChange = () => {
        setCurrentF(prev => (prev + 1) % 4);
    };
   
    const about = aboutText.map(p => {
        return <p key={Math.random()}>{p}</p>
    });
    return (
        <div className="h-fit flex max-md:flex-col max-md:gap-4 md:pt-4 md:justify-center items-center select-none bg-green-2 overflow-auto">
                {/*Wheel*/}
            <div className="flex justify-center w-full max-md:h-[30rem] md:h-full md:w-1/2 ">
                    
                    <div className="absolute top-2 w-[20rem] h-[20rem] md:w-[14rem] md:h-[14rem] 2xl:w-[16rem] 2xl:h-[16rem] flex justify-center items-center ">
                        <div className="w-90% h-90% lg:h-52 lg:w-52 2xl:w-[15rem]  2xl:h-[15rem]  relative flex justify-center items-center">

                            <div className="absolute h-full w-full z-10 select-none ">
                                <Wheel current={currentF} handleClick={handleFounderChange} />
                            </div>

                            <div className="border border-green-5 h-80% w-80% rounded-full flex justify-center items-center z-0">
                                <img className="h-20 md:h-12 2xl:h-20" src={sovall_main} />
                            </div>
                        </div>
                    </div>
                    {/*Founder Info*/ }
                    <FounderInfo current={currentF} />
                    <a className="text-yellow-2 absolute bottom-4 max-md:hidden" href="mailto:info@sovall.com"> Reach out: info@sovall.com</a>
            </div>
                
                {/*Vision and Story*/ }
            <div className="w-85% md:w-1/2 md:h-full text-white flex 2xl:pl-32 md:overflow-auto scrollbar-hide">
                    <div className="w-fit pb-8 flex flex-col max-md:gap-6 md:gap-4 md:text-sm md:w-[80%] mt-7"> 
                        <div className="text-white border-b max-md:pl-2 flex flex-col gap-2">
                            <h1 className=" text-yellow-3 md:sticky md:top-0 bg-green-2 md:m-0 xl:text-[1.5rem]">Our Vision</h1>
                            <p className="max-md:ml-2 pb-2 ">
                                To help people have a good impact on the world, live fulfilled lives, and have an exciting future through their passion.
                            </p>
                        </div>
                        <div className="pb-4 max-md:pl-2 flex flex-col gap-2">
                                <h1 className="text-yellow-3 md:sticky md:top-0 bg-green-2 md:m-0 xl:text-[1.5rem]"> Our Story</h1>
                                <p className="text-sm xl:text-[1rem]">Hamid Mubariz, Founder</p>
                                <div className="flex flex-col gap-3 max-md:ml-2 md:pt-2 xl:text-[1rem]"> {about}</div>
                        </div>

                    </div>

                </div>

                <a className="text-yellow-2 py-5 w-full text-center md:hidden" href="mailto:info@sovall.com"> Reach out: info@sovall.com</a>
            </div>
        );
}

export default AboutSoftLaunch;