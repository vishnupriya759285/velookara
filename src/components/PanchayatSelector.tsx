import { useState } from 'react';
import { usePanchayat } from '../lib/PanchayatContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from './ui/dialog';
import { MapPin, Search, ChevronRight, X } from 'lucide-react';
import { searchPanchayats } from '../lib/keralaData';

export default function PanchayatSelector() {
  const {
    selectedDistrict,
    selectedPanchayat,
    setSelectedDistrict,
    setSelectedPanchayat,
    districts,
    panchayats,
    isSelected,
    clearSelection,
    displayName,
    displaySubtitle,
  } = usePanchayat();

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = searchQuery.length >= 2 ? searchPanchayats(searchQuery) : [];

  const handleSearchSelect = (district: string, panchayat: string) => {
    setSelectedDistrict(district);
    // Need to set district first, then panchayat in next tick
    setTimeout(() => {
      setSelectedPanchayat(panchayat);
      setSearchQuery('');
      setIsOpen(false);
    }, 0);
  };

  const handleDistrictSelect = (district: string) => {
    setSelectedDistrict(district);
  };

  const handlePanchayatSelect = (panchayat: string) => {
    setSelectedPanchayat(panchayat);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 bg-white/15 hover:bg-white/25 transition-all px-3 py-2 rounded-lg backdrop-blur-sm border border-white/20 text-left">
          <MapPin className="h-5 w-5 flex-shrink-0" />
          <div>
            <div className="font-semibold text-sm leading-tight">{displayName}</div>
            <div className="text-xs text-green-100 leading-tight flex items-center gap-1">
              {isSelected ? displaySubtitle : '📍 Click to select district & panchayat'}
              <ChevronRight className="h-3 w-3" />
            </div>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-600" />
            Select Your Panchayat
          </DialogTitle>
          <DialogDescription>
            Search or browse Kerala districts and panchayats
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search for a panchayat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Search Results */}
          {searchQuery.length >= 2 && (
            <div className="border rounded-lg max-h-48 overflow-y-auto">
              {searchResults.length > 0 ? (
                searchResults.slice(0, 20).map((result, idx) => (
                  <button
                    key={idx}
                    className="w-full text-left px-3 py-2 hover:bg-green-50 transition-colors border-b last:border-b-0 flex items-center justify-between"
                    onClick={() => handleSearchSelect(result.district, result.panchayat.name)}
                  >
                    <div>
                      <div className="text-sm font-medium">{result.panchayat.name}</div>
                      <div className="text-xs text-gray-500">{result.district} District</div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </button>
                ))
              ) : (
                <div className="px-3 py-4 text-center text-sm text-gray-500">
                  No panchayats found matching "{searchQuery}"
                </div>
              )}
            </div>
          )}

          {/* District & Panchayat Dropdowns */}
          {searchQuery.length < 2 && (
            <>
              <div className="space-y-2">
                <Label>District</Label>
                <Select value={selectedDistrict} onValueChange={handleDistrictSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a district" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((district) => (
                      <SelectItem key={district.name} value={district.name}>
                        {district.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedDistrict && (
                <div className="space-y-2">
                  <Label>Panchayat ({panchayats.length} available)</Label>
                  <Select value={selectedPanchayat} onValueChange={handlePanchayatSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a panchayat" />
                    </SelectTrigger>
                    <SelectContent>
                      {panchayats.map((p) => (
                        <SelectItem key={p.name} value={p.name}>
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </>
          )}

          {/* Current Selection */}
          {isSelected && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-green-600" />
                  <div>
                    <div className="text-sm font-medium text-green-800">{selectedPanchayat} Panchayat</div>
                    <div className="text-xs text-green-600">{selectedDistrict} District, Kerala</div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearSelection();
                  }}
                  className="text-green-600 hover:text-red-600 hover:bg-red-50"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
