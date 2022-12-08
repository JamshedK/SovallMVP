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
            "I listen to an unhealthy amount of podcasts and there're at least 10 more on queue.",
            "Something (irritating to some), is that I tend keep clicking or typing random stuff while reading something."
        ]
    },
    {
        name: "Elena May",
        title: "Cofounder",
        description: [
            "You can usually find me nose - deep in a good horror story or trying to keep my plants alive.",
            "Occasionally, I draw pictures. I once correctly diagnosed someone's appendicitis."
        ]
    },
    {
        name: "Ricardo Salazar",
        title: "Cofounder",
        description: [
            "Hello! I'm from Ecuador and Colombia.",
            "I love both coding and art-making.",
            "Also I love anime, manga, boba, and shrimps.",
        ]
    },
];
const FounderInfo = (props) => {
    const person = founders[props.current];
    const description = person.description.map(p => {
        return <p key={Math.random()} className="text-white text-center"> { p }</p >
    });

    return (
        <div className="absolute w-[18rem] md:w-[13rem] 2xl:w-[23rem] h-fit top-0 mt-[19rem] md:mt-[16rem] 2xl:mt-[28rem]">
            <div className=" md:h-fit md:w-full  md:text-xs h-auto flex flex-col items-center">
                <p className="text-yellow-2 max-md:w-full flex max-md:justify-center lg:text-[0.7rem] 2xl:text-[1.5rem]"> {person.name}</p>
                <p className="max-md:text-sm text-center text-yellow-2 w-full  lg:text-[0.7rem] 2xl:text-[1.1rem] italic">{person.title }</p>
                <div className=" flex flex-col text-white flex-wrap lg:text-[0.7rem] 2xl:text-[.9rem]">
                    {description }
                </div>
            </div>
        </div>
        
        );

}
 export default FounderInfo;