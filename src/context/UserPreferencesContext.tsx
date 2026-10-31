import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserPreferences } from '../types';

interface UserPreferencesContextType {
  preferences: UserPreferences;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  toggleSavedRight: (id: string) => void;
  isRightSaved: (id: string) => boolean;
  toggleBookmarkedResource: (id: string) => void;
  isResourceBookmarked: (id: string) => boolean;
  toggleSavedTip: (id: string) => void;
  isTipSaved: (id: string) => boolean;
  resetAllPreferences: () => void;
}

const defaultPreferences: UserPreferences = {
  name: 'Citizen User',
  language: 'en',
  theme: 'system',
  textSize: 'normal',
  reducedMotion: false,
  emailNotifications: false,
  savedRights: ['fr-equality', 'wr-fir', 'cr-cyber-fraud'],
  bookmarkedResources: ['res-india-code', 'res-cybercrime-portal', 'res-nalsa'],
  savedTips: ['tip-personal-1', 'tip-online-1'],
};

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);

export const UserPreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    try {
      const saved = localStorage.getItem('helpline_user_preferences');
      if (saved) {
        return { ...defaultPreferences, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Failed to parse preferences from localStorage', e);
    }
    return defaultPreferences;
  });

  useEffect(() => {
    localStorage.setItem('helpline_user_preferences', JSON.stringify(preferences));
    // Apply font size class to html root
    const root = document.documentElement;
    root.classList.remove('text-size-normal', 'text-size-large', 'text-size-larger');
    root.classList.add(`text-size-${preferences.textSize}`);
  }, [preferences]);

  const updatePreferences = (updates: Partial<UserPreferences>) => {
    setPreferences(prev => ({ ...prev, ...updates }));
  };

  const toggleSavedRight = (id: string) => {
    setPreferences(prev => {
      const exists = prev.savedRights.includes(id);
      return {
        ...prev,
        savedRights: exists ? prev.savedRights.filter(item => item !== id) : [...prev.savedRights, id],
      };
    });
  };

  const isRightSaved = (id: string) => preferences.savedRights.includes(id);

  const toggleBookmarkedResource = (id: string) => {
    setPreferences(prev => {
      const exists = prev.bookmarkedResources.includes(id);
      return {
        ...prev,
        bookmarkedResources: exists ? prev.bookmarkedResources.filter(item => item !== id) : [...prev.bookmarkedResources, id],
      };
    });
  };

  const isResourceBookmarked = (id: string) => preferences.bookmarkedResources.includes(id);

  const toggleSavedTip = (id: string) => {
    setPreferences(prev => {
      const exists = prev.savedTips.includes(id);
      return {
        ...prev,
        savedTips: exists ? prev.savedTips.filter(item => item !== id) : [...prev.savedTips, id],
      };
    });
  };

  const isTipSaved = (id: string) => preferences.savedTips.includes(id);

  const resetAllPreferences = () => {
    setPreferences(defaultPreferences);
    localStorage.removeItem('helpline_user_preferences');
  };

  return (
    <UserPreferencesContext.Provider
      value={{
        preferences,
        updatePreferences,
        toggleSavedRight,
        isRightSaved,
        toggleBookmarkedResource,
        isResourceBookmarked,
        toggleSavedTip,
        isTipSaved,
        resetAllPreferences,
      }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
};

export const useUserPreferences = () => {
  const context = useContext(UserPreferencesContext);
  if (!context) throw new Error('useUserPreferences must be used within UserPreferencesProvider');
  return context;
};
