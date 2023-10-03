import add_project_icon_selected from '../../assets/newInterface/navbar/add_project_icon_selected.svg';

import { useSearchParams } from "react-router-dom";
import { ProjectInfo } from "./ProjectInfo";
import { where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { getDoc, doc, collection } from "firebase/firestore";
import ProductPageCommentArea from "./ProductPageComments";
import { TabsMobile } from "../home/Tabs";
import Collaborators from "./Collaborators";

const ProjectPageMain = (props) => {
    const [queryParameters] = useSearchParams()
    const [projectData, setProjectData] = useState(null) 
    const [commentCount, setCommentCount] = useState(0);
    const [upvotedCount, setUpvotedCount] = useState(0);
    const [downvotedCount, setDownvotedCount ] = useState(0);
    const [updateStats, setUpdateStats] = useState()
    const [showCollab, setShowCollab] = useState(false)
    
    useEffect(() => {
        // Function to fetch the project data based on the props.id
        const fetchProjectData = async () => {
            const projectsRef = collection(db, 'projects');
            const querySnapshot = await getDoc(doc(projectsRef, queryParameters.get('id')));
            if (querySnapshot.exists()) {
                // The document with the given id exists, set the projectData state
                setProjectData({...querySnapshot.data(), "projectID": queryParameters.get('id')});
                setCommentCount(querySnapshot.data()?.commentCount ?? 0)
                setUpvotedCount(querySnapshot.data()?.upvotedCount ?? 0)
                setDownvotedCount(querySnapshot.data()?.downvotedCount ?? 0)
            } else {
                // Document with the given id doesn't exist
                alert('Unfortunately something went wrong. Please to go back. ')
            }
        };  
        fetchProjectData();
    },[queryParameters, updateStats])

    const showCollabComp = () => {
        return (
                <button 
                    className="bg-white rounded-l-xl"
                    onClick={()=>setShowCollab(true)}
                    >
                    <div className='flex flex-row gap-2 pr-2 pl-[1px]'>
                        <img className="w-5" src={add_project_icon_selected}/>
                        <h1>Project Collaborators</h1>
                    </div>
                </button>
        )
    } 
    return (
        <div className="">
            {projectData && 
                <div className="flex flex-col pt-8 w-screen items-center bg-[#3C9A9A] h-screen overflow-y-auto">
                    {/* Place the Collaborators component in the top-left corner */}
                    {props.isMobile && !showCollab && <div className='mb-2 ml-auto'>
                        {showCollabComp()}    
                    </div>}
                    {props.isMobile && showCollab && <div className="fixed top-20 right-0 z-50">
                        <Collaborators
                            isMobile={true}
                            collaborators={projectData.collaborators}
                            projectID={projectData.projectID}
                            setUpdateStats={setUpdateStats}
                            setShowCollab={setShowCollab}
                        />
                    </div>}                    
                    {!props.isMobile && <div className="fixed top-30 left-0 z-50">
                        <Collaborators
                            collaborators={projectData.collaborators}
                            projectID={projectData.projectID}
                            setUpdateStats={setUpdateStats}
                        />
                    </div>}
                    <ProjectInfo data={projectData}/>
                    <div 
                        className="flex flex-col mt-4 h-fit lg:max-w-[40%] w-full bg-white
                        md:rounded-t-lg lg:rounded-lg"
                    >
                        <TabsMobile data={projectData} projectID={projectData.projectID}/>
                        <ProductPageCommentArea 
                            setUpdateStats={setUpdateStats}
                            commentCount={commentCount}
                            setCommentCount={setCommentCount}
                            projectID={projectData.projectID}
                        />
                    </div>
                </div> 
            }
        </div>
    )
}

export default ProjectPageMain;