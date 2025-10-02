import Dashboard from "./components/Dashboard";
import logo from "../src/assets/granthX logo-dark.png";
import "./styles.css";
import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
} from "@clerk/clerk-react";

export default function App() {
  return (
    <div className="app-root dark">
      {/* Top Bar */}
      <header className="topbar">
        <div className="brand">
          <div className="logo">
            <img src={logo} alt="GranthX Logo" style={{ width: "40px", height: "auto" }} />
          </div>
          <span className="brand__name">GranthX Dashboard</span>
        </div>

        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: {
                  boxShadow: "var(--shadow-md)",
                  border: "1px solid var(--border-primary)",
                  borderRadius: "10px",
                },
                userButtonPopoverCard: {
                  backgroundColor: "var(--bg-tertiary)",
                  color: "var(--text-primary)",
                  border: "1px solid var(--border-primary)",
                },
              },
            }}
          />
        </SignedIn>
      </header>

      {/* Content */}
      <main className="content">
        <SignedIn>
          <div className="panel">
            <Dashboard />
          </div>
        </SignedIn>

        <SignedOut>
          <div className="auth">
            <div className="auth__card">
              <SignIn
                routing="hash"
                afterSignInUrl="/"
                appearance={{
                  variables: {
                    colorBackground: "var(--bg-tertiary)",
                    colorText: "var(--text-primary)",
                    colorInputText: "var(--text-primary)",
                    colorAlphaShade: "var(--border-primary)",
                    colorShimmer: "var(--bg-secondary)",
                    colorInputBackground: "var(--bg-secondary)",
                    colorPrimary: "var(--accent-green)",
                    colorInputBorder: "var(--border-primary)",
                    borderRadius: "14px",
                    fontSize: "14px",
                  },
                  elements: {
                    card: "cl-card dark-card",
                    formFieldInput:
                      "cl-input dark-input",
                    formButtonPrimary:
                      "cl-btn cl-btn--primary",
                    headerTitle: "cl-headerTitle",
                    headerSubtitle: "hidden",
                    footer: "hidden",                  // Hide “Don’t have an account? Sign up”
                    footerAction: "hidden",
                    footerActionLink: "hidden",
                    socialButtons: "cl-social--row",   // optional
                  },
                }}
                // Don’t pass signUpUrl to avoid showing it anywhere
              />
            </div>
          </div>
        </SignedOut>
      </main>
    </div>
  );
}
 