import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ProgressStepper } from "@/components/ProgressStepper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPlus, Mail, Copy, Check, Users, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function InviteMembers() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [invitedMembers, setInvitedMembers] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [inviteCode, setInviteCode] = useState("TRIP2024");

  useEffect(() => {
    const destinationId = localStorage.getItem("destinationId") || "destination";
    const year = new Date().getFullYear();
    const code = `${destinationId.toUpperCase().slice(0, 5)}${year}`;
    setInviteCode(code);
  }, []);

  const handleAddEmail = () => {
    if (email.trim() && email.includes("@")) {
      setInvitedMembers([...invitedMembers, email.trim()]);
      setEmail("");
      toast({
        title: "Invite sent!",
        description: `${email} will receive an email invitation.`,
      });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/join?code=${inviteCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Link copied!",
      description: "Share this link with your travel crew",
    });
  };

  const handleContinue = () => {
    setLocation("/board");
  };

  const handleSkip = () => {
    setLocation("/board");
  };

  const getInitials = (email: string) => {
    return email.slice(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background">
      <ProgressStepper
        steps={[
          { number: 1, label: "Group", completed: true, current: false },
          { number: 2, label: "Budget", completed: true, current: false },
          { number: 3, label: "Location", completed: true, current: false },
          { number: 4, label: "Dates", completed: true, current: false },
          { number: 5, label: "Destination", completed: true, current: false },
          { number: 6, label: "Invite", completed: false, current: true },
        ]}
      />
      
      <div className="flex items-center justify-center p-6 pt-12">
        <Card className="max-w-2xl w-full p-8">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Users className="w-8 h-8 text-primary" />
          </div>
        </div>

        <h1 className="font-serif text-4xl font-bold text-center mb-2" data-testid="text-heading">
          Invite Your Travel Crew
        </h1>
        <p className="text-muted-foreground text-center mb-8">
          Planning is better together! Invite friends and family to vote on activities, share ideas, and build the perfect itinerary.
        </p>

        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-3 block flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Invite by Email
            </label>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="friend@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddEmail()}
                data-testid="input-email"
              />
              <Button onClick={handleAddEmail} disabled={!email.trim()} data-testid="button-send-invite">
                <UserPlus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {invitedMembers.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm font-medium">Invited ({invitedMembers.length})</p>
              <div className="flex flex-wrap gap-2">
                {invitedMembers.map((member, index) => (
                  <div key={index} className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg" data-testid={`invited-member-${index}`}>
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs">{getInitials(member)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{member}</span>
                    <Badge variant="secondary" className="text-xs">Pending</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or share invite link</span>
            </div>
          </div>

          <div className="p-4 bg-muted rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium mb-1">Your Trip Code</p>
                <p className="text-2xl font-bold font-mono tracking-wider" data-testid="text-invite-code">{inviteCode}</p>
              </div>
              <Button
                variant="outline"
                onClick={handleCopyLink}
                data-testid="button-copy-link"
              >
                {copied ? <Check className="mr-2 w-4 h-4" /> : <Copy className="mr-2 w-4 h-4" />}
                {copied ? "Copied!" : "Copy Link"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Anyone with this code can join your trip and start collaborating
            </p>
          </div>

          <div className="bg-primary/5 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Users className="w-4 h-4" />
              What collaborators can do:
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Swipe on activities and vote on what the group should do</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Leave comments and suggestions on hotels, flights, and activities</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>See real-time updates as the itinerary comes together</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Help finalize bookings and split costs</span>
              </li>
            </ul>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setLocation("/onboarding/destination")}
              data-testid="button-back"
            >
              Back
            </Button>
            <Button
              variant="outline"
              onClick={handleSkip}
              className="flex-1"
              data-testid="button-skip"
            >
              I'll invite later
            </Button>
            <Button
              onClick={handleContinue}
              className="flex-1"
              data-testid="button-continue"
            >
              Continue to Trip
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
        </Card>
      </div>
    </div>
  );
}
