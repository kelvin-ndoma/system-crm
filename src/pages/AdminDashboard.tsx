import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Users, 
  FileText, 
  CreditCard, 
  TrendingUp, 
  Building, 
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  DollarSign,
  UserPlus,
  Mail,
  Settings,
  Download
} from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import MemberManagement from '@/components/admin/MemberManagement';
import ApplicationManagement from '@/components/admin/ApplicationManagement';
import PaymentManagement from '@/components/admin/PaymentManagement';
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';
import MembershipManagement from '@/components/admin/MembershipManagement';
import EmailCenter from '@/components/admin/EmailCenter';
import UserManagement from '@/components/admin/UserManagement';
import AdminSettings from '@/components/admin/AdminSettings';

const AdminDashboard = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedHouse, setSelectedHouse] = useState(searchParams.get('house') || 'kenya');
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);

  useEffect(() => {
    if (!searchParams.get('house')) {
      setSearchParams({ house: selectedHouse });
    }
  }, [selectedHouse, searchParams, setSearchParams]);

  const houses = [
    { id: 'kenya', name: 'HQ House Kenya', location: 'Nairobi' },
    { id: 'dc', name: 'HQ House DC', location: 'Washington DC' },
  ];

  // House-specific data
  const getHouseData = (houseId: string) => {
    const baseData = {
      kenya: {
        totalMembers: 156,
        activeMembers: 142,
        pendingApplications: 23,
        monthlyRevenue: 3420000,
        currency: 'KSh',
        failedPayments: 5,
        churnRate: 2.1,
        corporateMembers: 12,
        executiveMembers: 26,
        businessMembers: 45,
        coworkingMembers: 73
      },
      dc: {
        totalMembers: 89,
        activeMembers: 82,
        pendingApplications: 15,
        monthlyRevenue: 24500,
        currency: 'USD',
        failedPayments: 3,
        churnRate: 1.8,
        corporateMembers: 8,
        executiveMembers: 18,
        businessMembers: 28,
        coworkingMembers: 35
      }
    };
    return baseData[houseId as keyof typeof baseData];
  };

  const dashboardStats = getHouseData(selectedHouse);

  const handleHouseChange = (houseId: string) => {
    setSelectedHouse(houseId);
    setSearchParams({ house: houseId });
  };

  const getCurrentView = () => {
    const path = location.pathname;
    if (path === '/admin/members') return 'members';
    if (path === '/admin/applications') return 'applications';
    if (path === '/admin/payments') return 'payments';
    if (path === '/admin/analytics') return 'analytics';
    if (path === '/admin/memberships') return 'memberships';
    if (path === '/admin/emails') return 'emails';
    if (path === '/admin/users') return 'users';
    if (path === '/admin/settings') return 'settings';
    return 'dashboard';
  };

  const renderMainContent = () => {
    const currentView = getCurrentView();
    
    switch (currentView) {
      case 'members':
        return <MemberManagement houseId={selectedHouse} />;
      case 'applications':
        return <ApplicationManagement houseId={selectedHouse} />;
      case 'payments':
        return <PaymentManagement houseId={selectedHouse} />;
      case 'analytics':
        return <AnalyticsDashboard houseId={selectedHouse} />;
      case 'memberships':
        return <MembershipManagement houseId={selectedHouse} />;
      case 'emails':
        return <EmailCenter houseId={selectedHouse} />;
      case 'users':
        return <UserManagement houseId={selectedHouse} />;
      case 'settings':
        return <AdminSettings houseId={selectedHouse} />;
      default:
        return (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Members</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.totalMembers}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    {dashboardStats.activeMembers} active
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Corp: {dashboardStats.corporateMembers} | Exec: {dashboardStats.executiveMembers}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.pendingApplications}</div>
                  <p className="text-xs text-muted-foreground">Awaiting review</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {dashboardStats.currency} {dashboardStats.monthlyRevenue.toLocaleString()}
                  </div>
                  <p className="text-xs text-green-600">+12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Failed Payments</CardTitle>
                  <XCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{dashboardStats.failedPayments}</div>
                  <p className="text-xs text-muted-foreground">Require attention</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
                  <DialogTrigger asChild>
                    <Button className="h-auto flex-col gap-2 p-4" variant="outline">
                      <UserPlus className="h-6 w-6" />
                      Add Member
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Member</DialogTitle>
                      <DialogDescription>
                        Add a new member to {selectedHouse === 'kenya' ? 'HQ House Kenya' : 'HQ House DC'}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">First Name</label>
                          <input className="w-full p-2 border rounded-md" placeholder="John" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Last Name</label>
                          <input className="w-full p-2 border rounded-md" placeholder="Doe" />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <input className="w-full p-2 border rounded-md" type="email" placeholder="john@example.com" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Membership Type</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select membership" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="coworking">Co-Working</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="executive">Executive</SelectItem>
                            <SelectItem value="corporate">Corporate</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex gap-4 pt-4">
                        <Button onClick={() => setIsAddMemberOpen(false)}>Add Member</Button>
                        <Button variant="outline" onClick={() => setIsAddMemberOpen(false)}>Cancel</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button className="h-auto flex-col gap-2 p-4" variant="outline">
                  <FileText className="h-6 w-6" />
                  Review Applications
                </Button>

                <Button className="h-auto flex-col gap-2 p-4" variant="outline">
                  <Mail className="h-6 w-6" />
                  Send Email
                </Button>

                <Button className="h-auto flex-col gap-2 p-4" variant="outline">
                  <Download className="h-6 w-6" />
                  Export Report
                </Button>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar houseId={selectedHouse} />
      
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">
                {getCurrentView() === 'dashboard' ? 'Dashboard Overview' : 
                 getCurrentView().charAt(0).toUpperCase() + getCurrentView().slice(1)}
              </h1>
              <p className="text-muted-foreground">
                {getCurrentView() === 'dashboard' ? 
                  'Manage your HQ House locations and members' :
                  `Manage ${getCurrentView()} for ${selectedHouse === 'kenya' ? 'HQ House Kenya' : 'HQ House DC'}`
                }
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Select value={selectedHouse} onValueChange={handleHouseChange}>
                <SelectTrigger className="w-64">
                  <Building className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {houses.map((house) => (
                    <SelectItem key={house.id} value={house.id}>
                      {house.name} ({house.location})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Main Content */}
          {renderMainContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
