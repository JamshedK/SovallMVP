import { useSearchParams } from "react-router-dom";
import { ProjectInfo } from "./ProjectInfo";
import { where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { getDoc, doc, collection } from "firebase/firestore";
import ProductPageCommentArea from "./ProductPageComments";

const ProjectPageMain = (props) => {
    const [queryParameters] = useSearchParams()
    const [projectData, setProjectData] = useState(null) 
    const [commentCount, setCommentCount] = useState(0);
    const [upvotedCount, setUpvotedCount] = useState(0);
    const [downvotedCount, setDownvotedCount ] = useState(0);
    
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
    },[queryParameters])
    return (
        <div className="flex flex-col justify-top mt-12 w-full bg-[#3C9A9A] h-screen">
            {projectData && <ProjectInfo data={projectData}/>}
            {projectData && 
                <ProductPageCommentArea 
                    commentCount={commentCount}
                    setCommentCount={setCommentCount}
                    projectID={projectData.projectID}
                />}
        </div>
    )
}

export default ProjectPageMain;