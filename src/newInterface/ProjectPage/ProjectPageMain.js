import { useSearchParams } from "react-router-dom";
import { ProjectInfo } from "./ProjectInfo";
import { where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { getDoc, doc, collection } from "firebase/firestore";

const ProjectPageMain = (props) => {
    const [queryParameters] = useSearchParams()
    const [projectData, setProjectData] = useState(null) 
    
    useEffect(() => {
        // Function to fetch the project data based on the props.id
        const fetchProjectData = async () => {
            const projectsRef = collection(db, 'projects');
            const querySnapshot = await getDoc(doc(projectsRef, queryParameters.get('id')));
            if (querySnapshot.exists()) {
                // The document with the given id exists, set the projectData state
                setProjectData({...querySnapshot.data(), "projectID": queryParameters.get('id')});
            } else {
                // Document with the given id doesn't exist
                alert('Unfortunately something went wrong. Please to go back. ')
            }
        };
        fetchProjectData();
    },[queryParameters])
    return (
        <div className="flex flex-row justify-center mt-12 w-full">
            {projectData && <ProjectInfo data={projectData}/>}
        </div>
    )
}

export default ProjectPageMain;