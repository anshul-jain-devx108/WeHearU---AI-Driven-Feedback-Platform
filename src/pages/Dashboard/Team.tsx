
import React from 'react';
import { Users, UserPlus, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

// Sample team data
const teamMembers = [
  {
    id: 1,
    name: 'Alex Johnson',
    role: 'Product Manager',
    email: 'alex@example.com',
    phone: '+1 (555) 123-4567',
    avatar: '/placeholder.svg',
    department: 'Product',
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'UI/UX Designer',
    email: 'sarah@example.com',
    phone: '+1 (555) 234-5678',
    avatar: '/placeholder.svg',
    department: 'Design',
  },
  {
    id: 3,
    name: 'Raj Patel',
    role: 'Frontend Developer',
    email: 'raj@example.com',
    phone: '+1 (555) 345-6789',
    avatar: '/placeholder.svg',
    department: 'Engineering',
  },
  {
    id: 4,
    name: 'Maria Garcia',
    role: 'Backend Developer',
    email: 'maria@example.com',
    phone: '+1 (555) 456-7890',
    avatar: '/placeholder.svg',
    department: 'Engineering',
  },
  {
    id: 5,
    name: 'James Wilson',
    role: 'Data Analyst',
    email: 'james@example.com',
    phone: '+1 (555) 567-8901',
    avatar: '/placeholder.svg',
    department: 'Analytics',
  },
];

// Department colors for badges
const departmentColors: Record<string, string> = {
  'Product': 'bg-blue-100 text-blue-800',
  'Design': 'bg-purple-100 text-purple-800',
  'Engineering': 'bg-green-100 text-green-800',
  'Analytics': 'bg-yellow-100 text-yellow-800',
  'Marketing': 'bg-pink-100 text-pink-800',
};

const TeamMemberCard: React.FC<{ member: typeof teamMembers[0] }> = ({ member }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{member.name}</CardTitle>
            <CardDescription className="text-sm">{member.role}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="mt-2">
          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${departmentColors[member.department]}`}>
            {member.department}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="ghost" size="sm" className="flex gap-2">
          <Mail className="h-4 w-4" />
          Email
        </Button>
        <Button variant="ghost" size="sm" className="flex gap-2">
          <Phone className="h-4 w-4" />
          Call
        </Button>
      </CardFooter>
    </Card>
  );
};

const Team: React.FC = () => {
  const { toast } = useToast();
  
  const handleInvite = () => {
    toast({
      title: "Invitation Sent",
      description: "Team member invitation has been sent successfully.",
    });
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Team Members</h1>
          <p className="text-muted-foreground">Manage your team and their access.</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
              <DialogDescription>
                Send an invitation email to add a new team member.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                  Name
                </label>
                <input
                  id="name"
                  className="col-span-3 p-2 border rounded"
                  placeholder="John Doe"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="email" className="text-right">
                  Email
                </label>
                <input
                  id="email"
                  className="col-span-3 p-2 border rounded"
                  placeholder="john@example.com"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="role" className="text-right">
                  Role
                </label>
                <select
                  id="role"
                  className="col-span-3 p-2 border rounded"
                >
                  <option value="">Select a role</option>
                  <option value="admin">Admin</option>
                  <option value="member">Member</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleInvite}>Send Invitation</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Team Directory</h2>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Contact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        {member.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${departmentColors[member.department]}`}>
                        {member.department}
                      </span>
                    </TableCell>
                    <TableCell>{member.role}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Phone className="h-4 w-4" />
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
    </div>
  );
};

export default Team;
