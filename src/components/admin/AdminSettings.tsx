import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, Mail, Bell, Shield, Palette } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdminSettingsProps {
  houseId: string;
}

const AdminSettings: React.FC<AdminSettingsProps> = ({ houseId }) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    houseName: houseId === 'kenya' ? 'HQ House Kenya' : 'HQ House DC',
    location: houseId === 'kenya' ? 'Nairobi, Kenya' : 'Washington, DC',
    currency: houseId === 'kenya' ? 'KSh' : 'USD',
    timezone: houseId === 'kenya' ? 'Africa/Nairobi' : 'America/New_York',
    description: 'A premium co-working space for professionals',
    emailNotifications: true,
    smsNotifications: false,
    autoApproval: false,
    requireDeposit: true
  });

  const handleSave = () => {
    toast({
      title: "Settings Updated",
      description: "Your house settings have been saved successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>House Settings</CardTitle>
          <CardDescription>
            Configure settings for {settings.houseName}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="space-y-4">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="automation">Automation</TabsTrigger>
              <TabsTrigger value="branding">Branding</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="houseName">House Name</Label>
                  <Input
                    id="houseName"
                    value={settings.houseName}
                    onChange={(e) => setSettings({ ...settings, houseName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={settings.location}
                    onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Input
                    id="currency"
                    value={settings.currency}
                    onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input
                    id="timezone"
                    value={settings.timezone}
                    onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={settings.description}
                  onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                  rows={3}
                />
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive email notifications for new applications and payments</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="smsNotifications">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive SMS notifications for urgent matters</p>
                  </div>
                  <Switch
                    id="smsNotifications"
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="automation" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoApproval">Auto-approve Applications</Label>
                    <p className="text-sm text-muted-foreground">Automatically approve applications that meet criteria</p>
                  </div>
                  <Switch
                    id="autoApproval"
                    checked={settings.autoApproval}
                    onCheckedChange={(checked) => setSettings({ ...settings, autoApproval: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="requireDeposit">Require Security Deposit</Label>
                    <p className="text-sm text-muted-foreground">Require a security deposit for all memberships</p>
                  </div>
                  <Switch
                    id="requireDeposit"
                    checked={settings.requireDeposit}
                    onCheckedChange={(checked) => setSettings({ ...settings, requireDeposit: checked })}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="branding" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="logo">House Logo</Label>
                  <Input id="logo" type="file" accept="image/*" />
                  <p className="text-sm text-muted-foreground">Upload a logo for this house location</p>
                </div>
                <div>
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <Input id="primaryColor" type="color" defaultValue="#000000" />
                </div>
                <div>
                  <Label htmlFor="heroImage">Hero Image</Label>
                  <Input id="heroImage" type="file" accept="image/*" />
                  <p className="text-sm text-muted-foreground">Main image for the house landing page</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end pt-6">
            <Button onClick={handleSave}>Save Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;
