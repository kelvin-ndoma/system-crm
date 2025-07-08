import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, DollarSign, Users, Building2 } from 'lucide-react';
import { MembershipType } from '@/types';

interface MembershipManagementProps {
  houseId: string;
}

const MembershipManagement: React.FC<MembershipManagementProps> = ({ houseId }) => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingMembership, setEditingMembership] = useState<MembershipType | null>(null);

  // Mock data - in real app this would come from API
  const memberships: MembershipType[] = [
    {
      id: '1',
      name: 'Co-Working',
      description: 'Access to shared workspace and basic amenities',
      monthlyPrice: houseId === 'kenya' ? 25000 : 150,
      annualPrice: houseId === 'kenya' ? 250000 : 1500,
      initiationFee: houseId === 'kenya' ? 10000 : 100,
      currency: houseId === 'kenya' ? 'KSh' : 'USD',
      features: ['Shared workspace', 'WiFi', 'Coffee/Tea', 'Basic meeting rooms'],
      accessLevel: 'basic',
      billingInterval: 'monthly',
      isActive: true,
      houseId
    },
    {
      id: '2',
      name: 'Business',
      description: 'Enhanced workspace with dedicated desk options',
      monthlyPrice: houseId === 'kenya' ? 45000 : 300,
      annualPrice: houseId === 'kenya' ? 450000 : 3000,
      initiationFee: houseId === 'kenya' ? 15000 : 150,
      currency: houseId === 'kenya' ? 'KSh' : 'USD',
      features: ['Dedicated desk', 'Priority booking', 'Phone booth access', 'Storage locker'],
      accessLevel: 'premium',
      billingInterval: 'monthly',
      isActive: true,
      houseId
    },
    {
      id: '3',
      name: 'Executive',
      description: 'Premium workspace with private office access',
      monthlyPrice: houseId === 'kenya' ? 75000 : 500,
      annualPrice: houseId === 'kenya' ? 750000 : 5000,
      initiationFee: houseId === 'kenya' ? 25000 : 250,
      currency: houseId === 'kenya' ? 'KSh' : 'USD',
      features: ['Private office', 'Executive lounge', 'Concierge service', 'Guest passes'],
      accessLevel: 'executive',
      billingInterval: 'monthly',
      isActive: true,
      houseId
    },
    {
      id: '4',
      name: 'Corporate',
      description: 'Team workspace for 5-20 members with dedicated area',
      monthlyPrice: houseId === 'kenya' ? 200000 : 1200,
      annualPrice: houseId === 'kenya' ? 2000000 : 12000,
      initiationFee: houseId === 'kenya' ? 50000 : 500,
      currency: houseId === 'kenya' ? 'KSh' : 'USD',
      features: ['Team workspace', 'Multiple desks', 'Private meeting rooms', 'Admin dashboard'],
      accessLevel: 'corporate',
      maxMembers: 20,
      billingInterval: 'monthly',
      isActive: true,
      houseId
    }
  ];

  const MembershipForm = ({ membership }: { membership?: MembershipType }) => {
    const [formData, setFormData] = useState<Partial<MembershipType>>(
      membership || {
        name: '',
        description: '',
        monthlyPrice: 0,
        annualPrice: 0,
        initiationFee: 0,
        currency: houseId === 'kenya' ? 'KSh' : 'USD',
        features: [],
        accessLevel: 'basic',
        billingInterval: 'monthly',
        isActive: true,
        houseId
      }
    );

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Membership Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Business Plan"
            />
          </div>
          <div>
            <Label htmlFor="accessLevel">Access Level</Label>
            <Select value={formData.accessLevel} onValueChange={(value) => setFormData({ ...formData, accessLevel: value as any })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="executive">Executive</SelectItem>
                <SelectItem value="corporate">Corporate</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe the membership benefits..."
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="monthlyPrice">Monthly Price ({formData.currency})</Label>
            <Input
              id="monthlyPrice"
              type="number"
              value={formData.monthlyPrice}
              onChange={(e) => setFormData({ ...formData, monthlyPrice: Number(e.target.value) })}
            />
          </div>
          <div>
            <Label htmlFor="annualPrice">Annual Price ({formData.currency})</Label>
            <Input
              id="annualPrice"
              type="number"
              value={formData.annualPrice}
              onChange={(e) => setFormData({ ...formData, annualPrice: Number(e.target.value) })}
            />
          </div>
          <div>
            <Label htmlFor="initiationFee">Initiation Fee ({formData.currency})</Label>
            <Input
              id="initiationFee"
              type="number"
              value={formData.initiationFee}
              onChange={(e) => setFormData({ ...formData, initiationFee: Number(e.target.value) })}
            />
          </div>
        </div>

        {formData.accessLevel === 'corporate' && (
          <div>
            <Label htmlFor="maxMembers">Maximum Members</Label>
            <Input
              id="maxMembers"
              type="number"
              value={formData.maxMembers || ''}
              onChange={(e) => setFormData({ ...formData, maxMembers: Number(e.target.value) })}
              placeholder="e.g., 20"
            />
          </div>
        )}

        <div className="flex gap-4 pt-4">
          <Button onClick={() => { setIsCreateOpen(false); setEditingMembership(null); }}>
            {membership ? 'Update' : 'Create'} Membership
          </Button>
          <Button variant="outline" onClick={() => { setIsCreateOpen(false); setEditingMembership(null); }}>
            Cancel
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Membership Types</h2>
          <p className="text-muted-foreground">
            Manage membership plans for {houseId === 'kenya' ? 'HQ House Kenya' : 'HQ House DC'}
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Membership
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Membership</DialogTitle>
              <DialogDescription>
                Add a new membership type for {houseId === 'kenya' ? 'Kenya' : 'Washington DC'}
              </DialogDescription>
            </DialogHeader>
            <MembershipForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Memberships</CardTitle>
            <CardDescription>
              Currently available membership types
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Monthly Price</TableHead>
                  <TableHead>Initiation Fee</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {memberships.map((membership) => (
                  <TableRow key={membership.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{membership.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {membership.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={membership.accessLevel === 'corporate' ? 'default' : 'secondary'}>
                        {membership.accessLevel === 'corporate' && <Building2 className="h-3 w-3 mr-1" />}
                        {membership.accessLevel}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        {membership.currency} {membership.monthlyPrice.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      {membership.currency} {membership.initiationFee.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {membership.accessLevel === 'corporate' ? '15' : '42'}
                        {membership.maxMembers && ` / ${membership.maxMembers}`}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingMembership(membership)}
                        >
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
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingMembership} onOpenChange={() => setEditingMembership(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Membership</DialogTitle>
            <DialogDescription>
              Update membership details for {editingMembership?.name}
            </DialogDescription>
          </DialogHeader>
          {editingMembership && <MembershipForm membership={editingMembership} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MembershipManagement;
