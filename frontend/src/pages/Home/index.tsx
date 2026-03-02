import Logo from "@/components/Logo";
import RecentUploads from "./RecentUploads";
import AnalyticsCards from "./AnalyticsCards";
import QuickAccess from "./QuickAccess";

export default function Home() {
  return (
    <main className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-card/80 backdrop-blur-sm border rounded-2xl px-6 py-5 md:px-8 md:py-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Logo icon />
          </div>
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Local cloud dashboard
            </div>
            <h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl text-foreground leading-tight">
              Welcome back to your Local Cloud
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-xl">
              Quickly jump to your most used folders, track uploads, and keep an eye on your storage usage in one place.
            </p>
          </div>
        </div>
      </div>
      <AnalyticsCards />
      <QuickAccess />
      <RecentUploads />
    </main>
  );
}
