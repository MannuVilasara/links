import Github from 'lucide-svelte/icons/github';
import Linkedin from 'lucide-svelte/icons/linkedin';
import Twitter from 'lucide-svelte/icons/twitter';
import Globe from 'lucide-svelte/icons/globe';
import Mail from 'lucide-svelte/icons/mail';
import Instagram from 'lucide-svelte/icons/instagram';
import Youtube from 'lucide-svelte/icons/youtube';
import DiscordIcon from '$lib/components/DiscordIcon.svelte';

export interface Profile {
	name: string;
	role: string;
	location: string;
	bio: string;
	status: string;
	avatarUrl: string;
}

export interface LinkItem {
	title: string;
	subtitle: string;
	url: string;
	icon: any;
	color: string;
	class?: string; // For grid spans e.g., 'col-span-2'
}

export const profile: Profile = {
	name: 'Manpreet Singh',
	role: 'Full Stack Developer',
	location: 'India',
	bio: 'Passionate about building scalable web applications and exploring new technologies.',
	status: 'Busy with exams',
	avatarUrl: '/avatar.png' // Utilizing a placeholder
};

export const links: LinkItem[] = [
	{
		title: 'Portfolio',
		subtitle: 'My Work',
		url: 'https://mannu.live',
		icon: Globe,
		color: 'text-blue-500',
		class: 'col-span-1 md:col-span-2'
	},
	{
		title: 'GitHub',
		subtitle: 'Code',
		url: 'https://github.com/MannuVilasara',
		icon: Github,
		color: 'text-white',
		class: 'col-span-1'
	},
	{
		title: 'LinkedIn',
		subtitle: 'Connect',
		url: 'https://linkedin.com/in/mannuvilasara',
		icon: Linkedin,
		color: 'text-blue-600',
		class: 'col-span-1'
	},
	{
		title: 'Twitter',
		subtitle: 'Follow',
		url: 'https://twitter.com/dev_mannuu',
		icon: Twitter,
		color: 'text-sky-500',
		class: 'col-span-1'
	},
	{
		title: 'Instagram',
		subtitle: 'Photos',
		url: 'https://instagram.com/dev_mannuu',
		icon: Instagram,
		color: 'text-pink-500',
		class: 'col-span-1'
	},
	{
		title: 'YouTube',
		subtitle: 'Videos',
		url: 'https://youtube.com',
		icon: Youtube,
		color: 'text-red-500',
		class: 'col-span-1 md:col-span-2'
	},
	{
		title: 'Discord',
		subtitle: 'Chat',
		url: 'https://discord.com/users/786926252811485186',
		icon: DiscordIcon,
		color: 'text-indigo-500',
		class: 'col-span-1 md:col-span-2'
	},
	{
		title: 'Email',
		subtitle: 'Contact',
		url: 'mailto:mannuvilasara@gmail.com',
		icon: Mail,
		color: 'text-purple-500',
		class: 'col-span-1 md:col-span-2'
	}
];
