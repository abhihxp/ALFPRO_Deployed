import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Bell, Moon, Sun, Globe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

import { useLocation } from 'react-router-dom';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const [collapsed, setCollapsed] = useState(false);
    const { theme, toggleTheme } = useTheme();
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
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <div className={`flex-1 p-8 pt-0 transition-all duration-300 ${collapsed ? 'ltr:ml-20 rtl:mr-20' : 'ltr:ml-64 rtl:mr-64'} min-w-0`}>
                {/* Sticky Header */}
                <header className="sticky top-0 z-50 bg-[#F8F9FB]/95 dark:bg-gray-900/95 backdrop-blur-sm -mx-8 px-8 py-4 mb-4 flex justify-between items-start border-b border-gray-100 dark:border-gray-800 shadow-sm">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{headerInfo.title}</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{headerInfo.subtitle}</p>
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
                        <div className="flex items-center gap-3 pl-2">
                            <img
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt="Profile"
                                className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-700 shadow-sm"
                            />
                            <div className="hidden md:block">
                                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">Brooklyn Simmons</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">brooklyn.simmons@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
