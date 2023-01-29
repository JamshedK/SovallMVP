import sovall from '../../assets/common/sovall_logo_white.svg';

const Loader = () =>{
    return(
        <div style={{backgroundColor: "#3C9A9A"}} className='h-full w-full flex grow'>
            <div className='border-2 mx-auto my-auto align-bottom gap-2 pb-10 flex flex-row text-white font-bold text-lg'>
                <p className='box-border border-2'>Loading your</p>
                <img src = {sovall} className="w-30% h-30% border-2" />
                <p className=' box-border border-2'>adventure</p>
            </div>

        </div>
    )
}

export default Loader;