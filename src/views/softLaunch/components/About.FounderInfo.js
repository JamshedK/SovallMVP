const founders= [
    {
        name: "Hamid Mubariz",
        title: "Founder",
        description: [
            "I enjoy reading, graphic design, fishing, and cycling. Friday afternoons I do wood carving.",
            " Some of my friends call me the Meme Lord.",
        ]
    },
    {
        name: "Jamshed Karimnazarov",
        title: "Cofounder",
        description: [
            "I'm Jamshed. I listen to an unhealthy amount of podcasts and there're at least 10 more on queue.",
            "Something (irritating to some), is that I tend keep clicking or typing random stuff while reading something."
        ]
    },
    {
        name: "Elena May",
        title: "Cofounder",
        description: [
            "I'm Elena, also known as Jeff by most.",
            "You can usually find me nose - deep in a good horror story or trying to keep my plants alive.",
            "Occasionally, I draw pictures.I once correctly diagnosed someone's appendicitis."
        ]
    },
    {
        name: "Ricardo Salazar",
        title: "Cofounder",
        description: [
            "Hello! I'm Ricardo from Ecuador and Colombia",
            "I love both coding and art-making",
            "Also I love anime, manga, boba and shrimps",
        ]
    },
];
const FounderInfo = (props) => {
    const person = founders[props.current];
    const description = person.description.map(p => {
        return <p key={Math.random()} className="text-white"> { p }</p >
    });

    return (
        <div className="absolute max-md:bottom-0 max-md:p-0 md:w-1/2 md:right-0 md:mt-[9rem] xl:mt-[17.5rem] md:pl-[5rem] 2xl:pl-[9.5rem] ">
            <div className=" h-[10rem] md:h-[7rem] md:w-full lg:w-1/2 xl:w-[65%] md:ml-[rem] md:text-xs h-auto flex flex-col max-md:items-center ">
                <p className="text-yellow-2 max-md:w-1/2 flex max-md:justify-center xl:text-[1.5rem]"> {person.name}</p>
                <p className="max-md:text-sm text-yellow-2 w-fit xl:text-[1.1rem] italic">{person.title }</p>
                <div className="w-full max-md:px-1 flex flex-col text-white flex-wrap xl:text-[.9rem]">
                    {description }
                </div>
            </div>
        </div>
        
        );

}
 export default FounderInfo;