import React, { Component } from 'react';
function Interactor(props) {
    const data = props.data;
    const fields = data.field.map((field,i) => {
        return <label key={"field-"+i} className="text-gray-500 p-0">{field}</label>
    });
    return (
        <div className="flex flex-col items-center h-fit w-fit px-2">
            <img className="h-9 rounded-full" src={data.pic} />
            <label className="font-bold">{data.username}</label>
            <div className="flex flex-col">
                {fields}
            </div>
        </div>
        );
}

export default Interactor;