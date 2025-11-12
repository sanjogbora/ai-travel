import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Plus, Shirt, Droplets, Smartphone, FileText, Pill, Watch, Package } from 'lucide-react';

interface PackingItem {
  id: string;
  category: string;
  name: string;
  assignedTo?: string;
  isPacked: boolean;
}

// Mock packing list data
const mockPackingItems: PackingItem[] = [
  { id: '1', category: 'Clothing', name: 'Jackets', assignedTo: 'Sarah', isPacked: false },
  { id: '2', category: 'Clothing', name: 'Comfortable shoes', assignedTo: 'Mike', isPacked: true },
  { id: '3', category: 'Clothing', name: 'Formal outfit', assignedTo: 'Emma', isPacked: false },
  { id: '4', category: 'Toiletries', name: 'Toothbrush & toothpaste', assignedTo: 'Everyone', isPacked: true },
  { id: '5', category: 'Toiletries', name: 'Sunscreen', assignedTo: 'Sarah', isPacked: false },
  { id: '6', category: 'Electronics', name: 'Phone chargers', assignedTo: 'Everyone', isPacked: false },
  { id: '7', category: 'Electronics', name: 'Power adapter (EU)', assignedTo: 'Alex', isPacked: true },
  { id: '8', category: 'Electronics', name: 'Camera', assignedTo: 'Mike', isPacked: false },
  { id: '9', category: 'Documents', name: 'Passports', assignedTo: 'Everyone', isPacked: true },
  { id: '10', category: 'Documents', name: 'Travel insurance', assignedTo: 'Sarah', isPacked: true },
  { id: '11', category: 'Medications', name: 'First aid kit', assignedTo: 'Emma', isPacked: false },
  { id: '12', category: 'Accessories', name: 'Sunglasses', assignedTo: 'Everyone', isPacked: false },
];

const categories = [
  { name: 'Clothing', icon: Shirt, color: 'text-blue-600' },
  { name: 'Toiletries', icon: Droplets, color: 'text-cyan-600' },
  { name: 'Electronics', icon: Smartphone, color: 'text-purple-600' },
  { name: 'Documents', icon: FileText, color: 'text-orange-600' },
  { name: 'Medications', icon: Pill, color: 'text-red-600' },
  { name: 'Accessories', icon: Watch, color: 'text-green-600' },
];

export function PackingList() {
  const [items, setItems] = useState<PackingItem[]>(mockPackingItems);
  const [newItemName, setNewItemName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Clothing');

  const togglePacked = (id: string) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, isPacked: !item.isPacked } : item
      )
    );
  };

  const addItem = () => {
    if (!newItemName.trim()) return;

    const newItem: PackingItem = {
      id: Date.now().toString(),
      category: selectedCategory,
      name: newItemName,
      assignedTo: 'You',
      isPacked: false,
    };

    setItems(prev => [...prev, newItem]);
    setNewItemName('');
  };

  const getInitials = (name: string) => {
    return name.slice(0, 2).toUpperCase();
  };

  const getCategoryIcon = (categoryName: string) => {
    const category = categories.find(c => c.name === categoryName);
    if (!category) return Package;
    return category.icon;
  };

  const getCategoryColor = (categoryName: string) => {
    const category = categories.find(c => c.name === categoryName);
    return category?.color || 'text-gray-600';
  };

  const groupedItems = categories.map(category => ({
    ...category,
    items: items.filter(item => item.category === category.name),
  }));

  const totalItems = items.length;
  const packedItems = items.filter(i => i.isPacked).length;
  const progress = totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Package className="w-6 h-6" />
            Shared Packing List
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Coordinate what everyone is bringing
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-primary">{progress}%</div>
          <p className="text-xs text-muted-foreground">
            {packedItems} of {totalItems} packed
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-muted rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Add new item */}
      <div className="flex gap-2 mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border rounded-md bg-background"
        >
          {categories.map(cat => (
            <option key={cat.name} value={cat.name}>{cat.name}</option>
          ))}
        </select>
        <Input
          placeholder="Add item..."
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addItem()}
          className="flex-1"
        />
        <Button onClick={addItem} disabled={!newItemName.trim()}>
          <Plus className="w-4 h-4 mr-2" />
          Add
        </Button>
      </div>

      {/* Packing list by category */}
      <div className="space-y-6">
        {groupedItems.map(category => {
          if (category.items.length === 0) return null;
          
          const Icon = category.icon;
          const packed = category.items.filter(i => i.isPacked).length;
          
          return (
            <div key={category.name}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${category.color}`} />
                  {category.name}
                </h3>
                <Badge variant="secondary" className="text-xs">
                  {packed}/{category.items.length}
                </Badge>
              </div>
              
              <div className="space-y-2">
                {category.items.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <Checkbox
                      checked={item.isPacked}
                      onCheckedChange={() => togglePacked(item.id)}
                    />
                    
                    <span className={`flex-1 ${item.isPacked ? 'line-through text-muted-foreground' : ''}`}>
                      {item.name}
                    </span>
                    
                    {item.assignedTo && (
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">
                            {getInitials(item.assignedTo)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">
                          {item.assignedTo}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
