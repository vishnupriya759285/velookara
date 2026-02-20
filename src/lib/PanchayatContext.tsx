import React, { createContext, useContext, useState, useEffect } from 'react';
import { keralaDistricts, type District, type Panchayat } from './keralaData';

interface PanchayatSelection {
  district: string;
  panchayat: string;
}

interface PanchayatContextType {
  selectedDistrict: string;
  selectedPanchayat: string;
  setSelectedDistrict: (district: string) => void;
  setSelectedPanchayat: (panchayat: string) => void;
  districts: District[];
  panchayats: Panchayat[];
  isSelected: boolean;
  clearSelection: () => void;
  displayName: string;
  displaySubtitle: string;
}

const PanchayatContext = createContext<PanchayatContextType | undefined>(undefined);

const STORAGE_KEY = 'selectedPanchayat';

export const PanchayatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedDistrict, setSelectedDistrictState] = useState<string>('');
  const [selectedPanchayat, setSelectedPanchayatState] = useState<string>('');

  // Load saved selection from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: PanchayatSelection = JSON.parse(saved);
        if (parsed.district && parsed.panchayat) {
          setSelectedDistrictState(parsed.district);
          setSelectedPanchayatState(parsed.panchayat);
        }
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  // Save selection to localStorage
  const saveSelection = (district: string, panchayat: string) => {
    if (district && panchayat) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ district, panchayat }));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const setSelectedDistrict = (district: string) => {
    setSelectedDistrictState(district);
    setSelectedPanchayatState(''); // Reset panchayat when district changes
    saveSelection(district, '');
  };

  const setSelectedPanchayat = (panchayat: string) => {
    setSelectedPanchayatState(panchayat);
    saveSelection(selectedDistrict, panchayat);
  };

  const clearSelection = () => {
    setSelectedDistrictState('');
    setSelectedPanchayatState('');
    localStorage.removeItem(STORAGE_KEY);
  };

  const panchayats = selectedDistrict
    ? keralaDistricts.find(d => d.name === selectedDistrict)?.panchayats || []
    : [];

  const isSelected = !!(selectedDistrict && selectedPanchayat);

  const displayName = isSelected ? `${selectedPanchayat} Panchayat` : 'Kerala Panchayat Portal';
  const displaySubtitle = isSelected ? `${selectedDistrict} District` : 'Select your panchayat';

  return (
    <PanchayatContext.Provider
      value={{
        selectedDistrict,
        selectedPanchayat,
        setSelectedDistrict,
        setSelectedPanchayat,
        districts: keralaDistricts,
        panchayats,
        isSelected,
        clearSelection,
        displayName,
        displaySubtitle,
      }}
    >
      {children}
    </PanchayatContext.Provider>
  );
};

export const usePanchayat = () => {
  const context = useContext(PanchayatContext);
  if (!context) {
    throw new Error('usePanchayat must be used within a PanchayatProvider');
  }
  return context;
};
