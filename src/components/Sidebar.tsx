import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Settings, HelpCircle, LogOut, ChevronLeft, ChevronRight, Building, DollarSign, Package, Briefcase } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen?: boolean;
  onClose?: () => void;
}

const sectionButtonClassName =
  "w-full flex items-center text-lg gap-3 px-3 py-2.5 text-gray-500 dark:text-gray-400 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-primary transition-colors";

const SubButtonClassName =
  "w-full flex justify-start text-sm gap-3 px-3 py-2.5 text-gray-500 dark:text-gray-400 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-500";

const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `${SubButtonClassName} ${isActive ? 'text-primary bg-gray-50 dark:bg-gray-800 font-medium' : ''}`;

const Sidebar = ({ collapsed, setCollapsed, mobileOpen = false, onClose }: SidebarProps) => {
  const handleLinkClick = () => {
    if (mobileOpen && onClose) {
      onClose();
    }
  };
  const [activeSection, setActiveSection] = useState<string | null>('employee');
  const { t, i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/tenant')) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveSection('tenant');
    } else if (
      path.startsWith('/employees') ||
      path.startsWith('/bulk-onboarding') ||
      path.startsWith('/resignation') ||
      path.startsWith('/exit-workflow') ||
      path.startsWith('/fnf') ||
      path.startsWith('/relieving-policies')
    ) {
      setActiveSection('employee');
    } else if (path.startsWith('/attendance')) {
      setActiveSection('attendance');
    } else if (path.startsWith('/leaves')) {
      setActiveSection('leave');
    } else if (path.startsWith('/payroll')) {
      setActiveSection('payroll');
    } else if (path.startsWith('/assets')) {
      setActiveSection('asset');
    }
  }, [location.pathname]);
  const isRTL = i18n.language === 'ar';

  /* 
     Note: menuItems and footerItems are currently defined inline in the JSX below 
     for manual control over the layout, as per current design.
     If dynamic rendering is needed later, we can re-introduce these arrays.
  */

  return (
    <div
      className={`bg-white dark:bg-gray-900 flex flex-col overflow-y-auto transition-all duration-300 ${
        mobileOpen
          ? "w-full h-full fixed inset-0 z-50"
          : `h-screen ltr:border-r rtl:border-l border-gray-100 dark:border-gray-800 fixed ltr:left-0 rtl:right-0 top-0 ${
              collapsed ? "w-20" : "w-64"
            } z-50`
      }`}
    >
      {/* Logo */}
      <div
        className={`p-6 flex items-center ${
          collapsed ? "justify-center" : "gap-2"
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
            {t("menu.menuLabel")}
          </div>
        )}

        <nav className="space-y-1">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${sectionButtonClassName} ${collapsed ? "justify-center" : ""} ${isActive ? "text-primary bg-gray-50 dark:bg-gray-800 font-medium" : ""}`
            }
          >
            <LayoutDashboard size={18} />
            {!collapsed && (
              <span className="text-sm font-medium">{t("menu.dashboard")}</span>
            )}
          </NavLink>

          {/* Tenant Section */}
          <div className="mt-2">
            <button
              onClick={() => {
                if (collapsed) setCollapsed(false);
                setActiveSection(activeSection === "tenant" ? null : "tenant");
              }}
              className={`${sectionButtonClassName} ${
                collapsed ? "justify-center" : ""
              }`}
            >
              <Building size={18} />
              {!collapsed && (
                <span className="text-sm font-medium">{t("menu.tenant")}</span>
              )}
              {!collapsed &&
                (activeSection === "tenant" ? (
                  isRTL ? (
                    <ChevronRight className="ml-auto w-4 h-4 rotate-90" />
                  ) : (
                    <ChevronLeft className="ml-auto w-4 h-4 rotate-90" />
                  )
                ) : isRTL ? (
                  <ChevronLeft className="ml-auto w-4 h-4" />
                ) : (
                  <ChevronRight className="ml-auto w-4 h-4" />
                ))}
            </button>

            {!collapsed && activeSection === "tenant" && (
              <div className="mt-1 ml-4 space-y-1 border-l-2 border-gray-100 dark:border-gray-800 pl-3">
                <NavLink
                  to="/tenant-onboard"
                  className={getNavLinkClass}
                  onClick={handleLinkClick}
                >
                  {t("sidebar.tenant.onboard")}
                </NavLink>
                <NavLink to="/tenant/master-data" className={getNavLinkClass}>
                  {t("sidebar.tenant.masterData")}
                </NavLink>
                <button type="button" className={SubButtonClassName} disabled>
                  {t("sidebar.tenant.settings")}
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
                  activeSection === "organization" ? null : "organization",
                );
              }}
              className={`${sectionButtonClassName} ${
                collapsed ? "justify-center" : ""
              }`}
            >
              <Briefcase size={18} />
              {!collapsed && (
                <span className="text-sm font-medium">
                  {t("menu.organization")}
                </span>
              )}
              {!collapsed &&
                (activeSection === "organization" ? (
                  isRTL ? (
                    <ChevronRight className="ml-auto w-4 h-4 rotate-90" />
                  ) : (
                    <ChevronLeft className="ml-auto w-4 h-4 rotate-90" />
                  )
                ) : isRTL ? (
                  <ChevronLeft className="ml-auto w-4 h-4" />
                ) : (
                  <ChevronRight className="ml-auto w-4 h-4" />
                ))}
            </button>

            {!collapsed && activeSection === "organization" && (
              <div className="mt-1 ml-4 space-y-1 border-l-2 border-gray-100 dark:border-gray-800 pl-3">
                <NavLink
                  to="/organization/location/new"
                  className={SubButtonClassName}
                  onClick={handleLinkClick}
                >
                  {t("sidebar.organization.locations")}
                </NavLink>
                <NavLink
                  to="/organization/department/new"
                  className={SubButtonClassName}
                  onClick={handleLinkClick}
                >
                  {t("sidebar.organization.departments")}
                </NavLink>
                <NavLink
                  to="/organization/designation/new"
                  className={SubButtonClassName}
                  onClick={handleLinkClick}
                >
                  {t("sidebar.organization.designations")}
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
                  activeSection === "employee" ? null : "employee",
                );
              }}
              className={`${sectionButtonClassName} ${
                collapsed ? "justify-center" : ""
              }`}
            >
              <Users size={18} />
              {!collapsed && (
                <span className="text-sm font-medium">
                  {t("menu.employee")}
                </span>
              )}
              {!collapsed &&
                (activeSection === "employee" ? (
                  isRTL ? (
                    <ChevronRight className="ml-auto w-4 h-4 rotate-90" />
                  ) : (
                    <ChevronLeft className="ml-auto w-4 h-4 rotate-90" />
                  )
                ) : isRTL ? (
                  <ChevronLeft className="ml-auto w-4 h-4" />
                ) : (
                  <ChevronRight className="ml-auto w-4 h-4" />
                ))}
            </button>

            {!collapsed && activeSection === "employee" && (
              <div className="mt-1 ml-4 space-y-1 border-l-2 border-gray-100 dark:border-gray-800 pl-3">
                <NavLink to="/employees" className={getNavLinkClass} end>
                  {t("sidebar.employee.onBoarding")}
                </NavLink>
                <NavLink
                  to="/bulk-onboarding"
                  className={getNavLinkClass}
                  onClick={handleLinkClick}
                >
                  {t("sidebar.employee.bulkOnboarding")}
                </NavLink>
                <button type="button" className={SubButtonClassName} disabled>
                  {t("sidebar.employee.linkToOrgChart")}
                </button>
                <NavLink
                  to="/employees/statutory-data"
                  className={getNavLinkClass}
                >
                  {t("sidebar.employee.statutoryData")}
                </NavLink>
                <button type="button" className={SubButtonClassName} disabled>
                  {t("sidebar.employee.masterSettings")}
                </button>
                <NavLink
                  to="/resignation"
                  className={getNavLinkClass}
                  onClick={handleLinkClick}
                >
                  {t("sidebar.employee.resignation")}
                </NavLink>
                <NavLink
                  to="/exit-workflow"
                  className={getNavLinkClass}
                  onClick={handleLinkClick}
                >
                  {t("sidebar.employee.exitWorkflow")}
                </NavLink>
                <NavLink
                  to="/fnf"
                  className={getNavLinkClass}
                  onClick={handleLinkClick}
                >
                  {t("sidebar.employee.fnf")}
                </NavLink>
                <NavLink
                  to="/relieving-policies"
                  className={getNavLinkClass}
                  onClick={handleLinkClick}
                >
                  {t("sidebar.employee.relievingPolicies")}
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
                  activeSection === "attendance" ? null : "attendance",
                );
              }}
              className={`${sectionButtonClassName} ${
                collapsed ? "justify-center" : ""
              }`}
            >
              <Calendar size={18} />
              {!collapsed && (
                <span className="text-sm font-medium">
                  {t("menu.attendance")}
                </span>
              )}
              {!collapsed &&
                (activeSection === "attendance" ? (
                  isRTL ? (
                    <ChevronRight className="ml-auto w-4 h-4 rotate-90" />
                  ) : (
                    <ChevronLeft className="ml-auto w-4 h-4 rotate-90" />
                  )
                ) : isRTL ? (
                  <ChevronLeft className="ml-auto w-4 h-4" />
                ) : (
                  <ChevronRight className="ml-auto w-4 h-4" />
                ))}
            </button>

            {!collapsed && activeSection === "attendance" && (
              <div className="mt-1 ml-4 space-y-1 border-l-2 border-gray-100 dark:border-gray-800 pl-3">
                <NavLink to="/attendance/masters" className={getNavLinkClass}>
                  {t("sidebar.attendance.masterSettings")}
                </NavLink>
                <button type="button" className={SubButtonClassName} disabled>
                  {t("sidebar.attendance.employeeLinkingToMasters")}
                </button>
                <button type="button" className={SubButtonClassName} disabled>
                  {t("sidebar.attendance.attendancePolicies")}
                </button>
                <button type="button" className={SubButtonClassName} disabled>
                  {t("sidebar.attendance.timeSheetUpload")}
                </button>
                <button type="button" className={SubButtonClassName} disabled>
                  {t("sidebar.attendance.swipeRegulations")}
                </button>
                <NavLink
                  to="/attendance/my-attendance"
                  className={getNavLinkClass}
                >
                  {t("sidebar.attendance.markAttendance")}
                </NavLink>
                <NavLink
                  to="/attendance/my-attendance"
                  className={getNavLinkClass}
                >
                  View Attendance
                </NavLink>
                <button type="button" className={SubButtonClassName}>
                  Approvals
                </button>
                <button type="button" className={SubButtonClassName} disabled>
                  {t("sidebar.attendance.reports")}
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
              className={`${sectionButtonClassName} ${
                collapsed ? "justify-center" : ""
              }`}
            >
              <Calendar size={18} />
              {!collapsed && (
                <span className="text-sm font-medium">{t("menu.leaves")}</span>
              )}
              {!collapsed &&
                (activeSection === "leave" ? (
                  isRTL ? (
                    <ChevronRight className="ml-auto w-4 h-4 rotate-90" />
                  ) : (
                    <ChevronLeft className="ml-auto w-4 h-4 rotate-90" />
                  )
                ) : isRTL ? (
                  <ChevronLeft className="ml-auto w-4 h-4" />
                ) : (
                  <ChevronRight className="ml-auto w-4 h-4" />
                ))}
            </button>

            {!collapsed && activeSection === "leave" && (
              <div className="mt-1 ml-4 space-y-1 border-l-2 border-gray-100 dark:border-gray-800 pl-3">
                <button type="button" className={SubButtonClassName} disabled>
                  {t("sidebar.leave.masterSettingsAndPolicies")}
                </button>
                <button type="button" className={SubButtonClassName} disabled>
                  {t("sidebar.leave.groupingLeavePolicies")}
                </button>
                <button type="button" className={SubButtonClassName} disabled>
                  {t("sidebar.leave.linkingEmployeeToLeaveMasters")}
                </button>
                <NavLink to="/leaves/my-leaves" className={getNavLinkClass}>
                  {t("sidebar.leave.viewAndApplyLeaves")}
                </NavLink>
                <button type="button" className={SubButtonClassName} disabled>
                  {t("sidebar.leave.approvals")}
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
                  activeSection === "payroll" ? null : "payroll",
                );
              }}
              className={`${sectionButtonClassName} ${
                collapsed ? "justify-center" : ""
              }`}
            >
              <DollarSign size={18} />
              {!collapsed && (
                <span className="text-sm font-medium">{t("menu.payroll")}</span>
              )}
              {!collapsed &&
                (activeSection === "payroll" ? (
                  isRTL ? (
                    <ChevronRight className="ml-auto w-4 h-4 rotate-90" />
                  ) : (
                    <ChevronLeft className="ml-auto w-4 h-4 rotate-90" />
                  )
                ) : isRTL ? (
                  <ChevronLeft className="ml-auto w-4 h-4" />
                ) : (
                  <ChevronRight className="ml-auto w-4 h-4" />
                ))}
            </button>

            {!collapsed && activeSection === "payroll" && (
              <div className="mt-1 ml-4 space-y-1 border-l-2 border-gray-100 dark:border-gray-800 pl-3">
                <button type="button" className={SubButtonClassName} disabled>
                  {t("sidebar.payroll.salaryComponents")}
                </button>
                <button type="button" className={SubButtonClassName} disabled>
                  {t("sidebar.payroll.salaryStructure")}
                </button>
                <button type="button" className={SubButtonClassName} disabled>
                  {t("sidebar.payroll.linkEmployeeToSalaryStructure")}
                </button>
                <button type="button" className={SubButtonClassName} disabled>
                  {t("sidebar.payroll.processingThePayroll")}
                </button>
                <button type="button" className={SubButtonClassName} disabled>
                  {t("sidebar.payroll.lockTheMonthAndYear")}
                </button>
                <button type="button" className={SubButtonClassName} disabled>
                  {t("sidebar.payroll.reports")}
                </button>
                <button type="button" className={SubButtonClassName} disabled>
                  {t("sidebar.payroll.bankStatements")}
                </button>
                <NavLink to="/payroll/my-salary" className={getNavLinkClass}>
                  {t("sidebar.payroll.viewSalaryHistory")}
                </NavLink>
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
              className={`${sectionButtonClassName} ${
                collapsed ? "justify-center" : ""
              }`}
            >
              <Package size={18} />
              {!collapsed && (
                <span className="text-sm font-medium">{t("menu.asset")}</span>
              )}
              {!collapsed &&
                (activeSection === "asset" ? (
                  isRTL ? (
                    <ChevronRight className="ml-auto w-4 h-4 rotate-90" />
                  ) : (
                    <ChevronLeft className="ml-auto w-4 h-4 rotate-90" />
                  )
                ) : isRTL ? (
                  <ChevronLeft className="ml-auto w-4 h-4" />
                ) : (
                  <ChevronRight className="ml-auto w-4 h-4" />
                ))}
            </button>

            {!collapsed && activeSection === "asset" && (
              <div className="mt-1 ml-4 space-y-1 border-l-2 border-gray-100 dark:border-gray-800 pl-3">
                <button type="button" className={SubButtonClassName} disabled>
                  {t("sidebar.asset.assetFlowMasterWithRefName")}
                </button>
                <button type="button" className={SubButtonClassName} disabled>
                  {t("sidebar.asset.providingTheAssetsAndApprovals")}
                </button>
                <button type="button" className={SubButtonClassName} disabled>
                  {t("sidebar.asset.assetReturnExchangeFlow")}
                </button>
                <button type="button" className={SubButtonClassName} disabled>
                  {t("sidebar.asset.receivableAssetsAndApprovals")}
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
            className={`${SubButtonClassName} ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <HelpCircle size={18} />
            {!collapsed && (
              <span className="text-sm font-medium">
                {t("menu.helpCenter")}
              </span>
            )}
          </button>
          {!collapsed && (
            <>
              <button className={SubButtonClassName} disabled>
                <Settings size={18} />
                <span className="text-sm font-medium">
                  {t("menu.settings")}
                </span>
              </button>
              <button
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 rounded-lg transition-colors mt-1 ${
                  collapsed ? "justify-center" : ""
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
          onClick={() => {
            setCollapsed(!collapsed);
            handleLinkClick();
          }}
          className="w-full flex items-center justify-center p-2 text-gray-400 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          {collapsed ? (
            isRTL ? (
              <ChevronLeft size={20} />
            ) : (
              <ChevronRight size={20} />
            )
          ) : isRTL ? (
            <ChevronRight size={20} />
          ) : (
            <ChevronLeft size={20} />
          )}
        </button>
      </div>
    </div>
  );
};


export default Sidebar;
