import loading_page from '../../assets/common/loading_page.svg';

const Loader = () =>{
    return(
        <div style={{backgroundColor: "#3C9A9A"}} className='h-full w-full flex grow'>
            <div className='mx-auto my-auto align-bottom gap-2 pb-20 flex flex-row text-white font-bold text-lg'>
                <img src = {loading_page} className="w-50% h-50%" />
            </div>

        </div>
    )
}

export default Loader;