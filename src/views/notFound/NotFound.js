import not_found_404 from '../../assets/common/not_found_404.svg';

const NotFound = () => {
    return (
        <div className="bg-green-5 h-full w-full flex overflow-auto scrollbar-auto z-10 grow">
            <div className='mx-auto my-auto text-center flex flex-col gap-10 py-10 px-2 justify-center items-center'>
                <img src = {not_found_404} className="w-45% h-45%"/>
                <div>
                    <p>We're sorry,</p>
                    <p>It seems the page you're looking for has run away.</p>
                </div>
                <button className='font-bold bg-white text-green-2 dropshadow-xl rounded-full px-2 py-2 mt-2 font-lg italic w-30%'>Back to the main page</button>
            </div>
        </div>
    )
}

export default NotFound;