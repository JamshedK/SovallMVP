const FounderInfo = (props) => {
    const founderDescription = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin mi non diam pulvinar, eget.", "Lorem ipsum dolor sit amet, eget."];
    const description = founderDescription.map(p => {
        return <p className="white">{p } </p>
    });
    return (
        <div className="absolute max-md:bottom-0 max-md:p-0 md:w-1/2 md:right-0 md:mt-[8.5rem] 2xl:mt-[15rem] md:pl-[5rem] 2xl:pl-[8.5rem]">
            <div className=" h-[10rem] md:h-[7rem] md:w-full lg:w-1/2 xl:w-1/3 md:ml-[rem] md:text-xs h-auto flex flex-col max-md:items-center">
                <p className="text-yellow-2 max-md:w-1/2 flex max-md:justify-center"> Ricardo Salazar </p>
                <p className="max-md:text-sm text-yellow-2  w-fit">CFO</p>
                <div className="w-full max-md:px-1 flex flex-col text-white flex-wrap ">
                    {description}
                </div>
            </div>
        </div>
        
        );

}
 export default FounderInfo;