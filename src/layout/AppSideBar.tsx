import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import DashboardIcon from "../svg/DashboardIcon";
import CompaniesIcon from "../svg/CompaniesIcon";
import SitesIcon from "../svg/SitesIcon";
import SiteAdminIcon from "../svg/SiteAdminIcon";
import SettingsIcon from "../svg/SettingsIcon";
import { useSidebar } from "../context/SidebarContext";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: {
    name: string;
    path: string;
    pro?: boolean;
    new?: boolean;
  }[];
};

type SubmenuState = {
  type: "main" | "others";
  index: number;
} | null;

const NAV_ITEMS: NavItem[] = [
  {
    icon: <DashboardIcon />,
    name: "Dashboard",
    path: "/"
  },
  {
    icon: <CompaniesIcon />,
    name: "Companies",
    path: "/companies"
  },
  {
    icon: <SitesIcon />,
    name: "Sites",
    path: "/sites"
  },
  {
    icon: <SiteAdminIcon />,
    name: "Site Admins",
    path: "/siteAdmins"
  },
  {
    icon: <SiteAdminIcon />,
    name: "Audit Logs",
    path: "/auditLogs"
  },
  {
    icon: <SettingsIcon />,
    name: "Settings",
    path: "/settings"
  },
];

const OTHERS_ITEMS: NavItem[] = [
  {
    icon: <></>,
    name: "Charts",
    subItems: [
      { name: "Line Chart", path: "/line-chart", pro: false },
      { name: "Bar Chart", path: "/bar-chart", pro: false },
    ],
  },
  {
    icon: <></>,
    name: "UI Elements",
    subItems: [
      { name: "Alerts", path: "/alerts", pro: false },
      { name: "Avatar", path: "/avatars", pro: false },
      { name: "Badge", path: "/badge", pro: false },
      { name: "Buttons", path: "/buttons", pro: false },
      { name: "Images", path: "/images", pro: false },
      { name: "Videos", path: "/videos", pro: false },
    ],
  },
  {
    icon: <></>,
    name: "Authentication",
    subItems: [
      { name: "Sign In", path: "/signin", pro: false },
    ],
  },
];

const AppSidebar = () => {
  const location = useLocation();
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();

  // State management
  const [openSubmenu, setOpenSubmenu] = useState<SubmenuState>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});

  // Refs
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const searchInputRef = useRef<HTMLInputElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    let matched = false;

    // Check in main nav items
    NAV_ITEMS.forEach((item, index) => {
      if (item.subItems) {
        item.subItems.forEach((subItem) => {
          if (isActive(subItem.path)) {
            setOpenSubmenu({ type: "main", index });
            matched = true;
          }
        });
      }
    });

    // Check in others items
    if (!matched) {
      OTHERS_ITEMS.forEach((item, index) => {
        if (item.subItems) {
          item.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({ type: "others", index });
              matched = true;
            }
          });
        }
      });
    }

    // No matching submenu found
    if (!matched) {
      setOpenSubmenu(null);
    }
  }, [location.pathname, isActive]);

  // Update submenu height when open state changes
  useEffect(() => {
    if (openSubmenu) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
 

  const renderNavLink = (item: NavItem) => {
    if (!item.path) return null;

    const showText = isExpanded || isHovered || isMobileOpen;

    return (
      <li key={item.name}>
        <Link
          to={item.path}
          className={`
            relative flex items-center w-full gap-3 px-3 py-3 font-medium text-theme-sm group my-2 rounded-md
            transition-all  ease-in-out
            ${isActive(item.path)
              ? "text-[#465fff] bg-[#ECF3FF]"
              : "text-black hover:bg-[rgba(0,0,0,0.1)] hover:text-black"
            }
            ${!showText ? "justify-center" : "justify-between"}
          `}
        >
          <div className={`flex items-center ${!showText ? "justify-center w-full" : "gap-4"}`}>
            {/* Icon */}
            {/* <span className={`
              menu-item-icon-size flex-shrink-0
              ${isActive(item.path) ? "text-[#F47521]" : "text-black group-hover:text-[#F47521]"}
            `}>
              {item.icon}
            </span> */}

            {/* Text - Hide when collapsed */}
            {showText ? (
              <span className="inter-medium text-sm whitespace-nowrap">{item.name}</span>
            ):
              <span className="inter-medium text-sm whitespace-nowrap">{item?.name?.toLocaleUpperCase().slice(0,1)}</span>
          }
          </div>

          {/* Arrow - Hide when collapsed */}
          {/* {showText && (
            <div>
              <img
                src="/images/rightarrow.svg"
                className="object-contain"
                alt="Arrow"
                width={8}
                height={8}
              />
            </div>
          )} */}
        </Link>
      </li>
    );
  };

  const renderSubmenu = (item: NavItem, index: number, menuType: "main" | "others") => {
    if (!item.subItems) return null;

    const key = `${menuType}-${index}`;
    const isOpen = openSubmenu?.type === menuType && openSubmenu?.index === index;
    const showText = isExpanded || isHovered || isMobileOpen;

    if (!showText) return null; // Hide submenus when collapsed

    return (
      <li key={item.name}>
        <div
          ref={(el) => { subMenuRefs.current[key] = el; }}
          className="overflow-hidden transition-all duration-300"
          style={{ height: isOpen ? `${subMenuHeight[key]}px` : "0px" }}
        >
          <ul className="mt-2 space-y-1 ml-9">
            {item.subItems.map((subItem) => (
              <li key={subItem.name}>
                <Link
                  to={subItem.path}
                  className={`
                    block px-4 py-2 text-sm rounded-lg transition-colors
                    ${isActive(subItem.path)
                      ? "bg-[#7e3a14] text-white"
                      : "text-gray-600 hover:bg-[#7e3a14] hover:text-white"
                    }
                  `}
                >
                  <span className="flex items-center justify-between">
                    {subItem.name}
                    {subItem.new && (
                      <span className="px-2 py-0.5 text-xs bg-orange-500 text-white rounded-full">
                        new
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </li>
    );
  };
  const showText = isExpanded || isHovered || isMobileOpen;

  const renderMenuSection = (title: string, items: NavItem[], menuType: "main" | "others") => {
    if (items.length === 0) return null;

    // const showText = isExpanded || isHovered || isMobileOpen;

    return (
      <div className="mb-6">
        {/* Super Admin Role Card - Hide when collapsed */}
        {showText && (
          <div className="flex justify-center">
            <div className="bg-[#F05350] p-3 w-56 rounded-lg mb-4 flex flex-col h-24 justify-center">
              <span className="text-xs text-white">System Administrator</span>
              <span className="text-xl text-white">Super Admin</span>
            </div>
          </div>
        )}

        <ul className="flex flex-col">
          {items.map((item, index) => (
            <div key={item.name}>
              {item.path
                ? renderNavLink(item)
                : renderSubmenu(item, index, menuType)
              }
            </div>
          ))}
        </ul>
      </div>
    );
  };

  // main render
  return (
    <aside
      ref={sidebarRef}
      className={`
        fixed flex flex-col top-0 left-0 h-screen text-gray-900 border-r border-gray-200 
        overflow-y-auto no-scrollbar transition-all duration-300 ease-in-out z-50
        ${isExpanded || isHovered || isMobileOpen ? "w-[290px]" : "w-[90px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      style={{
        background: `#FFFFFF`,
      }}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo Section */}
      <div className={`py-8 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}>
        <Link to="/" className="w-full">
          <div className={`
            flex items-center border-b-1 border-[rgba(0,0,0,0.2)] gap-2 w-full px-3 py-2
            ${!showText ? "justify-center" : ""}
          `}>
            {showText ? (
              <span className="text-2xl font-bold text-black whitespace-nowrap">
                Construction
              </span>
            ) : (
              <span className="text-2xl font-bold text-black">C</span>
            )}
          </div>
        </Link>
      </div>

      {/* Navigation Section */}
      <div className="flex flex-col flex-1 px-3">
        {renderMenuSection("Main", NAV_ITEMS, "main")}
      </div>
    </aside>
  );
};

export default AppSidebar;