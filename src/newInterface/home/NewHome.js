import { useState, useEffect } from "react";
import { ProjectCard } from "./ProjectCard";
import NewProjectMobile from "./NewProjectMobile";
import {collection, query, where, getDocs, orderBy } from "firebase/firestore";
import {db} from '../../firebase-config';

const NewHome = (props) => {
    const width = "w-2/3";

    const [projectDataList, setProjectDataList] = useState([]) 

    // Get the user posts data
    useEffect(() => {
        const getProjects = async () =>{
            var projectDt = []
            const projectsRef = collection(db, "projects");
            const q = query(projectsRef, orderBy('publishedDate', "desc"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                projectDt.push({...doc.data(), "projectID": doc.id})
            });
            setProjectDataList(projectDt);
        }
        getProjects();
    },[])

    return (
            <div className="relative h-full w-full bg-[#3C9A9A] overflow-auto">
                <div className="flex flex-row justify-center mt-12">
                    <div className="flex flex-col space-y-2 md:space-y-4">
                        <NewProjectMobile/>
                        {projectDataList.length > 0 &&
                            projectDataList.map((project) => (
                                <ProjectCard key={project.projectID} data={project} width={width} />
                            ))}
                    </div>
                </div>
            </div>  
            );
}

export default NewHome;