import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, CheckCircle, Clock, XCircle, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PaymentManagementProps {
  houseId: string;
}

const PaymentManagement: React.FC<PaymentManagementProps> = ({ houseId }) => {
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data - in real app this would come from API
  const payments = [
    {
      id: '1',
      memberName: 'Sarah Kimani',
      amount: 25000,
      currency: 'KES',
      type: 'monthly',
      status: 'completed',
      billingPeriod: '2024-02-01 to 2024-02-29',
      createdAt: '2024-02-01',
      retryCount: 0
    },
    {
      id: '2',
      memberName: 'David Ochieng',
      amount: 15000,
      currency: 'KES',
      type: 'monthly',
      status: 'failed',
      billingPeriod: '2024-02-01 to 2024-02-29',
      createdAt: '2024-02-01',
      retryCount: 2,
      failureReason: 'Insufficient funds'
    },
    {
      id: '3',
      memberName: 'Mary Wanjiku',
      amount: 45000,
      currency: 'KES',
      type: 'monthly',
      status: 'pending',
      billingPeriod: '2024-02-01 to 2024-02-29',
      createdAt: '2024-02-01',
      retryCount: 0
    },
    {
      id: '4',
      memberName: 'John Kamau',
      amount: 10000,
      currency: 'KES',
      type: 'initiation',
      status: 'completed',
      billingPeriod: 'One-time setup fee',
      createdAt: '2024-01-28',
      retryCount: 0
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: { color: 'bg-green-500', icon: CheckCircle },
      pending: { color: 'bg-yellow-500', icon: Clock },
      failed: { color: 'bg-red-500', icon: XCircle },
      refunded: { color: 'bg-gray-500', icon: AlertCircle }
    };
    const variant = variants[status as keyof typeof variants] || variants.pending;
    const Icon = variant.icon;
    
    return (
      <Badge className={variant.color}>
        <Icon className="h-3 w-3 mr-1" />
        {status}
      </Badge>
    );
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      monthly: 'bg-blue-500',
      annual: 'bg-purple-500',
      initiation: 'bg-orange-500',
      prorated: 'bg-teal-500'
    };
    return (
      <Badge className={colors[type as keyof typeof colors] || 'bg-gray-500'}>
        {type}
      </Badge>
    );
  };

  const handleRetryPayment = async (paymentId: string) => {
    try {
      // Here you would make API call to retry payment
      console.log(`Retrying payment ${paymentId}`);
      
      toast({
        title: "Payment Retry Initiated",
        description: "The payment retry has been queued for processing.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to retry payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredPayments = payments.filter(payment => 
    statusFilter === 'all' || payment.status === statusFilter
  );

  const totalRevenue = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const failedPayments = payments.filter(p => p.status === 'failed').length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              KSh {totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Failed Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{failedPayments}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {Math.round(((payments.length - failedPayments) / payments.length) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">Payment success</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>Payment Management</CardTitle>
              <CardDescription>Monitor and manage all payments</CardDescription>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Billing Period</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{payment.memberName}</p>
                        {payment.failureReason && (
                          <p className="text-xs text-red-600">{payment.failureReason}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {payment.currency} {payment.amount.toLocaleString()}
                        </p>
                        {payment.retryCount > 0 && (
                          <p className="text-xs text-muted-foreground">
                            Retry #{payment.retryCount}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(payment.type)}</TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    <TableCell>
                      <p className="text-sm">{payment.billingPeriod}</p>
                    </TableCell>
                    <TableCell>{new Date(payment.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {payment.status === 'failed' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRetryPayment(payment.id)}
                        >
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Retry
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredPayments.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No payments found.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentManagement;
