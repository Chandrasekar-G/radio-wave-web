import HeroIcons from "@heroicons/react/solid";

type IconName = keyof typeof HeroIcons;
export interface IMenuItems {
  header: string;
  id: number;
  subMenus: {
    id: number;
    name: string;
    path: string;
    icon: IconName;
  }[];
}

export const menuItems: IMenuItems[] = [
  {
    header: "Discover",
    id: 1,
    subMenus: [
      {
        id: 11,
        name: "Home",
        path: "/home",
        icon: "HomeIcon",
      },
      {
        id: 12,
        name: "Country",
        path: "/country/all",
        icon: "GlobeIcon",
      },
      {
        id: 13,
        name: "Language",
        path: "/language/all",
        icon: "LibraryIcon",
      },
      {
        id: 14,
        name: "Tag",
        path: "/tag/all",
        icon: "TagIcon",
      },
    ],
  },
  {
    header: "Library",
    id: 2,
    subMenus: [
      {
        id: 21,
        name: "Recent stations",
        path: "/recents",
        icon: "ClockIcon",
      },
      {
        id: 22,
        name: "Favorites",
        path: "/favorite",
        icon: "HeartIcon",
      },
      {
        id: 23,
        name: "Settings",
        path: "/settings",
        icon: "CogIcon",
      },
    ],
  },
];
