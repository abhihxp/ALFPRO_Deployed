import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Settings, HelpCircle, LogOut, ChevronLeft, ChevronRight, Building, DollarSign, Package, Briefcase } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const sectionButtonClassName =
  "w-full flex items-center text-lg gap-3 px-3 py-2.5 text-gray-500 dark:text-gray-400 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-primary transition-colors";

const SubButtonClassName =
  "w-full flex justify-start text-sm gap-3 px-3 py-2.5 text-gray-500 dark:text-gray-400 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-primary transition-colors";

const Sidebar = ({ collapsed, setCollapsed }: SidebarProps) => {
  const [activeSection, setActiveSection] = useState<string | null>('employee');
  const { t } = useTranslation();

  /* 
     Note: menuItems and footerItems are currently defined inline in the JSX below 
     for manual control over the layout, as per current design.
     If dynamic rendering is needed later, we can re-introduce these arrays.
  */

  return (
    <div
      className={`h-screen bg-white dark:bg-gray-900 ltr:border-r rtl:border-l border-gray-100 dark:border-gray-800 flex flex-col fixed ltr:left-0 rtl:right-0 top-0 overflow-y-auto transition-all duration-300 ${collapsed ? "w-20" : "w-64"
        } z-50`}
    >
      {/* Logo */}
      <div
        className={`p-6 flex items-center ${collapsed ? "justify-center" : "gap-2"
          }`}
      >
        {collapsed ? (
          <>
            <img
              src="/assets/mini-version.png"
              alt="Logo"
              className="h-8 object-contain block dark:hidden"
            />
            <img
              src="/assets/dark-mini.png"
              alt="Logo"
              className="h-8 object-contain hidden dark:block"
            />
          </>
        ) : (
          <>
            <img
              src="/assets/full-version.png"
              alt="Logo"
              className="h-10 object-contain block dark:hidden"
            />
            <img
              src="/assets/dark-long.png"
              alt="Logo"
              className="h-10 object-contain hidden dark:block"
            />
          </>
        )}
      </div>

      {/* Menu - Section 1 */}
      <div className={`px-4 flex-1 ${collapsed ? "px-2" : ""}`}>
        {!collapsed && (
          <div className="text-xs font-semibold text-gray-400 mb-2 px-2">
            MENU
          </div>
        )}

        <nav className="space-y-1">
          <NavLink
            to="/dashboard"
            className={`${sectionButtonClassName} ${collapsed ? "justify-center" : ""
              }`}
          >
            <LayoutDashboard size={18} />
            {!collapsed && (
              <span className="text-sm font-medium">Dashboard</span>
            )}
          </NavLink>

          {/* Tenant Section */}
          <div className="mt-2">
            <button
              onClick={() => {
                if (collapsed) setCollapsed(false);
                setActiveSection(
                  activeSection === "tenant" ? null : "tenant"
                );
              }}
              className={`${sectionButtonClassName} ${collapsed ? "justify-center" : ""
                }`}
            >
              <Building size={18} />
              {!collapsed && (
                <span className="text-sm font-medium">Tenant</span>
              )}
              {!collapsed &&
                (activeSection === "tenant" ? (
                  <ChevronLeft className="ml-auto w-4 h-4 rotate-90" />
                ) : (
                  <ChevronRight className="ml-auto w-4 h-4" />
                ))}
            </button>

            {!collapsed && activeSection === "tenant" && (
              <div className="mt-1 ml-4 space-y-1 border-l-2 border-gray-100 dark:border-gray-800 pl-3">
                <NavLink to="/tenant-onboard" className={SubButtonClassName}>
                  Onboard
                </NavLink>
                <button className={SubButtonClassName}>Master Data</button>
                <button type="button" className={SubButtonClassName}>
                  Settings
                </button>
              </div>
            )}
          </div>

          {/* Organization Section */}
          <div className="mt-2">
            <button
              onClick={() => {
                if (collapsed) setCollapsed(false);
                setActiveSection(
                  activeSection === "organization" ? null : "organization"
                );
              }}
              className={`${sectionButtonClassName} ${collapsed ? "justify-center" : ""
                }`}
            >
              <Briefcase size={18} />
              {!collapsed && (
                <span className="text-sm font-medium">Organization</span>
              )}
              {!collapsed &&
                (activeSection === "organization" ? (
                  <ChevronLeft className="ml-auto w-4 h-4 rotate-90" />
                ) : (
                  <ChevronRight className="ml-auto w-4 h-4" />
                ))}
            </button>

            {!collapsed && activeSection === "organization" && (
              <div className="mt-1 ml-4 space-y-1 border-l-2 border-gray-100 dark:border-gray-800 pl-3">
                <NavLink to="/organization/location/new" className={SubButtonClassName}>
                  Locations
                </NavLink>
                <NavLink to="/organization/department/new" className={SubButtonClassName}>
                  Departments
                </NavLink>
                <NavLink to="/organization/designation/new" className={SubButtonClassName}>
                  Designations
                </NavLink>
              </div>
            )}
          </div>

          {/* Employee Section */}
          <div className="mt-2">
            <button
              onClick={() => {
                if (collapsed) setCollapsed(false);
                setActiveSection(
                  activeSection === "employee" ? null : "employee"
                );
              }}
              className={`${sectionButtonClassName} ${collapsed ? "justify-center" : ""
                }`}
            >
              <Users size={18} />
              {!collapsed && (
                <span className="text-sm font-medium">Employee</span>
              )}
              {!collapsed &&
                (activeSection === "employee" ? (
                  <ChevronLeft className="ml-auto w-4 h-4 rotate-90" />
                ) : (
                  <ChevronRight className="ml-auto w-4 h-4" />
                ))}
            </button>

            {!collapsed && activeSection === "employee" && (
              <div className="mt-1 ml-4 space-y-1 border-l-2 border-gray-100 dark:border-gray-800 pl-3">
                <NavLink to="/employees" className={SubButtonClassName}>
                  On-Boarding
                </NavLink>
                <NavLink to="/bulk-onboarding" className={SubButtonClassName}>
                  Bulk on-boarding
                </NavLink>
                <button type="button" className={SubButtonClassName}>
                  Link to org chart
                </button>
                <button type="button" className={SubButtonClassName}>
                  Statutory data
                </button>
                <button type="button" className={SubButtonClassName}>
                  Master settings
                </button>
                <NavLink to="/resignation" className={SubButtonClassName}>
                  Resignation
                </NavLink>
                <NavLink to="/exit-workflow" className={SubButtonClassName}>
                  Exit Workflow
                </NavLink>
                <NavLink to="/fnf" className={SubButtonClassName}>
                  FnF
                </NavLink>
                <NavLink to="/relieving-policies" className={SubButtonClassName}>
                  Relieving policies
                </NavLink>
              </div>
            )}
          </div>

          {/* Attendance Section */}
          <div className="mt-2">
            <button
              onClick={() => {
                if (collapsed) setCollapsed(false);
                setActiveSection(
                  activeSection === "attendance" ? null : "attendance"
                );
              }}
              className={`${sectionButtonClassName} ${collapsed ? "justify-center" : ""
                }`}
            >
              <Calendar size={18} />
              {!collapsed && (
                <span className="text-sm font-medium">Attendance</span>
              )}
              {!collapsed &&
                (activeSection === "attendance" ? (
                  <ChevronLeft className="ml-auto w-4 h-4 rotate-90" />
                ) : (
                  <ChevronRight className="ml-auto w-4 h-4" />
                ))}
            </button>

            {!collapsed && activeSection === "attendance" && (
              <div className="mt-1 ml-4 space-y-1 border-l-2 border-gray-100 dark:border-gray-800 pl-3">
                <button type="button" className={SubButtonClassName}>
                  Master settings
                </button>
                <NavLink to="/attendance/shift/new" className={SubButtonClassName}>
                  Shift Masters
                </NavLink>
                <NavLink to="/attendance/week-off/new" className={SubButtonClassName}>
                  WO Masters
                </NavLink>
                <button type="button" className={SubButtonClassName}>
                  Employee Linking to masters
                </button>
                <button type="button" className={SubButtonClassName}>
                  Attendance policies
                </button>
                <button type="button" className={SubButtonClassName}>
                  Time sheet upload
                </button>
                <button type="button" className={SubButtonClassName}>
                  Swipe regulations
                </button>
                <button type="button" className={SubButtonClassName}>
                  Mark Attendance
                </button>
                <NavLink to="/leaves" className={SubButtonClassName}>
                  View Attendance
                </NavLink>
                <button type="button" className={SubButtonClassName}>
                  Approvals
                </button>
                <button type="button" className={SubButtonClassName}>
                  Reports
                </button>
              </div>
            )}
          </div>

          {/* Leave Section */}
          <div className="mt-2">
            <button
              onClick={() => {
                if (collapsed) setCollapsed(false);
                setActiveSection(activeSection === "leave" ? null : "leave");
              }}
              className={`${sectionButtonClassName} ${collapsed ? "justify-center" : ""
                }`}
            >
              <Calendar size={18} />
              {!collapsed && (
                <span className="text-sm font-medium">Leave</span>
              )}
              {!collapsed &&
                (activeSection === "leave" ? (
                  <ChevronLeft className="ml-auto w-4 h-4 rotate-90" />
                ) : (
                  <ChevronRight className="ml-auto w-4 h-4" />
                ))}
            </button>

            {!collapsed && activeSection === "leave" && (
              <div className="mt-1 ml-4 space-y-1 border-l-2 border-gray-100 dark:border-gray-800 pl-3">
                <button type="button" className={SubButtonClassName}>
                  Master settings and policies
                </button>
                <button type="button" className={SubButtonClassName}>
                  Grouping leave policies
                </button>
                <button type="button" className={SubButtonClassName}>
                  Linking employee to leave masters
                </button>
                <button type="button" className={SubButtonClassName}>
                  View and apply leaves
                </button>
                <button type="button" className={SubButtonClassName}>
                  Approvals
                </button>
              </div>
            )}
          </div>

          {/* Payroll Section */}
          <div className="mt-2">
            <button
              onClick={() => {
                if (collapsed) setCollapsed(false);
                setActiveSection(
                  activeSection === "payroll" ? null : "payroll"
                );
              }}
              className={`${sectionButtonClassName} ${collapsed ? "justify-center" : ""
                }`}
            >
              <DollarSign size={18} />
              {!collapsed && (
                <span className="text-sm font-medium">Payroll</span>
              )}
              {!collapsed &&
                (activeSection === "payroll" ? (
                  <ChevronLeft className="ml-auto w-4 h-4 rotate-90" />
                ) : (
                  <ChevronRight className="ml-auto w-4 h-4" />
                ))}
            </button>

            {!collapsed && activeSection === "payroll" && (
              <div className="mt-1 ml-4 space-y-1 border-l-2 border-gray-100 dark:border-gray-800 pl-3">
                <button type="button" className={SubButtonClassName}>
                  salary components
                </button>
                <button type="button" className={SubButtonClassName}>
                  salary structure
                </button>
                <button type="button" className={SubButtonClassName}>
                  link employee to salary structure
                </button>
                <button type="button" className={SubButtonClassName}>
                  processing the payroll
                </button>
                <button type="button" className={SubButtonClassName}>
                  Lock the month and year
                </button>
                <button type="button" className={SubButtonClassName}>
                  Reports
                </button>
                <button type="button" className={SubButtonClassName}>
                  Bank statements
                </button>
                <button type="button" className={SubButtonClassName}>
                  View salary history
                </button>
              </div>
            )}
          </div>

          {/* Asset Section */}
          <div className="mt-2">
            <button
              onClick={() => {
                if (collapsed) setCollapsed(false);
                setActiveSection(activeSection === "asset" ? null : "asset");
              }}
              className={`${sectionButtonClassName} ${collapsed ? "justify-center" : ""
                }`}
            >
              <Package size={18} />
              {!collapsed && (
                <span className="text-sm font-medium">Asset</span>
              )}
              {!collapsed &&
                (activeSection === "asset" ? (
                  <ChevronLeft className="ml-auto w-4 h-4 rotate-90" />
                ) : (
                  <ChevronRight className="ml-auto w-4 h-4" />
                ))}
            </button>

            {!collapsed && activeSection === "asset" && (
              <div className="mt-1 ml-4 space-y-1 border-l-2 border-gray-100 dark:border-gray-800 pl-3">
                <button type="button" className={SubButtonClassName}>
                  Asset flow master with ref name
                </button>
                <button type="button" className={SubButtonClassName}>
                  Providing the assets and approvals
                </button>
                <button type="button" className={SubButtonClassName}>
                  Assest return/exchange flow
                </button>
                <button type="button" className={SubButtonClassName}>
                  Receivable assets and approvals
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Footer Actions */}
      <div className={`px-4 mt-auto ${collapsed ? "px-2" : ""}`}>
        <nav className="space-y-1">
          <button
            className={`${SubButtonClassName} ${collapsed ? "justify-center" : ""
              }`}
          >
            <HelpCircle size={18} />
            {!collapsed && (
              <span className="text-sm font-medium">Help Center</span>
            )}
          </button>
          {!collapsed && (
            <>
              <button className={SubButtonClassName}>
                <Settings size={18} />
                <span className="text-sm font-medium">Settings</span>
              </button>
              <button
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 rounded-lg transition-colors mt-1 ${collapsed ? "justify-center" : ""
                  }`}
              >
                <LogOut size={18} />
                {!collapsed && (
                  <span className="text-sm font-medium">
                    {t("menu.logOut")}
                  </span>
                )}
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
      <div className="sticky bottom-0 p-4 border-t border-gray-100 dark:border-gray-800 flex-shrink-0 bg-white dark:bg-gray-900 z-10">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2 text-gray-400 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
