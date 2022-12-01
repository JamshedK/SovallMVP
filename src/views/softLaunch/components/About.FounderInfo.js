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
            "Hello! I'm Ricardo from Ecuador and Colombia.",
            "I love both coding and art-making.",
            "Also I love anime, manga, boba, and shrimps.",
        ]
    },
];
const FounderInfo = (props) => {
    const person = founders[props.current];
    const description = person.description.map(p => {
        return <p key={Math.random()} className="text-white"> { p }</p >
    });

    return (
        <div className="absolute right-0 top-0 mt-[13rem] md:mt-[11rem] xl:mt-[11rem] w-1/2  md:pl-[5rem] 2xl:pl-[9.5rem]">
            <div className=" md:h-[7rem] md:w-full xl:w-[85%] md:ml-[rem] md:text-xs h-auto flex flex-col">
                <p className="text-yellow-2 max-md:w-full flex max-md:justify-center lg:text-[0.7rem] 2xl:text-[1.5rem]"> {person.name}</p>
                <p className="max-md:text-sm max-md:text-center text-yellow-2 w-full  lg:text-[0.7rem] 2xl:text-[1.1rem] italic">{person.title }</p>
                <div className="w-[70%] max-md:mr-3 flex max-md:self-end max-md:mt-3 flex-col text-white flex-wrap lg:text-[0.7rem] 2xl:text-[.9rem]">
                    {description }
                </div>
            </div>
        </div>
        
        );

}
 export default FounderInfo;