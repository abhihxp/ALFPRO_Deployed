import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import {
    LayoutDashboard,
    Briefcase,
    MessageSquare,
    Users,
    Calendar,
    User,
    HelpCircle,
    Settings,
    LogOut,
    ChevronDown,
    ChevronUp,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

interface SidebarProps {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
}

const Sidebar = ({ collapsed, setCollapsed }: SidebarProps) => {
    const [employeeOpen, setEmployeeOpen] = useState(true);

    return (
        <div className={`h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
            {/* Logo - Fixed Top */}
            <div className={`p-6 flex items-center flex-shrink-0 ${collapsed ? 'justify-center' : 'gap-2'}`}>
                {collapsed ? (
                    <img
                        src="/assets/mini-version.png"
                        alt="Logo"
                        className="h-8 object-contain"
                    />
                ) : (
                    <img
                        src="/assets/full-version.png"
                        alt="Logo"
                        className="h-10 object-contain"
                    />
                )}
            </div>

            {/* Scrollable Menu Section */}
            <div className={`flex-1 overflow-y-auto custom-scrollbar px-4 ${collapsed ? 'px-2' : ''}`}>
                {!collapsed && <div className="text-xs font-semibold text-gray-400 mb-2 px-2">MENU</div>}

                <nav className="space-y-1">
                    <NavLink to="/dashboard" className={`flex items-center gap-3 px-3 py-2.5 text-gray-500 rounded-lg hover:bg-gray-50 hover:text-primary transition-colors ${collapsed ? 'justify-center' : ''}`}>
                        <LayoutDashboard size={18} />
                        {!collapsed && <span className="text-sm font-medium">Dashboard</span>}
                    </NavLink>

                    <NavLink to="/jobs" className={`flex items-center gap-3 px-3 py-2.5 text-gray-500 rounded-lg hover:bg-gray-50 hover:text-primary transition-colors ${collapsed ? 'justify-center' : ''}`}>
                        <Briefcase size={18} />
                        {!collapsed && <span className="text-sm font-medium">Jobs</span>}
                        {!collapsed && <ChevronDown className="ml-auto w-4 h-4" />}
                    </NavLink>

                    <NavLink to="/messages" className={`flex items-center gap-3 px-3 py-2.5 text-gray-500 rounded-lg hover:bg-gray-50 hover:text-primary transition-colors relative ${collapsed ? 'justify-center' : ''}`}>
                        <MessageSquare size={18} />
                        {!collapsed && <span className="text-sm font-medium">Message</span>}
                        {collapsed && <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></div>}
                        {!collapsed && <div className="w-1.5 h-1.5 bg-red-500 rounded-full ml-auto"></div>}
                    </NavLink>

                    {/* Employee Section - Active State Style */}
                    <div className="mt-2">
                        <button
                            onClick={() => !collapsed && setEmployeeOpen(!employeeOpen)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 bg-primary text-white rounded-lg shadow-sm shadow-indigo-200 ${collapsed ? 'justify-center' : ''}`}
                        >
                            <Users size={18} />
                            {!collapsed && <span className="text-sm font-medium">Employee</span>}
                            {!collapsed && (employeeOpen ? <ChevronUp className="ml-auto w-4 h-4" /> : <ChevronDown className="ml-auto w-4 h-4" />)}
                        </button>

                        {(!collapsed && employeeOpen) && (
                            <div className="mt-1 ml-4 space-y-1 border-l-2 border-gray-100 pl-3">
                                {['Employees', 'Payroll', 'Attendance', 'Leaves', 'Statistics'].map((item) => (
                                    <NavLink
                                        key={item}
                                        to={`/${item.toLowerCase()}`}
                                        className={({ isActive }) => `block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive
                                            ? 'text-primary bg-purple-50'
                                            : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        {item}
                                    </NavLink>
                                ))}
                            </div>
                        )}
                    </div>

                    <NavLink to="/schedule" className={`flex items-center gap-3 px-3 py-2.5 text-gray-500 rounded-lg hover:bg-gray-50 hover:text-primary transition-colors mt-2 ${collapsed ? 'justify-center' : ''}`}>
                        <Calendar size={18} />
                        {!collapsed && <span className="text-sm font-medium">Schedule</span>}
                    </NavLink>

                    <NavLink to="/profile" className={`flex items-center gap-3 px-3 py-2.5 text-gray-500 rounded-lg hover:bg-gray-50 hover:text-primary transition-colors ${collapsed ? 'justify-center' : ''}`}>
                        <User size={18} />
                        {!collapsed && <span className="text-sm font-medium">Profile</span>}
                    </NavLink>
                </nav>

                <div className="mt-6"> {/* Spacer between menu and bottom actions */}
                    <nav className="space-y-1">
                        {!collapsed && (
                            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-500 rounded-lg hover:bg-gray-50 hover:text-primary transition-colors">
                                <Settings size={18} />
                                <span className="text-sm font-medium">Settings</span>
                            </button>
                        )}
                    </nav>
                </div>
            </div>

            {/* Collapse Toggle - Fixed Bottom */}
            <div className="p-4 border-t border-gray-100 flex-shrink-0 bg-white z-10">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="w-full flex items-center justify-center p-2 text-gray-400 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                >
                    {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
