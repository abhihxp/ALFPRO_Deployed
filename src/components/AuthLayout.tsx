import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const AuthLayout = ({ children, title, subtitle, maxWidth = "sm:max-w-md" }: { children: React.ReactNode, title?: string, subtitle?: string, maxWidth?: string }) => {
    const { t, i18n } = useTranslation();
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className={`sm:mx-auto sm:w-full ${maxWidth}`}>
                <div className="flex justify-center">
                    <img
                        src="/assets/full-version.png"
                        alt="Logo"
                        className="h-12 object-contain block dark:hidden"
                    />
                    <img
                        src="/assets/dark-long.png"
                        alt="Logo"
                        className="h-12 object-contain hidden dark:block"
                    />
                </div>
                {title && (
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        {title}
                    </h2>
                )}
                {subtitle && (
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        {subtitle}
                    </p>
                )}
            </div>

            <div className={`mt-8 sm:mx-auto sm:w-full ${maxWidth}`}>
                <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100 dark:border-gray-700">
                    {children}
                </div>
            </div>

            <div className="absolute top-4 right-4 flex gap-2">
                <button
                    onClick={() => {
                        const newLang = i18n.language === "en" ? "ar" : "en";
                        i18n.changeLanguage(newLang);
                    }}
                    className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                    <Globe size={20} />
                </button>
                <button
                    onClick={toggleTheme}
                    className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                    {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            </div>
        </div>
    );
};

export default AuthLayout;
