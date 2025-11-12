import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DollarSign, Users, CheckCircle, Clock } from 'lucide-react';

interface ExpenseItem {
  id: string;
  name: string;
  amount: number;
  category: string;
  assignedTo: string;
  isPaid: boolean;
}

// Mock expense data
const mockExpenses: ExpenseItem[] = [
  { id: '1', name: 'Round-trip Flights', amount: 1200, category: 'Transportation', assignedTo: 'Sarah', isPaid: true },
  { id: '2', name: 'Hotel Le Marais (4 nights)', amount: 800, category: 'Accommodation', assignedTo: 'Mike', isPaid: false },
  { id: '3', name: 'Eiffel Tower Tickets', amount: 120, category: 'Activities', assignedTo: 'Emma', isPaid: true },
  { id: '4', name: 'Louvre Museum Tickets', amount: 80, category: 'Activities', assignedTo: 'Alex', isPaid: false },
  { id: '5', name: 'Seine River Cruise', amount: 60, category: 'Activities', assignedTo: 'Jordan', isPaid: true },
];

export function BudgetSplitting() {
  const totalCost = mockExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const paidAmount = mockExpenses.filter(e => e.isPaid).reduce((sum, exp) => sum + exp.amount, 0);
  const unpaidAmount = totalCost - paidAmount;
  const memberCount = 5;
  const costPerPerson = totalCost / memberCount;

  const getInitials = (name: string) => {
    return name.slice(0, 2).toUpperCase();
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Transportation':
        return 'bg-blue-500/10 text-blue-700 border-blue-200';
      case 'Accommodation':
        return 'bg-purple-500/10 text-purple-700 border-purple-200';
      case 'Activities':
        return 'bg-green-500/10 text-green-700 border-green-200';
      default:
        return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <DollarSign className="w-6 h-6" />
            Budget & Cost Splitting
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Track expenses and split costs fairly
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="text-sm text-muted-foreground mb-1">Total Trip Cost</div>
          <div className="text-3xl font-bold text-primary">
            ${totalCost.toLocaleString()}
          </div>
        </Card>

        <Card className="p-4 bg-green-500/5 border-green-500/20">
          <div className="text-sm text-muted-foreground mb-1">Paid</div>
          <div className="text-3xl font-bold text-green-600">
            ${paidAmount.toLocaleString()}
          </div>
        </Card>

        <Card className="p-4 bg-orange-500/5 border-orange-500/20">
          <div className="text-sm text-muted-foreground mb-1">Pending</div>
          <div className="text-3xl font-bold text-orange-600">
            ${unpaidAmount.toLocaleString()}
          </div>
        </Card>
      </div>

      {/* Cost per person */}
      <div className="p-4 bg-muted rounded-lg mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            <span className="font-medium">Cost per person</span>
          </div>
          <div className="text-2xl font-bold text-primary">
            ${costPerPerson.toLocaleString()}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Split equally among {memberCount} members
        </p>
      </div>

      {/* Expense list */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
          Expense Breakdown
        </h3>
        
        {mockExpenses.map((expense) => (
          <div
            key={expense.id}
            className="flex items-center gap-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium">{expense.name}</h4>
                <Badge className={`text-xs border ${getCategoryColor(expense.category)}`}>
                  {expense.category}
                </Badge>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Avatar className="w-5 h-5">
                    <AvatarFallback className="text-xs">
                      {getInitials(expense.assignedTo)}
                    </AvatarFallback>
                  </Avatar>
                  <span>{expense.assignedTo}</span>
                </div>
                {expense.isPaid ? (
                  <Badge className="bg-green-500/20 text-green-700 border-green-500/30 text-xs">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Paid
                  </Badge>
                ) : (
                  <Badge className="bg-orange-500/20 text-orange-700 border-orange-500/30 text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    Pending
                  </Badge>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold">${expense.amount}</div>
              <div className="text-xs text-muted-foreground">
                ${(expense.amount / memberCount).toFixed(0)} each
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Payment summary */}
      <div className="mt-6 pt-6 border-t">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {allMembers.map((member) => {
            const memberExpenses = mockExpenses.filter(e => e.assignedTo === member);
            const memberTotal = memberExpenses.reduce((sum, e) => sum + e.amount, 0);
            const memberOwes = costPerPerson - memberTotal;

            return (
              <div key={member} className="text-center p-3 rounded-lg bg-muted">
                <Avatar className="w-10 h-10 mx-auto mb-2">
                  <AvatarFallback className="text-xs">{getInitials(member)}</AvatarFallback>
                </Avatar>
                <div className="text-xs font-medium mb-1">{member}</div>
                <div className={`text-sm font-bold ${memberOwes > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                  {memberOwes > 0 ? `Owes $${memberOwes.toFixed(0)}` : `Paid $${Math.abs(memberOwes).toFixed(0)} extra`}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
