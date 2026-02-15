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

// Head Office Items (Updated with new pages)
const HEAD_OFFICE_ITEMS: NavItem[] = [
  {
    icon: <DashboardIcon />,
    name: "Bank Statements",
    path: "/head-office/bank-statements"
  },
  {
    icon: <SitesIcon />,
    name: "Site Details",
    path: "/head-office/site-details"
  },
  {
    icon: <CompaniesIcon />,
    name: "Receipts",
    path: "/head-office/receipts"
  },
  {
    icon: <SiteAdminIcon />,
    name: "Expenses",
    path: "/head-office/expenses"
  },
  {
    icon: <SettingsIcon />,
    name: "Home Expenses",
    path: "/head-office/home-expenses"
  },
];

// Petty Cash / Sites Items
const PETTY_CASH_ITEMS: NavItem[] = [
  {
    icon: <DashboardIcon />,
    name: "Dashboard",
    path: "/sites/dashboard"
  },
  {
    icon: <SitesIcon />,
    name: "Expenses",
    path: "/sites/expenses"
  },
  {
    icon: <CompaniesIcon />,
    name: "Reports",
    path: "/sites/reports"
  },
  {
    icon: <SiteAdminIcon />,
    name: "Sites",
    path: "/sites/list"
  },
  {
    icon: <SiteAdminIcon />,
    name: "Site Admins",
    path: "/sites/admins"
  },
  {
    icon: <SettingsIcon />,
    name: "Audit Logs",
    path: "/sites/audit-logs"
  },
];

// Others Items (unchanged)
const OTHERS_ITEMS: NavItem[] = [
  {
    icon: <></>,
    name: "",
    path: "/companies"
  },
  {
    icon: <></>,
    name: "",
    path: "/settings"
  },
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
  const [isHeadOfficeOpen, setIsHeadOfficeOpen] = useState(true);
  const [isPettyCashOpen, setIsPettyCashOpen] = useState(true);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});

  // Refs
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const headOfficeRef = useRef<HTMLDivElement>(null);
  const pettyCashRef = useRef<HTMLDivElement>(null);
  const [headOfficeHeight, setHeadOfficeHeight] = useState(0);
  const [pettyCashHeight, setPettyCashHeight] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    let matched = false;

    // Check in head office items
    HEAD_OFFICE_ITEMS.forEach((item, index) => {
      if (item.subItems) {
        item.subItems.forEach((subItem) => {
          if (isActive(subItem.path)) {
            setOpenSubmenu({ type: "main", index });
            matched = true;
          }
        });
      }
    });

    // Check in petty cash items
    PETTY_CASH_ITEMS.forEach((item, index) => {
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

    if (!matched) {
      setOpenSubmenu(null);
    }
  }, [location.pathname, isActive]);

  // Update submenu height
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

  // Update accordion heights
  useEffect(() => {
    if (headOfficeRef.current) {
      setHeadOfficeHeight(headOfficeRef.current.scrollHeight);
    }
    if (pettyCashRef.current) {
      setPettyCashHeight(pettyCashRef.current.scrollHeight);
    }
  }, [HEAD_OFFICE_ITEMS, PETTY_CASH_ITEMS]);

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
// Add this function after AccordionSection and before return
const renderMenuSection = (items: NavItem[], menuType: "main" | "others") => {
  if (items.length === 0) return null;

  return (
    <div className="mb-6">
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

  const renderNavLink = (item: NavItem) => {
    if (!item.path) return null;

    const showText = isExpanded || isHovered || isMobileOpen;

    return (
      <li key={item.name}>
        <Link
          to={item.path}
          className={`
            relative flex items-center w-full gap-3 px-3 py-2.5 font-medium text-sm group
            transition-all ease-in-out rounded-lg
            ${isActive(item.path)
              ? "text-[#465fff] bg-[#ECF3FF]"
              : "text-gray-700 hover:bg-[rgba(244,117,33,0.1)] hover:text-[#F47521]"
            }
            ${!showText ? "justify-center" : "justify-between"}
          `}
        >
          <div className={`flex items-center ${!showText ? "justify-center w-full" : "gap-3"}`}>
            <span className={`
              flex-shrink-0 transition-colors duration-200
              ${isActive(item.path) 
                ? "text-[#465fff]" 
                : "text-gray-500 group-hover:text-[#F47521]"
              }
            `}>
              {item.icon}
            </span>

{headOfficeHeight > 0 && (
  <span
    className="absolute left-0 top-0 h-full w-1 bg-[#465fff] rounded-tr-lg rounded-br-lg transition-opacity duration-300"
    style={{ opacity: isActive(item.path) ? 1 : 0 }}
  />
)
}

{
  pettyCashHeight > 0 && (
    <span
      className="absolute left-0 top-0 h-full w-1 bg-[#465fff] rounded-tr-lg rounded-br-lg transition-opacity duration-300"
      style={{ opacity: isActive(item.path) ? 1 : 0 }}
    />
  )
}

            {showText ? (
              <span className="whitespace-nowrap">{item.name}</span>
            ) : (
              <span className="text-sm font-medium">{item.name.charAt(0)}</span>
            )}
          </div>
        </Link>
      </li>
    );
  };

  const renderSubmenu = (item: NavItem, index: number, menuType: "main" | "others") => {
    if (!item.subItems) return null;

    const key = `${menuType}-${index}`;
    const isOpen = openSubmenu?.type === menuType && openSubmenu?.index === index;
    const showText = isExpanded || isHovered || isMobileOpen;

    if (!showText) return null;

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
                      ? "bg-[#F47521] text-white"
                      : "text-gray-600 hover:bg-[#F47521] hover:text-white"
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

  // Accordion Component
  const AccordionSection = ({ 
    title, 
    icon, 
    items, 
    isOpen, 
    onToggle,
    ref 
  }: { 
    title: string;
    icon: React.ReactNode;
    items: NavItem[];
    isOpen: boolean;
    onToggle: () => void;
    ref: React.RefObject<HTMLDivElement | null>;
  }) => (
    <div className="space-y-2">
      <button
        onClick={onToggle}
        className={`
          w-full flex items-center justify-between px-3 py-2.5 rounded-lg
          font-medium text-sm text-gray-700 hover:bg-[rgba(244,117,33,0.1)] 
          hover:text-[#F47521] transition-colors
          ${!showText ? "justify-center" : ""}
        `}
      >
        <div className={`flex items-center ${!showText ? "justify-center" : "gap-3"}`}>
          <span className={`w-5 h-5 transition-colors ${!showText ? "" : "text-gray-500"}`}>
            {icon}
          </span>
          {showText && <span>{title}</span>}
        </div>
        {showText && (
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 9L12 15L18 9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      <div
        className="overflow-hidden transition-all duration-300"
        style={{ height: isOpen && showText ? `${ref.current?.scrollHeight || 0}px` : "0px" }}
      >
        <div ref={ref} className="pl-2 space-y-0.5">
          {items.map((item) => (
            <Link
              key={item.name}
              to={item.path || "#"}
              className={`
                flex items-center w-full gap-3 px-3 py-2 text-sm rounded-lg
                transition-all duration-200
                ${isActive(item.path || "")
                  ? "text-[#465fff] bg-[#ECF3FF]"
                  : "text-gray-600 hover:bg-[rgba(244,117,33,0.1)] hover:text-[#F47521]"
                }
              `}
            >
              <span className={`
                flex-shrink-0
                ${isActive(item.path || "") ? "text-[#465fff]" : "text-gray-500"}
              `}>
                {item.icon}
              </span>
              <span className="whitespace-nowrap">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <aside
      ref={sidebarRef}
      className={`
        fixed flex flex-col top-0 left-0 h-screen text-gray-900 border-r border-gray-200 
        overflow-y-auto no-scrollbar transition-all duration-300 ease-in-out z-50 bg-white
        ${isExpanded || isHovered || isMobileOpen ? "w-[290px]" : "w-[90px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo Section */}
      <div className={`py-6 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}>
        <Link to="/" className="w-full">
          <div className={`
            flex items-center border-b border-gray-200 gap-2 w-full px-4 py-3
            ${!showText ? "justify-center" : ""}
          `}>
            {showText ? (
              <span className="text-2xl font-bold text-gray-900 whitespace-nowrap">
                Construction
              </span>
            ) : (
              <span className="text-2xl font-bold text-[#F47521]">C</span>
            )}
          </div>
        </Link>
      </div>

      {/* Navigation Section */}
      <div className="flex flex-col flex-1 px-3 space-y-6">
        {/* Super Admin Card */}
        {showText && (
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-[#F47521] to-[#E65024] p-3 w-full rounded-lg flex flex-col h-20 justify-center shadow-md">
              <span className="text-xs text-white/90 font-medium">System Administrator</span>
              <span className="text-lg text-white font-bold tracking-wide">Super Admin</span>
            </div>
          </div>
        )}

        {/* Head Office Accordion */}
        <AccordionSection
          title="Head Office"
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 10L12 5L21 10L12 15L3 10Z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5 13V18L12 22L19 18V13" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
          items={HEAD_OFFICE_ITEMS}
          isOpen={isHeadOfficeOpen}
          onToggle={() => setIsHeadOfficeOpen(!isHeadOfficeOpen)}
          ref={headOfficeRef}
        />

        {/* Petty Cash / Sites Accordion */}
        <AccordionSection
          title="Petty Cash / Sites"
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
          items={PETTY_CASH_ITEMS}
          isOpen={isPettyCashOpen}
          onToggle={() => setIsPettyCashOpen(!isPettyCashOpen)}
          ref={pettyCashRef}
        />

        {/* Other Items */}
        <div className="pt-4 border-t border-gray-200">
          {renderMenuSection(OTHERS_ITEMS, "others")}
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;