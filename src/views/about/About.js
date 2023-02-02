import { Fragment } from 'react';
/*component imports*/
import Paragraph from './components/Paragraph';

/*Dummy Data*/
const data = [
	{
		title: "Our Values",
		body: [
			{
				title: "Kaizen(改善)",
				body: "Proritizing continuous improvement.",

			},
			{
				title: "Individual Empowerment",
				body: "Providing autonomy, knowledge, means, or ability to do things or make decisions for individuals.",

			},
			{
				title: "Regenerative Value Innovation",
				body: "Achieving both product differentiation and low costs with human, economic, and ecological equity in mind.",

			},

		]
	},
	{
		title: "Our Prefferred Approach",
		body: [
			{
				title: "Root Cuase Analysis (RCA)",
				body: "A root cause is defined as a factor that caused a nonconformance and should be permanently eliminated through process improvement. The root cause is the core issue—the highest-level cause—that sets in motion the entire cause-and-effect reaction that ultimately leads to the problem(s).",

			},
			{
				title: "Design Thinking",
				body: "Design thinking is an iterative and non-linear process which contains five phases: Empathize, Define, Ideate, Prototype, and Test.",

			},
			{
				title: "Human Centerd Design",
				body: "An approach aimed to empower an individual or team to design products, services, systems, and experiences that address the core needs of those who experience a problem",

			},

		]
	},
	{
		title: "Our Story",
		body: [
			{
				title: "Kaizen",
				body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nulla purus, rhoncus ac blandit quis, pellentesque fringilla ex. Maecenas sed metus sed purus malesuada aliquam. Quisque pellentesque ligula dui, non eleifend massa efficitur nec. Donec efficitur nunc ex, ac ornare velit pellentesque sed. Nulla ut turpis et justo dapibus aliquet. Aenean felis mi, laoreet vel purus non, venenatis finibus urna.",

			},
			{
				title: "Kaizen",
				body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nulla purus, rhoncus ac blandit quis, pellentesque fringilla ex. Maecenas sed metus sed purus malesuada aliquam. Quisque pellentesque ligula dui, non eleifend massa efficitur nec. Donec efficitur nunc ex, ac ornare velit pellentesque sed. Nulla ut turpis et justo dapibus aliquet. Aenean felis mi, laoreet vel purus non, venenatis finibus urna.",

			},
			{
				title: "Kaizen",
				body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nulla purus, rhoncus ac blandit quis, pellentesque fringilla ex. Maecenas sed metus sed purus malesuada aliquam. Quisque pellentesque ligula dui, non eleifend massa efficitur nec. Donec efficitur nunc ex, ac ornare velit pellentesque sed. Nulla ut turpis et justo dapibus aliquet. Aenean felis mi, laoreet vel purus non, venenatis finibus urna.",

			},

		]
	},
	{
		title: "Terms of Service",
		body: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nulla purus, rhoncus ac blandit quis, pellentesque fringilla ex. Maecenas sed metus sed purus malesuada aliquam. Quisque pellentesque ligula dui, non eleifend massa efficitur nec. Donec efficitur nunc ex, ac ornare velit pellentesque sed. Nulla ut turpis et justo dapibus aliquet. Aenean felis mi, laoreet vel purus non, venenatis finibus urna. Donec molestie molestie lectus, non ornare lectus tristique nec. Vivamus sit amet mauris vitae elit iaculis cursus sed ut felis. Integer accumsan, sapien non consectetur auctor, tortor ante imperdiet libero, quis aliquet arcu arcu quis nulla."]
	},
];


/*Arrays of components*/
const content = data.map(section => {
	return <Paragraph data={section} />
});


const About = () => {

	return (
		<Fragment>
			{/*Page and content*/}
			<div className="bg-green-5 h-full w-full flex justify-center py-8 overflow-auto scrollbar-hide border">
				<div className="p-8 h-fit rounded-lg w-[25rem] md:p-20 md:w-[35rem] flex flex-col gap-6 bg-white">
					{content}
				</div>
			
			</div>
			
			{/*Hovering button*/}
			<a href="mailto:info@sovall.com" className="absolute bg-[#2C8888] bottom-4 text-white rounded-full py-2 px-5 drop-shadow-lg"> Reach out: info@sovall.com</a>
		</Fragment>
		
        );
}

export default About;
