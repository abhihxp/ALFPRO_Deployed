import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Briefcase, MessageSquare, User, Users, Calendar, Settings, HelpCircle, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SidebarProps {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
}

const Sidebar = ({ collapsed, setCollapsed }: SidebarProps) => {
    const [employeeOpen, setEmployeeOpen] = useState(true);
    const { t } = useTranslation();

    /* 
       Note: menuItems and footerItems are currently defined inline in the JSX below 
       for manual control over the layout, as per current design.
       If dynamic rendering is needed later, we can re-introduce these arrays.
    */

    return (
        <div className={`h-screen bg-white dark:bg-gray-900 ltr:border-r rtl:border-l border-gray-100 dark:border-gray-800 flex flex-col fixed ltr:left-0 rtl:right-0 top-0 overflow-y-auto transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} z-50`}>
            {/* Logo */}
            <div className={`p-6 flex items-center ${collapsed ? 'justify-center' : 'gap-2'}`}>
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
                        className="h-10 object-contain block dark:hidden"
                    />
                )}
                {!collapsed && (
                    <img
                        src="/assets/full-version.png" // Ideally this would be a white version for dark mode, but keeping same for now or using filter
                        alt="Logo"
                        className="h-10 object-contain hidden dark:block filter brightness-0 invert"
                    />
                )}
            </div>

            {/* Menu - Section 1 */}
            <div className={`px-4 flex-1 ${collapsed ? 'px-2' : ''}`}>
                {!collapsed && <div className="text-xs font-semibold text-gray-400 mb-2 px-2">MENU</div>}

                <nav className="space-y-1">
                    <NavLink to="/dashboard" className={`flex items-center gap-3 px-3 py-2.5 text-gray-500 dark:text-gray-400 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-primary transition-colors ${collapsed ? 'justify-center' : ''}`}>
                        <LayoutDashboard size={18} />
                        {!collapsed && <span className="text-sm font-medium">Dashboard</span>}
                    </NavLink>

                    <NavLink to="/jobs" className={`flex items-center gap-3 px-3 py-2.5 text-gray-500 dark:text-gray-400 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-primary transition-colors ${collapsed ? 'justify-center' : ''}`}>
                        <Briefcase size={18} />
                        {!collapsed && <span className="text-sm font-medium">Jobs</span>}
                        {!collapsed && <ChevronRight className="ml-auto w-4 h-4" />}
                    </NavLink>

                    <NavLink to="/messages" className={`flex items-center gap-3 px-3 py-2.5 text-gray-500 dark:text-gray-400 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-primary transition-colors relative ${collapsed ? 'justify-center' : ''}`}>
                        <MessageSquare size={18} />
                        {!collapsed && <span className="text-sm font-medium">Message</span>}
                        {collapsed && <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full border border-white dark:border-gray-900"></div>}
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
                            {!collapsed && (employeeOpen ? <ChevronLeft className="ml-auto w-4 h-4 rotate-90" /> : <ChevronRight className="ml-auto w-4 h-4" />)}
                        </button>

                        {(!collapsed && employeeOpen) && (
                            <div className="mt-1 ml-4 space-y-1 border-l-2 border-gray-100 dark:border-gray-800 pl-3">
                                {['Employees', 'Payroll', 'Attendance', 'Leaves', 'Statistics'].map((item) => (
                                    <NavLink
                                        key={item}
                                        to={`/${item.toLowerCase()}`}
                                        className={({ isActive }) => `block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive
                                            ? 'text-primary bg-purple-50 dark:bg-gray-800'
                                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                            }`}
                                    >
                                        {item}
                                    </NavLink>
                                ))}
                            </div>
                        )}
                    </div>

                    <NavLink to="/schedule" className={`flex items-center gap-3 px-3 py-2.5 text-gray-500 dark:text-gray-400 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-primary transition-colors mt-2 ${collapsed ? 'justify-center' : ''}`}>
                        <Calendar size={18} />
                        {!collapsed && <span className="text-sm font-medium">Schedule</span>}
                    </NavLink>

                    <NavLink to="/profile" className={`flex items-center gap-3 px-3 py-2.5 text-gray-500 dark:text-gray-400 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-primary transition-colors ${collapsed ? 'justify-center' : ''}`}>
                        <User size={18} />
                        {!collapsed && <span className="text-sm font-medium">Profile</span>}
                    </NavLink>
                </nav>
            </div>

            {/* Footer Actions */}
            <div className={`px-4 mt-auto ${collapsed ? 'px-2' : ''}`}>
                <nav className="space-y-1">
                    <button className={`w-full flex items-center gap-3 px-3 py-2.5 text-gray-500 dark:text-gray-400 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-primary transition-colors ${collapsed ? 'justify-center' : ''}`}>
                        <HelpCircle size={18} />
                        {!collapsed && <span className="text-sm font-medium">Help Center</span>}
                    </button>
                    {!collapsed && (
                        <>
                            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-500 dark:text-gray-400 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-primary transition-colors">
                                <Settings size={18} />
                                <span className="text-sm font-medium">Settings</span>
                            </button>
                            <button className={`w-full flex items-center gap-3 px-3 py-2.5 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors mt-1 ${collapsed ? 'justify-center' : ''}`}>
                                <LogOut size={18} />
                                {!collapsed && <span className="text-sm font-medium">{t('menu.logOut')}</span>}
                            </button>
                        </>
                    )}
                    {collapsed && (
                        <button className="w-full flex items-center justify-center px-3 py-2.5 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors mt-4">
                            <LogOut size={18} />
                        </button>
                    )}
                </nav>
            </div>

            {/* Toggle Button - Fixed to bottom */}
            <div className="sticky bottom-0 p-4 border-t border-gray-100 flex-shrink-0 bg-white z-10">
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
