
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Search, Bookmark, FileText, ArrowLeft, LogOut } from 'lucide-react';

const ManualDashboard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const manualType = searchParams.get('type') || 'user';
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const manualTitle = manualType === 'technical' ? 'Technical Manual' : 'User Handbook';
  const manualDescription = manualType === 'technical' 
    ? 'Detailed technical specifications and repair procedures'
    : 'Operation and maintenance manual for radar systems';

  const navigationCards = [
    {
      title: 'Open Radar Manual',
      description: 'Browse and read radar system documentation',
      icon: BookOpen,
      onClick: () => navigate(`/manual?type=${manualType}`),
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
    },
    {
      title: 'Search Manual',
      description: 'Find specific information across all documents',
      icon: Search,
      onClick: () => navigate(`/search?type=${manualType}`),
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100'
    },
    {
      title: 'Bookmarks',
      description: 'Access your saved sections and references',
      icon: Bookmark,
      onClick: () => navigate(`/bookmarks?type=${manualType}`),
      color: 'bg-amber-50 border-amber-200 hover:bg-amber-100'
    },
    {
      title: 'PDF Viewer',
      description: 'View and navigate actual PDF documents',
      icon: FileText,
      onClick: () => navigate(`/manual?type=${manualType}`),
      color: 'bg-green-50 border-green-200 hover:bg-green-100'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/')}
                className="text-slate-600 hover:text-slate-800"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">IETM Viewer</h1>
                <p className="text-sm text-slate-600">Bharat Electronics Limited - Radar Department</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-600">Welcome, {user?.username}</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="text-slate-600 hover:text-slate-800"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">{manualTitle}</h2>
          <p className="text-slate-600">{manualDescription}</p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {navigationCards.map((card, index) => (
            <Card 
              key={index}
              className={`cursor-pointer transition-all duration-200 transform hover:scale-105 ${card.color}`}
              onClick={card.onClick}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <card.icon className="h-8 w-8 text-slate-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-slate-800">{card.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600 text-base">
                  {card.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Manual Info */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              {manualTitle} Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-slate-600">Manual Type:</span>
                <span className="ml-2 text-slate-800">{manualTitle}</span>
              </div>
              <div>
                <span className="font-medium text-slate-600">Status:</span>
                <span className="ml-2 text-green-600">Available Offline</span>
              </div>
              <div>
                <span className="font-medium text-slate-600">Last Updated:</span>
                <span className="ml-2 text-slate-800">Dec 2024</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManualDashboard;
