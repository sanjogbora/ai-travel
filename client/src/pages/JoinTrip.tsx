import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Users, ArrowLeft } from "lucide-react";

export default function JoinTrip() {
  const [, setLocation] = useLocation();
  const [inviteCode, setInviteCode] = useState("");

  const handleJoin = () => {
    if (inviteCode.trim()) {
      setLocation("/board");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="max-w-md w-full p-8">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Users className="w-8 h-8 text-primary" />
          </div>
        </div>

        <h1 className="font-serif text-3xl font-bold text-center mb-2" data-testid="text-heading">
          Join a Trip
        </h1>
        <p className="text-muted-foreground text-center mb-8">
          Enter the invite code shared by your trip organizer
        </p>

        <div className="space-y-4">
          <div>
            <label htmlFor="invite-code" className="text-sm font-medium mb-2 block">
              Invite Code
            </label>
            <Input
              id="invite-code"
              placeholder="e.g., PARIS2024"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
              className="text-center text-lg tracking-wider font-mono"
              data-testid="input-invite-code"
            />
          </div>

          <Button
            className="w-full"
            onClick={handleJoin}
            disabled={!inviteCode.trim()}
            data-testid="button-join"
          >
            Join Trip
          </Button>

          <Button
            variant="ghost"
            className="w-full"
            onClick={() => setLocation("/")}
            data-testid="button-back"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Home
          </Button>
        </div>

        <div className="mt-8 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            Don't have a code? Ask your trip organizer to share the invite link
          </p>
        </div>
      </Card>
    </div>
  );
}
