import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Users,
  FileText,
  CreditCard,
  TrendingUp,
  Building,
  Settings,
  Mail,
  UserPlus,
  Shield,
  Home,
  LogOut
} from 'lucide-react';

interface AdminSidebarProps {
  houseId: string;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ houseId }) => {
  const location = useLocation();
  
  const navigationItems = [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'Members', href: '/admin/members', icon: Users },
    { name: 'Applications', href: '/admin/applications', icon: FileText },
    { name: 'Payments', href: '/admin/payments', icon: CreditCard },
    { name: 'Analytics', href: '/admin/analytics', icon: TrendingUp },
    { name: 'Memberships', href: '/admin/memberships', icon: UserPlus },
    { name: 'Email Center', href: '/admin/emails', icon: Mail },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const adminItems = [
    { name: 'User Management', href: '/admin/users', icon: Shield },
  ];

  return (
    <div className="w-64 bg-card border-r border-border h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <Building className="h-8 w-8 text-primary" />
          <div>
            <h2 className="font-semibold text-lg">HQ House Admin</h2>
            <p className="text-sm text-muted-foreground">
              {houseId === 'kenya' ? 'Kenya' : 'Washington DC'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={`${item.href}?house=${houseId}`}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="mt-8">
          <h3 className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Administration
          </h3>
          <div className="space-y-2">
            {adminItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={`${item.href}?house=${houseId}`}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <button className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted w-full">
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
