"use client";

import logoIcon from "@/assets/Logo.svg";
import { menuItems } from "@/constants";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import HeroIcon from "./HeroIcon";

function SidebarNav() {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const pathName = usePathname();

  const activeMenu = useMemo(
    () =>
      menuItems
        .flatMap((menu) => menu.subMenus)
        .find((menu) => menu.path === pathName),
    [pathName]
  );

  const wrapperClasses = classNames(
    "h-screen px-10 pt-8 pb-4 bg-light flex flex-col shadow-lg",
    {
      ["w-70"]: !toggleCollapse,
      ["w-20"]: toggleCollapse,
    }
  );

  const getNavItemClasses = (menu: any) => {
    return classNames(
      "flex items-center cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap mb-2 p-2",
      {
        ["gradient-bg text-white font-bold rounded-lg	"]:
          activeMenu?.id === menu.id,
      }
    );
  };

  return (
    <div
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
      className={wrapperClasses}
    >
      <div className="flex items-center">
        <Image src={logoIcon} alt="Logo" width={30} />
        <div className="gradient text-2xl ml-2">Radio wave </div>
      </div>
      <div>
        {menuItems.map((menu) => (
          <div key={menu.header}>
            <div className="text-lg font-bold mt-6 mb-2 gradient">
              {menu.header}
            </div>
            {menu.subMenus.map((menuItem) => (
              <div className={getNavItemClasses(menuItem)} key={menuItem.id}>
                <HeroIcon icon={menuItem.icon} outline={true} />
                <Link className="ml-2" href={menuItem.path}>
                  {menuItem.name}
                </Link>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SidebarNav;
