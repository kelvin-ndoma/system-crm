import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { UserPlus, Edit, Trash2, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserManagementProps {
  houseId: string;
}

const UserManagement: React.FC<UserManagementProps> = ({ houseId }) => {
  const { toast } = useToast();
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  // Mock admin users data
  const adminUsers = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Admin',
      email: 'john.admin@hqhouse.com',
      role: 'super_admin',
      assignedHouses: ['kenya', 'dc'],
      permissions: ['view', 'create', 'edit', 'delete'],
      isActive: true,
      lastLoginAt: '2024-01-30',
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      firstName: 'Sarah',
      lastName: 'Manager',
      email: 'sarah.manager@hqhouse.com',
      role: 'admin',
      assignedHouses: ['kenya'],
      permissions: ['view', 'create', 'edit'],
      isActive: true,
      lastLoginAt: '2024-01-29',
      createdAt: '2024-01-15'
    },
    {
      id: '3',
      firstName: 'Mike',
      lastName: 'Staff',
      email: 'mike.staff@hqhouse.com',
      role: 'manager',
      assignedHouses: ['dc'],
      permissions: ['view', 'create'],
      isActive: false,
      lastLoginAt: '2024-01-25',
      createdAt: '2024-01-20'
    }
  ];

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      super_admin: { label: 'Super Admin', color: 'bg-purple-500' },
      admin: { label: 'Admin', color: 'bg-blue-500' },
      manager: { label: 'Manager', color: 'bg-green-500' }
    };
    const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.manager;
    
    return (
      <Badge className={config.color}>
        <Shield className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const AddUserForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" placeholder="John" />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" placeholder="Doe" />
        </div>
      </div>
      
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="john@example.com" />
      </div>
      
      <div>
        <Label htmlFor="role">Role</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="super_admin">Super Admin</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label>Assigned Houses</Label>
        <div className="flex gap-4 mt-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="kenya" />
            <Label htmlFor="kenya">Kenya</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="dc" />
            <Label htmlFor="dc">Washington DC</Label>
          </div>
        </div>
      </div>
      
      <div>
        <Label>Permissions</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {['view', 'create', 'edit', 'delete'].map((permission) => (
            <div key={permission} className="flex items-center space-x-2">
              <Checkbox id={permission} />
              <Label htmlFor={permission} className="capitalize">{permission}</Label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex gap-4 pt-4">
        <Button onClick={() => setIsAddUserOpen(false)}>Add User</Button>
        <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>Cancel</Button>
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage admin users and their permissions</CardDescription>
          </div>
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Admin User
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Admin User</DialogTitle>
                <DialogDescription>
                  Create a new admin user with specific permissions and house assignments
                </DialogDescription>
              </DialogHeader>
              <AddUserForm />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Assigned Houses</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.firstName} {user.lastName}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {user.assignedHouses.map((house) => (
                        <Badge key={house} variant="outline" className="text-xs">
                          {house.toUpperCase()}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {user.permissions.map((permission) => (
                        <Badge key={permission} variant="secondary" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.isActive ? "default" : "secondary"}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(user.lastLoginAt).toLocaleDateString()}</TableCell>
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
        </div>
      </CardContent>
    </Card>
  );
};

export default UserManagement;
