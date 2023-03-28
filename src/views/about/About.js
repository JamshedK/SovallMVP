import { Fragment } from 'react';
/*component imports*/
import Paragraph from './components/Paragraph';

/*Dummy Data*/
// const terms = "Sovall Terms of Service\
// The following terms of service are effective when a member agrees to join the Sovall Platform on www.sovall.com.\


// 1. ACCOUNT\
// The Sovall Platform prohibits members from having more than one account, creating an account with false or outdated information, and providing inaccurate information on their account. By accepting the Sovall Terms of Service the user confirms that they are 18 years of age or older.\ 


// 2. INFORMATION WE COLLECT\


// 2.1. Account Information\
// When you sign up for a Sovall Account, we {"require"} certain information such as {"your"} first {"name"}, last name, email address, at least three of your skills, and areas of interest.\


// 2.2. Optional Information Provision\
// Additional information will be optional to create a profile, such as your profile picture, etc.\


// 2.3. Automatically Collected Information\
// Sovall collects account information during the sign-up process, including first and last name, email address, skills, and areas of interest. Optional information may also be provided to create a profile, such as a profile picture. Sovall may also receive information about demographics, location, and activities from external sources.\




// 3. ID VERIFICATION POLICY:\


// 3.1. Government Identification Provision\
// Sovall may request government-issued identification to verify the identity of members, improve account security, and prevent fraudulent activity on the platform. The ID verification policy applies to all members and different types of ID may be requested. The ID will not be shared with anyone outside of the Sovall management team except law enforcement agencies under legal permits.\
// Various types of government identification may be requested from your host. You may comply at your discretion. The following government-issued IDs are preferred: \
// Driver’s license\
// Passport\
// National identity card\
// The Sovall Platform realizes and acknowledges that photo ID will provide some information. The Sovall Platform does not guarantee that photo ID verification is foolproof. Nevertheless, we think it could improve trust and safety between the members.\
// 4. THE INFORMATION DISPLAYED TO OTHER MEMBERS:\
// The following information about you is shown to other members:\
// Your profile picture (if you have added one)\
// Name\
// Last name\
// Website (if provided any)\
// Email address (if you choose to write it instead of your website link)\
// Areas of interests\
// Skills\
// Posts (Problems, solutions, resources, opportunities, and polls)\
// Comments\
// Solutions\
// Messages (members who you have messaged will see your messages). If other members who you have texted, screenshot your messages they are able to send that to other members or friends, just like any other platform.\
// 5. HOW WE USE THE INFORMATION WE COLLECT\
// Sovall uses the information it collects to improve and develop the platform, create a trusted and safer environment, and communicate with members. It may also use the information for research and development purposes and to enforce the terms of service.\


// 5.1 Improving and developing the Sovall Platform\
// We may use the personal information to improve and develop the Sovall Platform such as to:\
// enable you to access and use the Sovall Platform.\
// enable you to communicate with other members\
// Improve the Sovall Platform and your experience, by looking at things such as statistics and analytics\
// send important notifications, etc.\
// To improve your experience on the Sovall Platform, we will utilize your search history in order to better match systems and make this experience personalized for you.\
// 5.2 Information we store\
// Your profile picture (if you have added one), Name, last name, Website (if provided any), Email address (if you choose to write it instead of your website link), password, areas of interest, skills, posts (problems, solutions, resources, opportunities, and polls), comments, solutions, messages, shared pinned messages, private pinned messages\
// Sovall will not share or sell information that is not displayed publicly on the platform to third parties. It will only share information with third parties for legal or compliance purposes, or as part of a merger, acquisition, or sale of the company.\
// We store and process that information in order to improve the Sovall Platform as well as your experience.\
// 5.3 Creating and maintaining a trusted and safer environment. We may use the information we collect to create and maintain a trusted and safer environment such as to:\
// Detect possible fraud, in order to ensure no fraudulent members.\
// Verify or authenticate information or identifications provided by you in case you forget your password, or lose access to your account.\
// Comply with legal obligations, only in legally required circumstances.\
// in connection with the activities above, we may conduct profiling based on your interactions with the Sovall Platform and information obtained from third parties. In limited cases, automated processes may restrict or suspend access to the Sovall Platform. if such processes detect activity that poses a safety or other risk to the Sovall Platform, or community.\
// If you are unclear or would like to question any of the processes mentioned, please be sure to “contact us” at: info@sovall.com with the subject line: Safety concern\
// We will process your personal information for the purposes listed in this section given our legitimate interest in undertaking marketing activities to offer you products or services that may be of your interest.\
// 6. POLICY CHANGES AND NOTIFICATIONS\
// The Sovall Platform management team is able to modify the terms of service if we see fit. If any changes are made, we will be sure to announce these changes to you via our website and update the “Last updated” date at the top of the terms of service page and email. We will also provide you with notice of the modification by email at least 10 days before the date they become effective.\
// Members can access, update, and delete their personal information through their account settings or by editing their accounts. Members can also deactivate or delete their accounts. Sovall may retain certain information for legal or compliance purposes.\
// Sovall may update its privacy policy and terms of service and will notify members of any significant changes. members are responsible for regularly reviewing the terms of service and privacy policy.\
// 7. ANALYZING YOUR COMMUNICATION\
// In certain circumstances, we may check your communications and activities on the Sovall Platform in order to resolve fraud, check for safety issues, and regulate compliances, in order to ensure a safe platform for all members. For example, in cases of reported misuse of the platform. Although Sovall is not responsible for this, we can still scan messages in order to detect fraudulent activity. We might manually review certain aspects of communication, such as messages in the Sovall Platform. It can happen in order to improve the platform as well.\
// Sovall is not responsible for the actions of third parties, and members should be cautious when sharing personal information or interacting with other members. members are also responsible for securing their accounts and protecting their passwords.\
// This is done solely to provide a more inclusive, safe, and efficient platform for the Sovall Platform community members.\
// 8. YOUR RIGHTS\
// You may exercise any of the rights described in this section.\
// Sovall is not responsible for the content posted by members, and members are solely responsible for the accuracy, legality, and appropriateness of their content. Sovall may remove or restrict access to any content that violates its terms of service or is reported as inappropriate.\
// 8.1 Managing your information.\
// You may access and update some of your information through your Edit profile. You are responsible for keeping your personal information up-to-date. If an account is discovered to have not updated sufficient information in a longer period of time than 2 months, it might be deactivated, or you might be asked to update information.\
// Members are responsible for updating information regarding:\
// Name\
// Last name\
// Website\
// Email address\
// Website\
// Areas of interest\
// Skills\
// Profile picture\
// 8.2 Changing personal information\
// You may correct inaccurate or incomplete personal information about yourself.\
// 8.3 Requesting your data\
// In some cases, if the law requires, you may request certain personal information that we have. You may also request that certain information be transferred or sent to another member, depending on the situation.\
// 8.4 Deleting information\
// We will store the information mentioned in section 4th of this text. In certain cases, if the situation calls for it, you may request to remove personal information. Your request does not guarantee the information to be deleted.\
// The information you have shared with others, for example, comments, solutions, and messages, will continue to be publicly visible on the Sovall Platform, despite you deleting your account. You can delete your comments and solutions.\
// You can unsend and edit the messages you have sent to other members. But we will store all the messages: the unedited ones, edited and unsent ones.\
// 9. SECURITY\
// Sometimes we will use to secure your information by using certain technologies such as data encryption. If you think that your Sovall Platform account information has been lost, stolen, or misused, please contact us by sending an email to info@sovall.com and describing the issue.\
// Sovall takes no responsibility for your safety. The Sovall Platform and its management are just responsible for creating a platform where members can discuss ideas, share problems, share solutions, access resources, and connect with each other.\
// 9.1 Sharing between members.\
// To help facilitate interactions between members, we may need to share certain information, including but not limited to the following:\
// Name\
// Last name\
// Website\
// Email address\
// Website\
// Areas of interest\
// Skills\
// Profile picture\
// 9.2. Compliance with the Law, Responding to Legal Requests, Preventing Harm, and Protection of our Rights.\
// The Sovall Platform may share your information, including personal information in situations required or recommended by law to courts or authorized third parties. Such a situation will only occur when completely necessary, in cases of misuse of the platform or misconduct during transfer. This might be necessary, for a few reasons:\
// Certain legal obligations \
// To check information to facilitate criminal investigation etc. comply with our legal obligations, \
// To enforce our terms of service with other members and ensure appropriate behavior within the platform\
// To protect the Sovall Platform\
// In some situations, the disclosure of information will be completely necessary outside of these specific situations.\
// If possible, in order to ensure the highest amount of transparency possible, we will notify our members. However, there are specific situations where this may not be possible:\
// Providing information to the members is against the law, or for specific reasons such as identity theft\
// Where the provision of notification will create a risk to any stakeholder associated with the Sovall Platform\
// In these circumstances, we might share certain information without notification to the members. This is in our best interest to ensure a safe and efficient platform.\


// 9.3. Social Media Platforms.\
// We may choose to provide information on social platforms, such as Instagram, Snapchat, LinkedIn, and Facebook page. Depending on the degree of privacy in the information, we may request you provide additional information. \
// We may request the members directly to provide additional information, which is up to the discretion of the members.\
// 9.4. Aggregated Data.\
// We may also share aggregated information (information about members that we combine together so that it no longer identifies or references individual members) and other anonymized information for regulatory compliance, industry and market analysis, demographic profiling, marketing, advertising, and other business purposes.\
// "

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
