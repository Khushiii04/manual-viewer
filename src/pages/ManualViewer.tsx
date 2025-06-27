
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ChevronRight, ChevronDown, Bookmark, BookmarkCheck, Home, Search as SearchIcon } from 'lucide-react';
import { getManual, ManualSection } from '@/data/manualData';
import { useBookmarks } from '@/hooks/useBookmarks';

const ManualViewer = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const manualType = searchParams.get('type') || 'user';
  const [selectedSection, setSelectedSection] = useState<ManualSection | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const { bookmarks, addBookmark, removeBookmark, isBookmarked } = useBookmarks();

  const manual = getManual(manualType);

  useEffect(() => {
    // Auto-select first section on load
    if (manual.sections.length > 0 && !selectedSection) {
      setSelectedSection(manual.sections[0]);
    }
  }, [manual, selectedSection]);

  const toggleExpanded = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const renderTOCItem = (section: ManualSection) => {
    const hasChildren = section.children && section.children.length > 0;
    const isExpanded = expandedSections.has(section.id);
    const isSelected = selectedSection?.id === section.id;

    return (
      <div key={section.id} className="mb-1">
        <div 
          className={`flex items-center p-2 rounded cursor-pointer transition-colors ${
            isSelected ? 'bg-blue-100 border-l-4 border-blue-500' : 'hover:bg-slate-100'
          }`}
          onClick={() => setSelectedSection(section)}
        >
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpanded(section.id);
              }}
              className="mr-2 p-1 hover:bg-slate-200 rounded"
            >
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
          )}
          <span 
            className={`text-sm ${section.level === 1 ? 'font-semibold' : 'font-medium'} ${
              isSelected ? 'text-blue-700' : 'text-slate-700'
            }`}
            style={{ marginLeft: `${(section.level - 1) * 16}px` }}
          >
            {section.title}
          </span>
        </div>
        
        {hasChildren && isExpanded && (
          <div className="ml-4">
            {section.children?.map(childId => {
              const childSection = manual.sections.find(s => s.id === childId);
              return childSection ? renderTOCItem(childSection) : null;
            })}
          </div>
        )}
      </div>
    );
  };

  const handleBookmarkToggle = () => {
    if (!selectedSection) return;
    
    if (isBookmarked(selectedSection.id)) {
      removeBookmark(selectedSection.id);
    } else {
      addBookmark({
        id: selectedSection.id,
        title: selectedSection.title,
        manualType: manualType,
        content: selectedSection.content || ''
      });
    }
  };

  const getCurrentSectionIndex = () => {
    return manual.sections.findIndex(s => s.id === selectedSection?.id);
  };

  const goToNextSection = () => {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex < manual.sections.length - 1) {
      setSelectedSection(manual.sections[currentIndex + 1]);
    }
  };

  const goToPreviousSection = () => {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex > 0) {
      setSelectedSection(manual.sections[currentIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
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
              <h1 className="text-xl font-bold text-slate-800">{manual.title}</h1>
              <p className="text-sm text-slate-600">{manual.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/search')}
            >
              <SearchIcon className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/')}
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Table of Contents Sidebar */}
        <div className="w-80 bg-white border-r shadow-sm">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-slate-800">Table of Contents</h2>
          </div>
          <div className="p-4 overflow-y-auto h-full">
            {manual.sections
              .filter(section => section.level === 1)
              .map(renderTOCItem)}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {selectedSection ? (
            <>
              {/* Section Header */}
              <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">{selectedSection.title}</h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Section {getCurrentSectionIndex() + 1} of {manual.sections.length}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBookmarkToggle}
                    className={isBookmarked(selectedSection.id) ? 'text-amber-600 border-amber-200' : ''}
                  >
                    {isBookmarked(selectedSection.id) ? (
                      <BookmarkCheck className="h-4 w-4 mr-2" />
                    ) : (
                      <Bookmark className="h-4 w-4 mr-2" />
                    )}
                    {isBookmarked(selectedSection.id) ? 'Bookmarked' : 'Bookmark'}
                  </Button>
                </div>
              </div>

              {/* PDF Viewer */}
              <div className="flex-1 p-6">
                <Card className="h-full">
                  <CardContent className="p-0 h-full">
                    {selectedSection.pdfPath ? (
                      <div className="h-full bg-slate-100 rounded-lg flex items-center justify-center">
                        <div className="text-center p-8">
                          <div className="bg-white p-8 rounded-lg shadow-sm border max-w-2xl">
                            <h3 className="text-xl font-semibold text-slate-800 mb-4">
                              {selectedSection.title}
                            </h3>
                            <p className="text-slate-600 mb-4">
                              {selectedSection.content}
                            </p>
                            <div className="bg-slate-50 p-4 rounded border">
                              <p className="text-sm text-slate-500 mb-2">
                                PDF Document: {selectedSection.pdfPath}
                              </p>
                              <p className="text-sm text-slate-500">
                                Page: {selectedSection.pageNumber}
                              </p>
                            </div>
                            <p className="text-xs text-slate-400 mt-4">
                              In a production environment, this would show the actual embedded PDF viewer
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full bg-slate-100 rounded-lg flex items-center justify-center">
                        <p className="text-slate-500">No PDF associated with this section</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Navigation Footer */}
              <div className="bg-white border-t px-6 py-4 flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={goToPreviousSection}
                  disabled={getCurrentSectionIndex() === 0}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous Section
                </Button>
                <span className="text-sm text-slate-600">
                  {getCurrentSectionIndex() + 1} / {manual.sections.length}
                </span>
                <Button
                  variant="outline"
                  onClick={goToNextSection}
                  disabled={getCurrentSectionIndex() === manual.sections.length - 1}
                >
                  Next Section
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-slate-500">Select a section from the table of contents</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManualViewer;
