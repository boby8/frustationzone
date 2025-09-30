import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { Auth, TodoApp } from "./components";
import { supabase } from "./supabase-client";
import { Hero, TargetsPage, ActionPage, ActivityFeed } from "./screens";

interface Session {
  user: {
    id: string;
    email?: string;
  };
  access_token: string;
  refresh_token: string;
}

// Target data (moved here to be accessible from ActionPage)
const targets = [
  { id: "monday", name: "Monday Blues", avatar: "😴", color: "bg-gray-100" },
  { id: "deadlines", name: "Deadlines", avatar: "⏰", color: "bg-red-100" },
  { id: "traffic", name: "Traffic", avatar: "🚗", color: "bg-orange-100" },
  { id: "bugs", name: "Code Bugs", avatar: "🐛", color: "bg-purple-100" },
  { id: "meetings", name: "Meetings", avatar: "📋", color: "bg-blue-100" },
  { id: "weather", name: "Bad Weather", avatar: "⛈️", color: "bg-slate-100" },
  {
    id: "internet",
    name: "Slow Internet",
    avatar: "📶",
    color: "bg-yellow-100",
  },
  {
    id: "forgetfulness",
    name: "Forgetfulness",
    avatar: "🧠",
    color: "bg-pink-100",
  },
  { id: "stress", name: "General Stress", avatar: "😤", color: "bg-green-100" },
  {
    id: "technology",
    name: "Tech Problems",
    avatar: "💻",
    color: "bg-indigo-100",
  },
];

function ActionPageWrapper() {
  const { targetId } = useParams();
  const navigate = useNavigate();
  const userInitials = "BS"; // Default initials

  const target = targets.find((t) => t.id === targetId);

  if (!target) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>
          Target not found.{" "}
          <a href="/targets" className="text-blue-500">
            Go back to targets
          </a>
        </p>
      </div>
    );
  }

  return (
    <ActionPage
      target={target}
      onActionComplete={(action) => {
        console.log(`${userInitials} ${action}ed ${target.name}`);
        // Don't navigate automatically - let user stay and continue actions
      }}
      onBack={() => navigate("/targets")}
    />
  );
}

function AppContent() {
  const [session, setSession] = useState<Session | null>(null);

  const fetchSession = async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error) {
      console.error(error);
    } else {
      setSession(session);
    }
  };

  useEffect(() => {
    fetchSession();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state change:", event, session);
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return <Auth />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100">
        {/* Background Pattern */}

        {/* Sticky Header with user info and sign out */}
        <div className="sticky top-0 z-50 flex justify-between items-center p-4 bg-white/90 backdrop-blur-md shadow-lg border-b border-white/20">
          <h1 className="text-2xl font-bold text-gray-800">
            Frustration Zone 😡
          </h1>
          <div className="absolute inset-0 bg-amber-400">
            <button>Let me Remove u</button>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, {session.user.email}</span>
            <button
              onClick={() => supabase.auth.signOut()}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/targets" element={<TargetsPage />} />
          <Route path="/action/:targetId" element={<ActionPageWrapper />} />
          <Route path="/activity" element={<ActivityFeed />} />
          <Route path="/todos" element={<TodoApp />} />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return <AppContent />;
}

export default App;
