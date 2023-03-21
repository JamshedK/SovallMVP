import React, { useContext } from 'react';
import SearchContext from '../../../contexts/search-context';
import { useNavigate } from 'react-router-dom';

function Interactor(props) {
    const data = props.data;
    const searchCtx = useContext(SearchContext)
    const navigate = useNavigate();
    const fields = data.field.map((field,i) => {
        return <label key={"field-"+i} className="text-gray-500 p-0">{field}</label>
    });
    const handProfilePicClicked = () => {
        searchCtx.UpdateQuery(data.username)
        navigate('/search/people');
    }
    return (
        <button className="flex flex-col items-center h-fit w-fit px-2" onClick={handProfilePicClicked}>
            <img className="h-9 rounded-full" src={data.pic} />
            <label className="font-bold">{data.username}</label>
            <div className="flex flex-col">
                {fields}
            </div>
        </button>
        );
}

export default Interactor;