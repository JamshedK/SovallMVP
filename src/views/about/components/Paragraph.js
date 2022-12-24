import react, { useState, Fragment } from 'react';
function Paragraph(props) {
    const [hidden, setHide] = useState(true);
    const info = props.data;
    const body = info.body;
    console.log(hidden);
    const handleClick = () => {
        console.log()
        setHide(prev => !prev);

    };
    
    const content = body.map(obj => {
        if (body.length === 1) {
            return (<p>{obj}</p>);
        } else {
            return (
                <Fragment>
                    <h2 className="font-bold text-lg">{obj.title}</h2>
                    <p>{obj.body}</p>
                </Fragment>
            );
        }
        
    });

    return (
        <div className="max-md:px-10 md:w-[31.5rem] xl:w-[35.5rem] text-white">
            <button className="text-[16pt] underline font-bold flex flex-wrap w-fit hover:text-orange-1" onClick={handleClick}> {info.title}</button>
            <div className={hidden ? "hidden" : "w-11/12 pl-10 my-6 flex flex-col gap-8"}>
                {content}
            </div>
            
        </div>
    );
}


export default Paragraph;