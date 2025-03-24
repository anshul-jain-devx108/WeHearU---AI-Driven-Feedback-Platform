
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { 
  Coffee, 
  Thermometer,
  Timer,
  Check,
  CupSoda,
  Clock
} from 'lucide-react';
import DashboardSidebar from '@/components/Dashboard/DashboardSidebar';

const teaTypes = [
  { id: 'black', name: 'Black Tea', brewTime: 4, temperature: '95°C', color: 'bg-amber-900' },
  { id: 'green', name: 'Green Tea', brewTime: 3, temperature: '80°C', color: 'bg-green-600' },
  { id: 'herbal', name: 'Herbal Tea', brewTime: 5, temperature: '100°C', color: 'bg-rose-400' },
  { id: 'oolong', name: 'Oolong Tea', brewTime: 3, temperature: '85°C', color: 'bg-amber-600' },
  { id: 'white', name: 'White Tea', brewTime: 2, temperature: '75°C', color: 'bg-gray-200' },
];

const Tea = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTea, setSelectedTea] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [sugar, setSugar] = useState('none');
  const [milk, setMilk] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const handleTeaSelect = (value: string) => {
    setSelectedTea(value);
    setIsDone(false);
  };

  const handlePrepareTea = () => {
    if (!selectedTea) {
      toast.error("Please select a tea type");
      return;
    }
    
    setIsPreparing(true);
    setIsDone(false);
    
    const tea = teaTypes.find(t => t.id === selectedTea);
    if (!tea) return;
    
    let brewTime = tea.brewTime;
    setTimeLeft(brewTime * 60);
    
    // Simulate brewing progress
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsPreparing(false);
          setIsDone(true);
          toast.success(`Your ${tea.name} is ready!`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getSelectedTeaDetails = () => {
    return teaTypes.find(t => t.id === selectedTea);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar isMobileOpen={isSidebarOpen} setIsMobileOpen={setIsSidebarOpen} />
      
      <div className="lg:ml-64 min-h-screen">
        <div className="p-6">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight">Tea Station</h1>
            <p className="text-muted-foreground">
              Prepare and customize your perfect cup of tea
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tea selection and customization */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Coffee className="mr-2 h-5 w-5" />
                Tea Selection
              </h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="tea-type">Tea Type</Label>
                  <Select value={selectedTea} onValueChange={handleTeaSelect}>
                    <SelectTrigger id="tea-type">
                      <SelectValue placeholder="Select tea type" />
                    </SelectTrigger>
                    <SelectContent>
                      {teaTypes.map(tea => (
                        <SelectItem key={tea.id} value={tea.id}>
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full ${tea.color} mr-2`}></div>
                            {tea.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <div className="flex items-center">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      disabled={isPreparing}
                    >
                      -
                    </Button>
                    <Input 
                      id="quantity"
                      type="number" 
                      min="1" 
                      max="10"
                      value={quantity} 
                      onChange={e => setQuantity(parseInt(e.target.value) || 1)}
                      className="mx-2 w-20 text-center"
                      disabled={isPreparing}
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setQuantity(q => Math.min(10, q + 1))}
                      disabled={isPreparing}
                    >
                      +
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sugar">Sugar</Label>
                  <Select value={sugar} onValueChange={setSugar} disabled={isPreparing}>
                    <SelectTrigger id="sugar">
                      <SelectValue placeholder="Sugar preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="sweet">Sweet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="milk"
                    checked={milk}
                    onChange={() => setMilk(!milk)}
                    className="rounded border-gray-300"
                    disabled={isPreparing}
                  />
                  <Label htmlFor="milk">Add milk</Label>
                </div>
                
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handlePrepareTea}
                  disabled={!selectedTea || isPreparing}
                >
                  {isPreparing ? 'Brewing...' : 'Prepare Tea'}
                </Button>
              </div>
            </div>
            
            {/* Tea preparation status */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <CupSoda className="mr-2 h-5 w-5" />
                Tea Status
              </h2>
              
              {selectedTea ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full ${getSelectedTeaDetails()?.color} mr-3 flex items-center justify-center`}>
                        <Coffee className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">{getSelectedTeaDetails()?.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {quantity} cup{quantity > 1 ? 's' : ''} • 
                          {sugar !== 'none' && ` ${sugar} sugar •`}
                          {milk ? ' with milk' : ' without milk'}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center text-sm">
                      <Thermometer className="h-4 w-4 mr-2" />
                      <span>Optimal Temperature: {getSelectedTeaDetails()?.temperature}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Timer className="h-4 w-4 mr-2" />
                      <span>Brew Time: {getSelectedTeaDetails()?.brewTime} minutes</span>
                    </div>
                  </div>
                  
                  {isPreparing && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Brewing in progress</span>
                        <span className="text-sm font-mono">{formatTime(timeLeft)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-primary h-2.5 rounded-full" 
                          style={{ 
                            width: `${(1 - (timeLeft / (getSelectedTeaDetails()?.brewTime || 1) / 60)) * 100}%` 
                          }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Your tea is being prepared...</p>
                    </div>
                  )}
                  
                  {isDone && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <Check className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-green-800">Your tea is ready!</h3>
                        <p className="text-sm text-green-600">Enjoy your perfect cup of {getSelectedTeaDetails()?.name}</p>
                      </div>
                    </div>
                  )}
                  
                  {!isPreparing && !isDone && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <Clock className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-blue-800">Ready to brew</h3>
                        <p className="text-sm text-blue-600">Click 'Prepare Tea' to start brewing</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Coffee className="h-16 w-16 text-muted-foreground/40 mb-4" />
                  <h3 className="text-lg font-medium text-muted-foreground">No Tea Selected</h3>
                  <p className="text-muted-foreground mt-1">
                    Select a tea type to get started
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Tea guide */}
          <div className="glass-card p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4">Tea Brewing Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {teaTypes.map(tea => (
                <div key={tea.id} className="border rounded-lg p-4 flex flex-col">
                  <div className={`w-8 h-8 rounded-full ${tea.color} mb-2 flex items-center justify-center`}>
                    <Coffee className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="font-medium">{tea.name}</h3>
                  <div className="mt-2 text-sm text-muted-foreground space-y-1">
                    <div className="flex items-center">
                      <Thermometer className="h-3 w-3 mr-1 flex-shrink-0" />
                      <span>{tea.temperature}</span>
                    </div>
                    <div className="flex items-center">
                      <Timer className="h-3 w-3 mr-1 flex-shrink-0" />
                      <span>{tea.brewTime} minutes</span>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-auto"
                    onClick={() => {
                      setSelectedTea(tea.id);
                      setIsDone(false);
                    }}
                  >
                    Select
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tea;
