import megachad from '../../assets/common/comingsoon_gigachad.svg';

const NoResults = (props) => {
    return (
        <div className="bg-green-5 h-full w-full flex z-10 grow">
            <div className='mx-auto my-auto text-center flex flex-col gap-10 py-10 px-2 justify-center items-center'>
                <img src = {megachad} className="w-45% h-45%"/>
                <div>
                    <p>No results {props.query}</p>
                </div>
            </div>
        </div>
    )
}

export default NoResults;