import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Mail, 
  Send, 
  Plus, 
  Edit, 
  Trash2, 
  Clock, 
  CheckCircle, 
  XCircle,
  Users,
  FileText
} from 'lucide-react';
import { EmailTemplate, EmailCampaign } from '@/types';

interface EmailCenterProps {
  houseId: string;
}

const EmailCenter: React.FC<EmailCenterProps> = ({ houseId }) => {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);

  // Mock data
  const campaigns: EmailCampaign[] = [
    {
      id: '1',
      name: 'Welcome New Members',
      subject: 'Welcome to HQ House Kenya!',
      content: 'Welcome to our community...',
      recipients: ['new-members'],
      status: 'sent',
      sentAt: new Date('2024-01-15'),
      houseId
    },
    {
      id: '2',
      name: 'Monthly Newsletter',
      subject: 'HQ House Update - January 2024',
      content: 'Here are the latest updates...',
      recipients: ['all-members'],
      status: 'scheduled',
      scheduledAt: new Date('2024-02-01'),
      houseId
    }
  ];

  const templates: EmailTemplate[] = [
    {
      id: '1',
      name: 'Application Approved',
      subject: 'Your HQ House application has been approved!',
      content: 'Congratulations! Your application has been approved...',
      type: 'application_approved',
      houseId
    },
    {
      id: '2',
      name: 'Payment Failed',
      subject: 'Payment Failed - Action Required',
      content: 'We were unable to process your payment...',
      type: 'payment_failed',
      houseId
    }
  ];

  const ComposeEmailForm = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="campaign-name">Campaign Name</Label>
        <Input id="campaign-name" placeholder="e.g., Monthly Newsletter" />
      </div>
      
      <div>
        <Label htmlFor="recipients">Recipients</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select recipient group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-members">All Members</SelectItem>
            <SelectItem value="new-members">New Members</SelectItem>
            <SelectItem value="business-members">Business Members</SelectItem>
            <SelectItem value="executive-members">Executive Members</SelectItem>
            <SelectItem value="corporate-members">Corporate Members</SelectItem>
            <SelectItem value="pending-applications">Pending Applications</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" placeholder="Email subject line" />
      </div>

      <div>
        <Label htmlFor="content">Message</Label>
        <Textarea 
          id="content" 
          placeholder="Write your email content here..."
          className="min-h-32"
        />
      </div>

      <div className="flex gap-4">
        <Button>
          <Send className="h-4 w-4 mr-2" />
          Send Now
        </Button>
        <Button variant="outline">
          <Clock className="h-4 w-4 mr-2" />
          Schedule
        </Button>
        <Button variant="outline">Save Draft</Button>
      </div>
    </div>
  );

  const CreateTemplateForm = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="template-name">Template Name</Label>
        <Input id="template-name" placeholder="e.g., Welcome Email" />
      </div>
      
      <div>
        <Label htmlFor="template-type">Template Type</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select template type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="welcome">Welcome</SelectItem>
            <SelectItem value="application_approved">Application Approved</SelectItem>
            <SelectItem value="application_rejected">Application Rejected</SelectItem>
            <SelectItem value="payment_failed">Payment Failed</SelectItem>
            <SelectItem value="newsletter">Newsletter</SelectItem>
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="template-subject">Subject</Label>
        <Input id="template-subject" placeholder="Email subject template" />
      </div>

      <div>
        <Label htmlFor="template-content">Content</Label>
        <Textarea 
          id="template-content" 
          placeholder="Email template content..."
          className="min-h-32"
        />
      </div>

      <div className="flex gap-4">
        <Button onClick={() => setIsTemplateOpen(false)}>Create Template</Button>
        <Button variant="outline" onClick={() => setIsTemplateOpen(false)}>Cancel</Button>
      </div>
    </div>
  );

  const getStatusBadge = (status: string) => {
    const variants = {
      sent: { variant: 'default' as const, icon: CheckCircle },
      scheduled: { variant: 'secondary' as const, icon: Clock },
      draft: { variant: 'outline' as const, icon: FileText },
      failed: { variant: 'destructive' as const, icon: XCircle }
    };
    
    const config = variants[status as keyof typeof variants] || variants.draft;
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant}>
        <Icon className="h-3 w-3 mr-1" />
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Email Center</h2>
          <p className="text-muted-foreground">
            Manage email campaigns and templates for {houseId === 'kenya' ? 'HQ House Kenya' : 'HQ House DC'}
          </p>
        </div>
        <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
          <DialogTrigger asChild>
            <Button>
              <Mail className="h-4 w-4 mr-2" />
              Compose Email
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Compose New Email</DialogTitle>
              <DialogDescription>
                Create and send an email campaign to your members
              </DialogDescription>
            </DialogHeader>
            <ComposeEmailForm />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="campaigns">Email Campaigns</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Campaigns</CardTitle>
              <CardDescription>Manage your email campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{campaign.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {campaign.subject}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {campaign.recipients.join(', ')}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(campaign.status)}
                      </TableCell>
                      <TableCell>
                        {campaign.sentAt?.toLocaleDateString() || 
                         campaign.scheduledAt?.toLocaleDateString() || 'Draft'}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Email Templates</h3>
            <Dialog open={isTemplateOpen} onOpenChange={setIsTemplateOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Template
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create Email Template</DialogTitle>
                  <DialogDescription>
                    Create a reusable email template
                  </DialogDescription>
                </DialogHeader>
                <CreateTemplateForm />
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Template Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {templates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell className="font-medium">{template.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{template.type}</Badge>
                      </TableCell>
                      <TableCell>{template.subject}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Emails Sent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,456</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Open Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68.5%</div>
                <p className="text-xs text-muted-foreground">+2.3% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Click Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12.8%</div>
                <p className="text-xs text-muted-foreground">+0.5% from last month</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmailCenter;
