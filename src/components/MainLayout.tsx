import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Bell, Moon, Sun, Globe, BarChart3, Crown, Menu } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

import { useLocation } from 'react-router-dom';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setProfileDropdownOpen(false);
            }
        };

        if (profileDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [profileDropdownOpen]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMobileSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const { t, i18n } = useTranslation();
    const location = useLocation();

    const getPageHeader = () => {
        const path = location.pathname;
        if (path.includes('/employees')) {
            return {
                title: t('menu.employees'),
                subtitle: t('employeesPage.subtitle')
            };
        } else if (path.includes('/leaves')) {
            return {
                title: t('header.leaves'),
                subtitle: t('leavesPage.subtitle')
            };
        }
        // Default
        return {
            title: 'Dashboard',
            subtitle: 'Welcome back'
        };
    };

    const headerInfo = getPageHeader();

    return (
      <div className="flex bg-[#F8F9FB] dark:bg-gray-900 min-h-screen relative text-gray-900 dark:text-gray-100">
        {/* Mobile Top Bar */}
        <div className={`block md:hidden fixed top-0 left-0 right-0 z-40 bg-[#F8F9FB]/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 shadow-sm ${mobileSidebarOpen ? 'hidden' : ''}`}>
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg hover:bg-white dark:hover:bg-gray-800 hover:shadow-sm transition-all"
            >
              <Menu size={24} />
            </button>
            <div className="flex-1 flex justify-center">
              <img
                src="/assets/full-version.png"
                alt="Logo"
                className="h-8 object-contain block dark:hidden"
              />
              <img
                src="/assets/dark-long.png"
                alt="Logo"
                className="h-8 object-contain hidden dark:block"
              />
            </div>
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center"
              >
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                  className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-700 shadow-sm"
                />
              </button>
              {profileDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className={`absolute ${i18n.language === 'ar' ? 'left-0' : 'right-0'} top-0 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 z-70`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="Profile"
                      className="w-16 h-16 rounded-full border-2 border-gray-200 dark:border-gray-600"
                    />
                    <div>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        Brooklyn Simmons
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        brooklyn.simmons@gmail.com
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      className="flex-1 flex items-center justify-center gap-1 px-2 py-1 rounded-lg
                      text-gray-400 hover:text-primary bg-gray-700 dark:hover:text-primary hover:bg-white dark:hover:bg-gray-900 hover:shadow-sm transition-all text-xs"
                    >
                      <BarChart3 size={16} />
                      Analytics Data
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1 px-2 py-1 bg-primary hover:bg-purple-700 text-white rounded-lg transition-colors text-xs border-2 border-primary shadow-lg shadow-purple-500/50">
                      <Crown size={16} />
                      Upgrade Plan
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>
        {mobileSidebarOpen && (
          <Sidebar
            collapsed={false}
            setCollapsed={setCollapsed}
            mobileOpen={true}
            onClose={() => setMobileSidebarOpen(false)}
          />
        )}
        <div
          className={`flex-1 p-8 pt-0 md:pt-0 pt-12 transition-all duration-300 ${
            collapsed ? "md:ltr:ml-20 md:rtl:mr-20" : "md:ltr:ml-64 md:rtl:mr-64"
          } min-w-0`}
        >
          {/* Sticky Header */}
          <header className={`sticky top-0 z-30 md:z-50 bg-[#F8F9FB]/95 dark:bg-gray-900/95 backdrop-blur-sm -mx-8 px-8 py-4 mb-4 flex justify-between items-start border-b border-gray-100 dark:border-gray-800 shadow-sm ${mobileSidebarOpen ? 'hidden md:flex' : ''}`}>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {headerInfo.title}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                {headerInfo.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  const newLang = i18n.language === "en" ? "ar" : "en";
                  i18n.changeLanguage(newLang);
                }}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-white dark:hover:bg-gray-800 hover:shadow-sm transition-all flex items-center gap-1"
              >
                <Globe size={20} />
                <span className="text-xs font-semibold uppercase">
                  {i18n.language}
                </span>
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-white dark:hover:bg-gray-800 hover:shadow-sm transition-all"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-white dark:hover:bg-gray-800 hover:shadow-sm transition-all relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-gray-900"></span>
              </button>
              <div className="hidden md:block relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-3 pl-2 p-2 rounded-lg hover:bg-white dark:hover:bg-gray-800 hover:shadow-sm transition-all"
                >
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-700 shadow-sm"
                  />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      Brooklyn Simmons
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      brooklyn.simmons@gmail.com
                    </p>
                  </div>
                </button>
                {profileDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className={`absolute ${i18n.language === 'ar' ? 'left-0' : 'right-0'} top-0 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 z-70`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="Profile"
                        className="w-16 h-16 rounded-full border-2 border-gray-200 dark:border-gray-600"
                      />
                      <div>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                          Brooklyn Simmons
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          brooklyn.simmons@gmail.com
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        className="flex-1 flex items-center justify-center gap-1 px-2 py-1 rounded-lg
                        text-gray-400 hover:text-primary bg-gray-700 dark:hover:text-primary hover:bg-white dark:hover:bg-gray-900 hover:shadow-sm transition-all text-xs"
                      >
                        <BarChart3 size={16} />
                        Analytics Data
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-1 px-2 py-1 bg-primary hover:bg-purple-700 text-white rounded-lg transition-colors text-xs border-2 border-primary shadow-lg shadow-purple-500/50">
                        <Crown size={16} />
                        Upgrade Plan
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          <main className="">{children}</main>
        </div>
      </div>
    );
};

export default MainLayout;
