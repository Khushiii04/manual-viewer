
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, LogOut, FileText } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const manualTypes = [
    {
      title: 'User Handbook',
      description: 'Operation and maintenance manual for radar systems',
      icon: BookOpen,
      onClick: () => navigate('/manual-dashboard?type=user'),
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
    },
    {
      title: 'Technical Manual',
      description: 'Detailed technical specifications and repair procedures',
      icon: FileText,
      onClick: () => navigate('/manual-dashboard?type=technical'),
      color: 'bg-green-50 border-green-200 hover:bg-green-100'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">IETM Viewer</h1>
              <p className="text-sm text-slate-600">Bharat Electronics Limited - Radar Department</p>
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
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Select Manual Type</h2>
          <p className="text-slate-600">Choose the type of manual you want to access</p>
        </div>

        {/* Manual Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {manualTypes.map((manual, index) => (
            <Card 
              key={index}
              className={`cursor-pointer transition-all duration-200 transform hover:scale-105 ${manual.color}`}
              onClick={manual.onClick}
            >
              <CardHeader className="pb-4 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-white rounded-full shadow-sm">
                    <manual.icon className="h-12 w-12 text-slate-600" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-slate-800">{manual.title}</CardTitle>
                <CardDescription className="text-slate-600 text-base">
                  {manual.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* System Info */}
        <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-slate-600">System Status:</span>
              <span className="ml-2 text-green-600">Offline Ready</span>
            </div>
            <div>
              <span className="font-medium text-slate-600">Network:</span>
              <span className="ml-2 text-blue-600">Intranet (LAN)</span>
            </div>
            <div>
              <span className="font-medium text-slate-600">Version:</span>
              <span className="ml-2 text-slate-800">IETM v2.0.1</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
