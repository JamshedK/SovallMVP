import { ProjectCard } from "./components/ProjectCard";

const NewHome = (props) => {
    // TODO: change the rems to make the website responsive for phones
    // const width = "w-[20rem] md:w-[24rem] lg:w-[28rem] xl:w-2/3";
    const width = "w-2/3";


    return (
            <div className="relative h-full w-full bg-[#3C9A9A]">
                <div className="flex flex-row justify-center mt-12">
                    <ProjectCard width={width}/>
                </div>
            </div>
            );
}

export default NewHome;