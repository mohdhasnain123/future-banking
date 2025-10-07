import { BarChart3, Brain, Network, DollarSign, TrendingUp } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Payer Mix Analytics", url: "/payer-mix", icon: DollarSign },
  { title: "Recovery Rate Analysis", url: "/recovery-rate", icon: TrendingUp },
  { title: "IoMT Device Network", url: "/iomt-network", icon: Network },
  { title: "AI Agent Matrix", url: "/ai-agent-matrix", icon: Brain },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const isExpanded = items.some((i) => isActive(i.url));

  return (
    <Sidebar className={`border-r border-gray-800 bg-black ${state === "collapsed" ? "w-14" : "w-60"}`} collapsible="offcanvas">
      <SidebarContent className="bg-black">
        <div className="flex h-16 items-center px-4 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">Analytics</h2>
        </div>
        <SidebarGroup className="px-2 py-4">
          {/* <SidebarGroupLabel className="text-gray-400 mb-2">Analytics</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                     <NavLink 
                      to={item.url} 
                      className={({ isActive }) => 
                        `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive 
                            ? 'bg-white text-black' 
                            : 'text-white hover:text-green-500 hover:bg-gray-800'
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4 text-inherit" />
                      {state !== "collapsed" && <span className="text-white hover:text-green-500">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}