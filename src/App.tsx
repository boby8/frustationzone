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
  { id: "boss", name: "Boss", avatar: "👔", color: "bg-red-100" },
  { id: "client", name: "Client", avatar: "💼", color: "bg-blue-100" },
  { id: "monday", name: "Monday", avatar: "😴", color: "bg-gray-100" },
  { id: "exams", name: "Exams", avatar: "📚", color: "bg-yellow-100" },
  { id: "traffic", name: "Traffic", avatar: "🚗", color: "bg-orange-100" },
  { id: "ex", name: "Ex", avatar: "💔", color: "bg-pink-100" },
  { id: "taxes", name: "Taxes", avatar: "💰", color: "bg-green-100" },
  { id: "bugs", name: "Bugs", avatar: "🐛", color: "bg-purple-100" },
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
        navigate("/activity");
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
        {/* Header with user info and sign out */}
        <div className="flex justify-between items-center p-4 bg-white/80 backdrop-blur-sm shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">
            Frustration Zone 😡
          </h1>
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
