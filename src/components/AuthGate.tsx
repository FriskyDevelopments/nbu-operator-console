import { useAuth } from "@workos-inc/authkit-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { LockKey, SignIn, UserPlus } from "@phosphor-icons/react";

interface AuthGateProps {
  children: React.ReactNode;
}

export function AuthGate({ children }: AuthGateProps) {
  const { isLoading, user, signIn, signUp } = useAuth();

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background font-body flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-pulse">
            <LockKey size={48} className="text-primary mx-auto mb-4" />
          </div>
          <p className="font-mono text-sm uppercase tracking-wider text-foreground/60">
            Authenticating...
          </p>
        </motion.div>
      </div>
    );
  }

  // Show sign-in UI for unauthenticated users
  if (!user) {
    return (
      <div className="min-h-screen bg-background font-body flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="font-display text-6xl md:text-8xl font-bold tracking-[0.05em] text-foreground uppercase mb-6">
            NEBU
          </h1>
          <p className="font-display text-xl md:text-2xl font-semibold tracking-wide text-foreground/80 mb-4 uppercase">
            Operator Access Required
          </p>
          <p className="font-body text-sm text-foreground/40 max-w-md mx-auto">
            Sign in to access the operator control system
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="glass-panel p-8 w-full max-w-sm">
            <div className="flex items-center justify-center mb-6">
              <LockKey size={32} className="text-primary" />
            </div>

            <div className="space-y-4">
              <Button
                onClick={() => signIn()}
                className="w-full bg-primary/30 hover:bg-primary/40 border-primary/30 text-primary font-mono text-sm uppercase tracking-wider h-12"
              >
                <SignIn size={20} weight="bold" className="mr-2" />
                Sign In
              </Button>

              <Button
                onClick={() => signUp()}
                variant="secondary"
                className="w-full font-mono text-sm uppercase tracking-wider h-12"
              >
                <UserPlus size={20} weight="bold" className="mr-2" />
                Create Account
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  // User is authenticated - render children with user context available
  return <>{children}</>;
}

// Export a user info component for the header
export function UserMenu() {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-xs text-foreground/60">
        {user.firstName ?? user.email}
      </span>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => signOut()}
        className="glass-panel hover:glass-panel-hover font-mono text-xs uppercase"
      >
        Sign Out
      </Button>
    </div>
  );
}
