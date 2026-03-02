import Logo from "@/components/Logo";
import RecentUploads from "./RecentUploads";
import AnalyticsCards from "./AnalyticsCards";
import QuickAccess from "./QuickAccess";

export default function Home() {
  return (
    <main className="p-6 space-y-5">
      <div className="flex items-center gap-5 bg-card p-8 border rounded-lg shadow-lg">
        <Logo icon />
        <div className="space-y-1">
          <h2 className="font-bold text-foreground text-4xl">
            Welcome to local cloud
          </h2>
          <p className="text-muted-foreground">
            Your personal cloud, powered by your own network.
          </p>
        </div>
      </div>
      <AnalyticsCards />
      <QuickAccess />
      <RecentUploads />
    </main>
  );
}
