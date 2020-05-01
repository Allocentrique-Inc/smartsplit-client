import MusicNoteIcon from "../svg/music-note"
import UserCardIcon from "../svg/user-card"
import UsersIcon from "../svg/users"

export const MainMenu = [
	{
		text: "menu:works",
		to: "/dashboard/my-works",
		icon: MusicNoteIcon,
	},
	{
		text: "menu:profile",
		to: "/dashboard/account/settings",
		icon: UserCardIcon,
	},
	{
		text: "menu:account",
		to: "/dashboard/my-account",
	},
	{
		text: "menu:collaborators",
		to: "/dashboard/my-collaborators",
		icon: UsersIcon,
	},
	{
		text: "menu:testsForms",
		to: "/dashboard/test/forms",
	},
	{
		text: "menu:testsFormsPage",
		to: "/test/forms",
	},
	{
		text: "menu:reduxTests",
		to: "/test/reduxTest",
	},
]

export const ProfileMenu = [
	{
		text: "dashboardHeader:profile",
		to: "/dashboard/my-profile",
	},
	{
		text: "dashboardHeader:account",
		to: "/dashboard/my-account",
	},
	{
		text: "dashboardHeader:identity",
		to: "/dashboard/my-identity",
	},
	{
		text: "dashboardHeader:notifications",
		to: "/dashboard/my-notifications",
	},
	{
		text: "profile:menu.security",
		to: "/dashboard/my-security",
	},
]
