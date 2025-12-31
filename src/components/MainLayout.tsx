import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Bell, Moon, Sun, Globe, BarChart3, Crown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

import { useLocation } from 'react-router-dom';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
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
    const { t, i18n } = useTranslation();
    const location = useLocation();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
      <div className="flex bg-[#F8F9FB] min-h-screen">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <div
          className={`flex-1 p-8 pt-0 transition-all duration-300 ${
            collapsed ? "ml-20" : "ml-64"
          } min-w-0 overflow-x-hidden`}
        >
          {/* Sticky Header */}
          <header className="sticky top-0 z-50 bg-[#F8F9FB]/95 backdrop-blur-sm -mx-8 px-8 py-4 mb-4 flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">HRMS</h1>
              <p className="text-gray-500 text-sm mt-1">
                Track staff activities, stats, and updates.
              </p>
            </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => {
                                const newLang = i18n.language === 'en' ? 'ar' : 'en';
                                i18n.changeLanguage(newLang);
                            }}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-white dark:hover:bg-gray-800 hover:shadow-sm transition-all flex items-center gap-1"
                        >
                            <Globe size={20} />
                            <span className="text-xs font-semibold uppercase">{i18n.language}</span>
                        </button>
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-white dark:hover:bg-gray-800 hover:shadow-sm transition-all"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-white dark:hover:bg-gray-800 hover:shadow-sm transition-all relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-gray-900"></span>
                        </button>
                        <div className="relative">
                            <button
                                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                className="flex items-center gap-3 pl-2 p-2 rounded-lg hover:bg-white dark:hover:bg-gray-800 hover:shadow-sm transition-all"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-700 shadow-sm"
                                />
                                <div className="hidden md:block text-left">
                                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">Brooklyn Simmons</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">brooklyn.simmons@gmail.com</p>
                                </div>
                            </button>
                            {profileDropdownOpen && (
                                <div ref={dropdownRef} className="absolute right-0 top-0 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 z-50">
                                    <div className="flex items-center gap-4 mb-4">
                                        <img
                                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt="Profile"
                                            className="w-16 h-16 rounded-full border-2 border-gray-200 dark:border-gray-600"
                                        />
                                        <div>
                                            <p className="text-lg font-semibold text-gray-900 dark:text-white">Brooklyn Simmons</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">brooklyn.simmons@gmail.com</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <button className="flex-1 flex items-center justify-center gap-1 px-2 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors text-xs">
                                            <BarChart3 size={16} />
                                            Analytics Data
                                        </button>
                                        <button className="flex-1 flex items-center justify-center gap-1 px-2 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors text-xs border-2 border-yellow-400 shadow-lg shadow-yellow-500/50">
                                            <Crown size={16} />
                                            Upgrade Plan
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
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
