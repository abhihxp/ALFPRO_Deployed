import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, theme as antTheme } from 'antd';
import MainLayout from './components/MainLayout';
import EmployeesPage from './pages/EmployeesPage';
import AddEmployeePage from './pages/AddEmployeePage';
import { ThemeProvider, useTheme } from './context/ThemeContext';

import './i18n';
import { useTranslation } from 'react-i18next';
import enUS from 'antd/locale/en_US';
import arEG from 'antd/locale/ar_EG';

const AppContent = () => {
  const { theme } = useTheme();
  const { i18n } = useTranslation();

  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr';

  React.useEffect(() => {
    document.dir = direction;
    document.documentElement.lang = i18n.language;
  }, [direction, i18n.language]);

  return (
    <ConfigProvider
      direction={direction}
      locale={i18n.language === 'ar' ? arEG : enUS}
      theme={{
        algorithm: theme === 'dark' ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
        token: {
          colorPrimary: '#7b5eea',
          colorBgContainer: theme === 'dark' ? '#1f2937' : '#ffffff',
          colorText: theme === 'dark' ? '#f3f4f6' : '#1f2937',
          colorBorder: theme === 'dark' ? '#374151' : '#f0f0f0',
        },
        components: {
          Layout: {
            colorBgBody: theme === 'dark' ? '#111827' : '#f8f9fa',
          },
          Table: {
            colorBgContainer: theme === 'dark' ? '#1f2937' : '#ffffff',
          }
        }
      }}
    >
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/leaves" replace />} />
            {/* <Route path="/leaves" element={<LeavesPage />} /> */}
            <Route path="/employees" element={<EmployeesPage />} />
            <Route path="/employees/new" element={<AddEmployeePage />} />
          </Routes>
        </MainLayout>
      </Router>
    </ConfigProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
