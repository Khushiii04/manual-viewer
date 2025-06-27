
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Bookmark, BookOpen, FileText, Trash2 } from 'lucide-react';
import { useBookmarks } from '@/hooks/useBookmarks';

const Bookmarks = () => {
  const navigate = useNavigate();
  const { bookmarks, removeBookmark } = useBookmarks();

  const openSection = (bookmark: any) => {
    const manualType = bookmark.manualType;
    navigate(`/manual?type=${manualType}`);
  };

  const getManualTypeIcon = (manualType: string) => {
    return manualType === 'user' ? BookOpen : FileText;
  };

  const getManualTypeName = (manualType: string) => {
    return manualType === 'user' ? 'User Handbook' : 'Technical Manual';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
              <h1 className="text-xl font-bold text-slate-800">My Bookmarks</h1>
              <p className="text-sm text-slate-600">Quick access to your saved manual sections</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {bookmarks.length > 0 ? (
          <>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-800">
                {bookmarks.length} bookmark{bookmarks.length !== 1 ? 's' : ''} saved
              </h2>
            </div>

            <div className="space-y-4">
              {bookmarks.map((bookmark) => {
                const Icon = getManualTypeIcon(bookmark.manualType);
                return (
                  <Card key={bookmark.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Icon className="h-4 w-4 text-slate-500" />
                            <span className="text-xs text-slate-500 uppercase tracking-wide">
                              {getManualTypeName(bookmark.manualType)}
                            </span>
                            <span className="text-xs text-slate-400">
                              • Saved {formatDate(bookmark.createdAt)}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-slate-800 mb-2">
                            {bookmark.title}
                          </h3>
                          <p className="text-slate-600 text-sm leading-relaxed">
                            {bookmark.content.length > 200 
                              ? bookmark.content.substring(0, 200) + '...' 
                              : bookmark.content}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => openSection(bookmark)}
                          >
                            Open Section
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => removeBookmark(bookmark.id)}
                            className="text-red-600 hover:text-red-700 hover:border-red-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Bookmark className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-slate-600 mb-2">No bookmarks yet</h3>
              <p className="text-slate-500 mb-6">
                Start bookmarking important sections while reading the manuals
              </p>
              <div className="space-y-2">
                <Button onClick={() => navigate('/manual?type=user')} className="mr-4">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Open User Handbook
                </Button>
                <Button onClick={() => navigate('/manual?type=technical')} variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Open Technical Manual
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
