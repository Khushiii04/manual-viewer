
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Search as SearchIcon, FileText, BookOpen } from 'lucide-react';
import { getAllSections, ManualSection } from '@/data/manualData';

const Search = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<ManualSection[]>([]);

  const allSections = useMemo(() => getAllSections(), []);

  const performSearch = (term: string) => {
    if (!term.trim()) {
      setResults([]);
      return;
    }

    const searchTermLower = term.toLowerCase();
    const matchedSections = allSections.filter(section => {
      return (
        section.title.toLowerCase().includes(searchTermLower) ||
        (section.content && section.content.toLowerCase().includes(searchTermLower))
      );
    });

    // Sort by relevance (title matches first, then content matches)
    matchedSections.sort((a, b) => {
      const aTitle = a.title.toLowerCase().includes(searchTermLower);
      const bTitle = b.title.toLowerCase().includes(searchTermLower);
      
      if (aTitle && !bTitle) return -1;
      if (!aTitle && bTitle) return 1;
      return 0;
    });

    setResults(matchedSections);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchTerm);
  };

  const handleInputChange = (value: string) => {
    setSearchTerm(value);
    // Perform search as user types (with debouncing in production)
    performSearch(value);
  };

  const openSection = (section: ManualSection) => {
    const manualType = section.id.startsWith('uh-') ? 'user' : 'technical';
    navigate(`/manual?type=${manualType}`);
  };

  const getManualTypeIcon = (sectionId: string) => {
    return sectionId.startsWith('uh-') ? BookOpen : FileText;
  };

  const getManualTypeName = (sectionId: string) => {
    return sectionId.startsWith('uh-') ? 'User Handbook' : 'Technical Manual';
  };

  const highlightText = (text: string, term: string) => {
    if (!term) return text;
    
    const regex = new RegExp(`(${term})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-yellow-800 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/')}
              className="text-slate-600 hover:text-slate-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Search Manual Content</h1>
              <p className="text-sm text-slate-600">Find specific information across all manual sections</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Search Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <SearchIcon className="h-5 w-5 mr-2" />
              Search Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex space-x-4">
              <Input
                type="text"
                placeholder="Enter search terms (e.g., 'calibration', 'safety', 'startup')"
                value={searchTerm}
                onChange={(e) => handleInputChange(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">
                <SearchIcon className="h-4 w-4 mr-2" />
                Search
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Search Results */}
        {searchTerm && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-slate-800">
              {results.length} result{results.length !== 1 ? 's' : ''} for "{searchTerm}"
            </h2>
          </div>
        )}

        <div className="space-y-4">
          {results.map((section) => {
            const Icon = getManualTypeIcon(section.id);
            return (
              <Card key={section.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => openSection(section)}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon className="h-4 w-4 text-slate-500" />
                        <span className="text-xs text-slate-500 uppercase tracking-wide">
                          {getManualTypeName(section.id)}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">
                        {highlightText(section.title, searchTerm)}
                      </h3>
                      {section.content && (
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {highlightText(
                            section.content.length > 200 
                              ? section.content.substring(0, 200) + '...' 
                              : section.content,
                            searchTerm
                          )}
                        </p>
                      )}
                    </div>
                    <Button variant="outline" size="sm" className="ml-4">
                      Open Section
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {searchTerm && results.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <SearchIcon className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-600 mb-2">No results found</h3>
              <p className="text-slate-500">
                Try different search terms or check your spelling
              </p>
            </CardContent>
          </Card>
        )}

        {!searchTerm && (
          <Card>
            <CardContent className="p-8 text-center">
              <SearchIcon className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-600 mb-2">Start searching</h3>
              <p className="text-slate-500">
                Enter keywords to find relevant sections in the radar manuals
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Search;
