import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { UserPreferencesProvider } from './context/UserPreferencesContext';
import { ToastProvider } from './components/Toast';
import { SplashScreen } from './components/SplashScreen';
import { AppHeader } from './components/AppHeader';
import { AppSidebar } from './components/AppSidebar';
import { FloatingEmergencyButton } from './components/FloatingEmergencyButton';

// Pages
import { HomePage } from './pages/HomePage';
import { KnowYourRightsPage } from './pages/KnowYourRightsPage';
import { RightDetailPage } from './pages/RightDetailPage';
import { AILegalAssistantPage } from './pages/AILegalAssistantPage';
import { SmartSearchPage } from './pages/SmartSearchPage';
import { EmergencyHelpPage } from './pages/EmergencyHelpPage';
import { ComplaintGuidancePage } from './pages/ComplaintGuidancePage';
import { CybercrimeAwarenessPage } from './pages/CybercrimeAwarenessPage';
import { SafetyTipsPage } from './pages/SafetyTipsPage';
import { LegalUpdatesPage } from './pages/LegalUpdatesPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ProfilePage } from './pages/ProfilePage';

export function App() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <UserPreferencesProvider>
          <ToastProvider>
            <BrowserRouter>
              <div className="min-h-screen bg-white dark:bg-[#1E1A12] text-[#3B3426] dark:text-[#F3EDDC] flex flex-col font-sans transition-colors duration-150">
                {/* 1. Splash Screen on first visit */}
                <SplashScreen />

                {/* 2. Top Navigation Bar */}
                <AppHeader onToggleSidebar={() => setIsMobileSidebarOpen(prev => !prev)} />

                {/* 3. Main Shell Body with Sidebar and Page Outlet */}
                <div className="flex-1 flex w-full max-w-7xl mx-auto px-4 sm:px-6">
                  {/* Left Sidebar */}
                  <AppSidebar
                    isMobileOpen={isMobileSidebarOpen}
                    onMobileClose={() => setIsMobileSidebarOpen(false)}
                    isCollapsed={isDesktopCollapsed}
                    onToggleCollapse={() => setIsDesktopCollapsed(prev => !prev)}
                  />

                  {/* Main Content Area */}
                  <main className="flex-1 min-w-0 py-6 sm:py-8 md:pl-6">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/rights" element={<KnowYourRightsPage />} />
                      <Route path="/rights/:id" element={<RightDetailPage />} />
                      <Route path="/ai-assistant" element={<AILegalAssistantPage />} />
                      <Route path="/search" element={<SmartSearchPage />} />
                      <Route path="/emergency" element={<EmergencyHelpPage />} />
                      <Route path="/complaint-guidance" element={<ComplaintGuidancePage />} />
                      <Route path="/cybercrime" element={<CybercrimeAwarenessPage />} />
                      <Route path="/safety-tips" element={<SafetyTipsPage />} />
                      <Route path="/updates" element={<LegalUpdatesPage />} />
                      <Route path="/resources" element={<ResourcesPage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                      {/* Fallback to Home */}
                      <Route path="*" element={<HomePage />} />
                    </Routes>
                  </main>
                </div>

                {/* 4. Floating Emergency 112 SOS Button visible on every route */}
                <FloatingEmergencyButton />
              </div>
            </BrowserRouter>
          </ToastProvider>
        </UserPreferencesProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
