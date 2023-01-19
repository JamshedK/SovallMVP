import React, { Component } from 'react';
function PenColor() {

    const colorData = [];
    for (let i = 0; i <15; i++) {
        colorData[i] = i+1;
    }

    const colors = colorData.map(color => {
        const bg = " bg-pen"+color;
        const style = "h-6 w-6 rounded-full" + bg;
        const id = "color" + color;
        return(
            <button id={id} className={style}/>
            );
    })
    return (
        <div className="h-40 w-1/2 bg-white  rounded-xl flex flex-col items-center px-6 pt-2 gap-3">
            <label className="text-green-1 font-bold">Pen color</label>
            <div className="w-fit grid grid-rows-3 grid-flow-col gap-3">
                {colors}
            </div>
            
        </div>
        );
}

export default PenColor;