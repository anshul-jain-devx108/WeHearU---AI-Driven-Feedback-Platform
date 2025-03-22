
import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import DashboardSidebar from '@/components/Dashboard/DashboardSidebar';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';
import {
  User,
  Bell,
  Key,
  CreditCard,
  Shield,
  Loader2,
  Copy,
  RefreshCw,
} from 'lucide-react';

const Settings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, generateApiKey } = useAuth();
  
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Determine active tab from URL or default to profile
  const getTabValue = () => {
    const path = location.pathname;
    if (path.includes('/settings/api-keys')) return 'api-keys';
    if (path.includes('/settings/notifications')) return 'notifications';
    if (path.includes('/settings/billing')) return 'billing';
    if (path.includes('/settings/security')) return 'security';
    return 'profile';
  };
  
  const handleTabChange = (value: string) => {
    navigate(`/settings${value === 'profile' ? '' : `/${value}`}`);
  };

  const handleGenerateApiKey = async () => {
    setIsGeneratingKey(true);
    try {
      await generateApiKey();
      toast({
        title: "API Key Generated",
        description: "Your new API key has been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate API key. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingKey(false);
    }
  };

  const handleCopyApiKey = () => {
    if (user?.apiKey) {
      navigator.clipboard.writeText(user.apiKey);
      toast({
        title: "Copied to Clipboard",
        description: "API key has been copied to your clipboard.",
      });
    }
  };
  
  const handleSaveProfile = () => {
    setIsSaving(true);
    // Simulate API call delay
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved successfully.",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar isMobileOpen={isSidebarOpen} setIsMobileOpen={setIsSidebarOpen} />
      
      <div className="lg:ml-64 min-h-screen">
        <div className="p-6">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </div>
          
          {/* Settings tabs */}
          <Tabs value={getTabValue()} onValueChange={handleTabChange} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-2">
              <TabsTrigger value="profile" className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="api-keys" className="flex items-center">
                <Key className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">API Keys</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center">
                <Bell className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="billing" className="flex items-center">
                <CreditCard className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Billing</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Security</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Profile */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                  <CardDescription>
                    Manage your personal information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                          {user?.name?.charAt(0) || 'U'}
                        </div>
                        <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow border border-gray-200">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-center text-sm text-muted-foreground mt-2">
                        JPG, GIF or PNG. 1MB max.
                      </p>
                    </div>
                    <div className="space-y-4 flex-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" defaultValue={user?.name} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" type="email" defaultValue={user?.email} />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="company">Company</Label>
                          <Input id="company" defaultValue="Acme Inc." />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role">Job Title</Label>
                          <Input id="role" defaultValue="Product Manager" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <textarea
                          id="bio"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          rows={4}
                          defaultValue="Product manager with a passion for user experience and data-driven decision making."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleSaveProfile} disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* API Keys */}
            <TabsContent value="api-keys">
              <Card>
                <CardHeader>
                  <CardTitle>API Keys</CardTitle>
                  <CardDescription>
                    Manage API keys for integrating with WeHearU's services
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="glass-panel p-4 bg-primary/5">
                    <h3 className="text-sm font-medium mb-2">Your API Key</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Use this key to authenticate API requests from your applications.
                    </p>
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-white border rounded-lg flex-1 font-mono text-sm truncate">
                        {user?.apiKey || 'No API key generated yet'}
                      </div>
                      {user?.apiKey && (
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={handleCopyApiKey}
                          title="Copy to clipboard"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      )}
                      <Button 
                        size="icon" 
                        onClick={handleGenerateApiKey}
                        disabled={isGeneratingKey}
                        title="Generate new key"
                      >
                        {isGeneratingKey ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <RefreshCw className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      <strong>Note:</strong> Generating a new key will invalidate any existing keys.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-4">API Usage</h3>
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-muted">
                          <th className="px-4 py-2 text-left text-sm">Endpoint</th>
                          <th className="px-4 py-2 text-left text-sm">Calls (30 days)</th>
                          <th className="px-4 py-2 text-left text-sm">Last Used</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="px-4 py-3 text-sm">Feedback API</td>
                          <td className="px-4 py-3 text-sm">1,245</td>
                          <td className="px-4 py-3 text-sm">Today</td>
                        </tr>
                        <tr className="border-b">
                          <td className="px-4 py-3 text-sm">Sentiment Analysis</td>
                          <td className="px-4 py-3 text-sm">856</td>
                          <td className="px-4 py-3 text-sm">Yesterday</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm">Reporting API</td>
                          <td className="px-4 py-3 text-sm">432</td>
                          <td className="px-4 py-3 text-sm">3 days ago</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Documentation</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Get started integrating with our APIs by checking out our comprehensive documentation.
                    </p>
                    <Button variant="outline">View API Documentation</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Notifications */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>
                    Manage your notification preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Email Notifications</h3>
                    {[
                      { 
                        id: "email-feedback", 
                        label: "New Feedback", 
                        description: "Get notified when new feedback is received",
                        defaultChecked: true
                      },
                      { 
                        id: "email-reports", 
                        label: "Weekly Reports", 
                        description: "Receive weekly summary reports of your feedback",
                        defaultChecked: true
                      },
                      { 
                        id: "email-alerts", 
                        label: "Negative Feedback Alerts", 
                        description: "Get immediate alerts for negative feedback",
                        defaultChecked: true
                      },
                      { 
                        id: "email-marketing", 
                        label: "Product Updates", 
                        description: "Stay informed about new features and improvements",
                        defaultChecked: false
                      },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between py-3 border-b last:border-0">
                        <div>
                          <Label htmlFor={item.id} className="font-medium">
                            {item.label}
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                        <Switch id={item.id} defaultChecked={item.defaultChecked} />
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">In-App Notifications</h3>
                    {[
                      { 
                        id: "app-feedback", 
                        label: "New Feedback", 
                        description: "Show notifications for new feedback",
                        defaultChecked: true
                      },
                      { 
                        id: "app-mentions", 
                        label: "Mentions", 
                        description: "Notify when you're mentioned in comments",
                        defaultChecked: true
                      },
                      { 
                        id: "app-reminders", 
                        label: "Task Reminders", 
                        description: "Remind you about assigned feedback tasks",
                        defaultChecked: false
                      },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between py-3 border-b last:border-0">
                        <div>
                          <Label htmlFor={item.id} className="font-medium">
                            {item.label}
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                        <Switch id={item.id} defaultChecked={item.defaultChecked} />
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => toast({ title: "Notification preferences saved" })}>
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Billing */}
            <TabsContent value="billing">
              <Card>
                <CardHeader>
                  <CardTitle>Billing</CardTitle>
                  <CardDescription>
                    Manage your subscription and billing information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-primary/5 border border-primary/10 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium">Professional Plan</h3>
                        <p className="text-sm text-muted-foreground">
                          $79/month, billed monthly
                        </p>
                      </div>
                      <div className="bg-primary text-white text-xs font-medium py-1 px-3 rounded-full">
                        Active
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t flex items-center justify-between">
                      <div>
                        <p className="text-sm">Next billing date: <strong>June 15, 2023</strong></p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Your subscription will automatically renew on this date.
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Change Plan</Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-4">Payment Method</h3>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <svg className="h-8 w-8" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="40" height="24" rx="4" fill="#E9ECEF"/>
                          <path d="M29.617 10.048H27.326V15.453H29.617V10.048Z" fill="#2566AF"/>
                          <path d="M27.427 10.048C26.779 10.048 26.243 10.268 25.888 10.708L25.886 10.705L25.889 10.708C26.243 10.268 26.779 10.048 27.427 10.048Z" fill="#E6A540"/>
                          <path fillRule="evenodd" clipRule="evenodd" d="M27.427 10.048C28.809 10.048 29.933 11.146 29.933 12.496C29.933 13.846 28.809 14.944 27.427 14.944C26.046 14.944 24.922 13.846 24.922 12.496C24.922 11.146 26.046 10.048 27.427 10.048Z" fill="#EB001B"/>
                          <path d="M32.5 12.496C32.5 9.857 30.273 7.694 27.555 7.694C26.118 7.694 24.811 8.266 23.878 9.18C24.805 8.272 26.103 7.705 27.532 7.705C30.251 7.705 32.477 9.867 32.477 12.507C32.477 15.147 30.251 17.309 27.532 17.309C26.103 17.309 24.805 16.741 23.878 15.834C24.811 16.747 26.118 17.319 27.555 17.319C30.273 17.319 32.5 15.147 32.5 12.507V12.496Z" fill="#4DB45E"/>
                        </svg>
                        <div>
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-xs text-muted-foreground">Expires 12/2025</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-4">Billing History</h3>
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-muted">
                          <th className="px-4 py-2 text-left text-sm">Date</th>
                          <th className="px-4 py-2 text-left text-sm">Description</th>
                          <th className="px-4 py-2 text-left text-sm">Amount</th>
                          <th className="px-4 py-2 text-left text-sm">Status</th>
                          <th className="px-4 py-2 text-left text-sm">Receipt</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { date: "May 15, 2023", desc: "Professional Plan", amount: "$79.00", status: "Paid" },
                          { date: "Apr 15, 2023", desc: "Professional Plan", amount: "$79.00", status: "Paid" },
                          { date: "Mar 15, 2023", desc: "Professional Plan", amount: "$79.00", status: "Paid" },
                        ].map((item, i) => (
                          <tr key={i} className="border-b">
                            <td className="px-4 py-3 text-sm">{item.date}</td>
                            <td className="px-4 py-3 text-sm">{item.desc}</td>
                            <td className="px-4 py-3 text-sm">{item.amount}</td>
                            <td className="px-4 py-3 text-sm">
                              <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                {item.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <Button variant="ghost" size="sm" className="h-7 px-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                                </svg>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Security */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>
                    Manage your account security settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                      <Button>Update Password</Button>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="text-sm font-medium mb-4">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Protect your account with 2FA</p>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Button variant="outline">Enable 2FA</Button>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="text-sm font-medium mb-4">Sessions</h3>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">Current Session</p>
                            <p className="text-sm text-muted-foreground">
                              Chrome on Windows • IP: 192.168.1.1
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Last active: Just now
                            </p>
                          </div>
                          <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Active
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">Safari on MacOS</p>
                            <p className="text-sm text-muted-foreground">
                              IP: 192.168.1.2
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Last active: 2 days ago
                            </p>
                          </div>
                          <Button variant="outline" size="sm">Logout</Button>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="mt-4 text-red-600 hover:text-red-700 hover:bg-red-50">
                      Logout from all devices
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Settings;
