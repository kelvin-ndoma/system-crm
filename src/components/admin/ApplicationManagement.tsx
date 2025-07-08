import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, CheckCircle, XCircle, Eye, Mail, ArrowRight, Users, FileX, Ban } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ApplicationManagementProps {
  houseId: string;
}

const ApplicationManagement: React.FC<ApplicationManagementProps> = ({ houseId }) => {
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [reviewNotes, setReviewNotes] = useState('');

  // Mock data - in real app this would come from API
  const applications = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Kamau',
      email: 'john.kamau@example.com',
      phone: '+254700123459',
      company: 'Tech Solutions Ltd',
      jobTitle: 'Software Engineer',
      membershipType: 'Business',
      motivation: 'I am looking for a professional workspace where I can focus on my projects and network with like-minded individuals.',
      referralSource: 'Google Search',
      status: 'submitted',
      createdAt: '2024-01-28',
    },
    {
      id: '2',
      firstName: 'Grace',
      lastName: 'Mutua',
      email: 'grace.mutua@example.com',
      phone: '+254700123460',
      company: 'Freelance',
      jobTitle: 'Graphic Designer',
      membershipType: 'Co-Working',
      motivation: 'As a freelancer, I need a quiet and professional environment to meet clients and work on my design projects.',
      referralSource: 'Friend/Colleague',
      status: 'reviewing',
      createdAt: '2024-01-29',
    },
    {
      id: '3',
      firstName: 'Peter',
      lastName: 'Otieno',
      email: 'peter.otieno@example.com',
      phone: '+254700123461',
      company: 'StartupXYZ',
      jobTitle: 'CEO',
      membershipType: 'Executive',
      motivation: 'I need a premium workspace for my startup team and a place to hold important client meetings.',
      referralSource: 'Event/Conference',
      status: 'approved',
      createdAt: '2024-01-25',
    },
    {
      id: '4',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@example.com',
      phone: '+1234567890',
      company: 'Corp Inc',
      jobTitle: 'Manager',
      membershipType: 'Corporate',
      motivation: 'Our team needs a professional workspace for collaboration.',
      referralSource: 'Website',
      status: 'rejected',
      createdAt: '2024-01-20',
    },
    {
      id: '5',
      firstName: 'Mike',
      lastName: 'Chen',
      email: 'mike.chen@example.com',
      phone: '+1234567891',
      company: 'Design Studio',
      jobTitle: 'Creative Director',
      membershipType: 'Business',
      motivation: 'Looking for a creative space to inspire our team.',
      referralSource: 'Social Media',
      status: 'cancelled',
      createdAt: '2024-01-15',
    }
  ];

  const statusStages = [
    { key: 'submitted', label: 'Submitted', icon: FileX, color: 'bg-blue-500' },
    { key: 'reviewing', label: 'Under Review', icon: Clock, color: 'bg-yellow-500' },
    { key: 'approved', label: 'Approved', icon: CheckCircle, color: 'bg-green-500' },
    { key: 'rejected', label: 'Rejected', icon: XCircle, color: 'bg-red-500' },
    { key: 'cancelled', label: 'Cancelled', icon: Ban, color: 'bg-gray-500' }
  ];

  const getStatusBadge = (status: string) => {
    const stage = statusStages.find(s => s.key === status) || statusStages[0];
    const Icon = stage.icon;
    
    return (
      <Badge className={stage.color}>
        <Icon className="h-3 w-3 mr-1" />
        {stage.label}
      </Badge>
    );
  };

  const getApplicationsByStatus = (status: string) => {
    return applications.filter(app => app.status === status);
  };

  const moveApplicationToStatus = async (applicationId: string, newStatus: string) => {
    try {
      console.log(`Moving application ${applicationId} to ${newStatus}`);
      toast({
        title: "Application Updated",
        description: `Application moved to ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update application status",
        variant: "destructive",
      });
    }
  };

  const filteredApplications = applications.filter(app => 
    statusFilter === 'all' || app.status === statusFilter
  );

  const PipelineView = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {statusStages.map((stage, index) => {
          const stageApplications = getApplicationsByStatus(stage.key);
          const Icon = stage.icon;
          
          return (
            <Card key={stage.key} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <CardTitle className="text-sm">{stage.label}</CardTitle>
                  </div>
                  <Badge variant="secondary">{stageApplications.length}</Badge>
                </div>
                {index < statusStages.length - 2 && (
                  <ArrowRight className="absolute -right-3 top-6 h-4 w-4 text-muted-foreground" />
                )}
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {stageApplications.map((app) => (
                    <div key={app.id} className="p-3 bg-muted/50 rounded-lg border">
                      <div className="font-medium text-sm">{app.firstName} {app.lastName}</div>
                      <div className="text-xs text-muted-foreground">{app.membershipType}</div>
                      <div className="text-xs text-muted-foreground">{app.email}</div>
                      <div className="flex gap-1 mt-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-6 px-2 text-xs"
                              onClick={() => setSelectedApplication(app)}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Application Details</DialogTitle>
                              <DialogDescription>
                                Review application from {app.firstName} {app.lastName}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm font-medium">Name</Label>
                                  <p>{app.firstName} {app.lastName}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Email</Label>
                                  <p>{app.email}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Phone</Label>
                                  <p>{app.phone}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Company</Label>
                                  <p>{app.company}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Job Title</Label>
                                  <p>{app.jobTitle}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Preferred Plan</Label>
                                  <p>{app.membershipType}</p>
                                </div>
                              </div>
                              
                              <div>
                                <Label className="text-sm font-medium">Motivation</Label>
                                <p className="mt-1 text-sm">{app.motivation}</p>
                              </div>
                              
                              <div>
                                <Label className="text-sm font-medium">How they heard about us</Label>
                                <p className="mt-1 text-sm">{app.referralSource}</p>
                              </div>

                              <div className="space-y-3">
                                <div>
                                  <Label htmlFor="reviewNotes">Review Notes (Optional)</Label>
                                  <Textarea
                                    id="reviewNotes"
                                    value={reviewNotes}
                                    onChange={(e) => setReviewNotes(e.target.value)}
                                    placeholder="Add any notes about this application..."
                                    rows={3}
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <Select onValueChange={(value) => moveApplicationToStatus(app.id, value)}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Move to..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {statusStages.map((stage) => (
                                        <SelectItem key={stage.key} value={stage.key}>
                                          {stage.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        {stage.key === 'submitted' && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-6 px-2 text-xs"
                            onClick={() => moveApplicationToStatus(app.id, 'reviewing')}
                          >
                            Review
                          </Button>
                        )}
                        
                        {stage.key === 'reviewing' && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-6 px-2 text-xs text-green-600"
                              onClick={() => moveApplicationToStatus(app.id, 'approved')}
                            >
                              Approve
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-6 px-2 text-xs text-red-600"
                              onClick={() => moveApplicationToStatus(app.id, 'rejected')}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle>Application Management</CardTitle>
            <CardDescription>Review and process membership applications</CardDescription>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Applications</SelectItem>
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="reviewing">Under Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pipeline" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pipeline">Pipeline View</TabsTrigger>
            <TabsTrigger value="table">Table View</TabsTrigger>
          </TabsList>

          <TabsContent value="pipeline">
            <PipelineView />
          </TabsContent>

          <TabsContent value="table">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Applied</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{application.firstName} {application.lastName}</p>
                          <p className="text-sm text-muted-foreground">{application.jobTitle}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{application.email}</p>
                          <p className="text-sm text-muted-foreground">{application.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>{application.company}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{application.membershipType}</Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(application.status)}</TableCell>
                      <TableCell>{new Date(application.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setSelectedApplication(application)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Application Details</DialogTitle>
                                <DialogDescription>
                                  Review application from {application.firstName} {application.lastName}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium">Name</Label>
                                    <p>{application.firstName} {application.lastName}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Email</Label>
                                    <p>{application.email}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Phone</Label>
                                    <p>{application.phone}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Company</Label>
                                    <p>{application.company}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Job Title</Label>
                                    <p>{application.jobTitle}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Preferred Plan</Label>
                                    <p>{application.membershipType}</p>
                                  </div>
                                </div>
                                
                                <div>
                                  <Label className="text-sm font-medium">Motivation</Label>
                                  <p className="mt-1 text-sm">{application.motivation}</p>
                                </div>
                                
                                <div>
                                  <Label className="text-sm font-medium">How they heard about us</Label>
                                  <p className="mt-1 text-sm">{application.referralSource}</p>
                                </div>

                                <div className="space-y-3">
                                  <div>
                                    <Label htmlFor="reviewNotes">Review Notes (Optional)</Label>
                                    <Textarea
                                      id="reviewNotes"
                                      value={reviewNotes}
                                      onChange={(e) => setReviewNotes(e.target.value)}
                                      placeholder="Add any notes about this application..."
                                      rows={3}
                                    />
                                  </div>
                                  <div className="flex gap-2">
                                    <Select onValueChange={(value) => moveApplicationToStatus(application.id, value)}>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Move to..." />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {statusStages.map((stage) => (
                                          <SelectItem key={stage.key} value={stage.key}>
                                            {stage.label}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          <Button variant="ghost" size="sm">
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredApplications.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No applications found.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ApplicationManagement;
