import { motion } from "motion/react";
import { useState } from "react";

interface ActivityItem {
  id: string;
  userInitials: string;
  action: string;
  target: string;
  targetAvatar: string;
  actionEmoji: string;
  timestamp: Date;
}

// Mock data for now
const mockActivities: ActivityItem[] = [
  {
    id: "1",
    userInitials: "BS",
    action: "kicked",
    target: "Monday",
    targetAvatar: "😴",
    actionEmoji: "👟",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
  },
  {
    id: "2",
    userInitials: "RK",
    action: "roasted",
    target: "Boss",
    targetAvatar: "👔",
    actionEmoji: "🍅",
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
  },
  {
    id: "3",
    userInitials: "AS",
    action: "punched",
    target: "Traffic",
    targetAvatar: "🚗",
    actionEmoji: "👊",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
];

function ActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>(mockActivities);
  const [newActivity, setNewActivity] = useState<ActivityItem | null>(null);

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const addActivity = (activity: Omit<ActivityItem, "id" | "timestamp">) => {
    const newItem: ActivityItem = {
      ...activity,
      id: Date.now().toString(),
      timestamp: new Date(),
    };

    setNewActivity(newItem);
    setTimeout(() => {
      setActivities((prev) => [newItem, ...prev]);
      setNewActivity(null);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-8">
      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-4xl font-bold text-center text-gray-800 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Activity Feed 🔥
        </motion.h1>

        <motion.p
          className="text-center text-gray-600 mb-12 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          See who's kicking stress away!
        </motion.p>

        {/* New activity notification */}
        {newActivity && (
          <motion.div
            className="mb-6 p-4 bg-green-100 border-2 border-green-300 rounded-2xl"
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center space-x-3">
              <span className="text-2xl">{newActivity.actionEmoji}</span>
              <span className="text-lg font-semibold text-green-800">
                {newActivity.userInitials} {newActivity.action}{" "}
                {newActivity.target}!
              </span>
              <span className="text-2xl">{newActivity.targetAvatar}</span>
            </div>
          </motion.div>
        )}

        {/* Activities list */}
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
              whileHover={{
                scale: 1.02,
                shadow: "0 10px 25px rgba(0,0,0,0.1)",
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {activity.userInitials}
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      <span className="text-2xl mr-2">
                        {activity.actionEmoji}
                      </span>
                      {activity.userInitials} {activity.action}{" "}
                      {activity.target}
                      <span className="text-2xl ml-2">
                        {activity.targetAvatar}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatTimeAgo(activity.timestamp)}
                    </p>
                  </div>
                </div>
                <div className="text-2xl opacity-60">
                  {activity.actionEmoji}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {activities.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="text-6xl mb-4">😴</div>
            <p className="text-xl text-gray-600">
              No activities yet. Be the first to kick some stress!
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default ActivityFeed;
export type { ActivityItem };
