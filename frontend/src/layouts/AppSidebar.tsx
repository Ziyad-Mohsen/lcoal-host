import { getStorageInfo as getStorageUsage } from "@/api/files.api";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Spinner } from "@/components/ui/spinner";
import { bytesToGb } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { RotateCcw } from "lucide-react";

const progressColors = {
  low: "green",
  mid: "yellow",
  high: "orange",
  ultra: "red",
};

const getProgressColor = (value: number): string => {
  if (value <= 40) {
    return progressColors.low;
  }
  if (value > 40 && value <= 60) {
    return progressColors.mid;
  }
  if (value > 60 && value <= 80) {
    return progressColors.high;
  }
  if (value > 80) {
    return progressColors.ultra;
  }
  return progressColors.low;
};

export function AppSidebar() {
  const {
    data: storageUsage,
    isPending,
    isError,
    refetch,
  } = useQuery({ queryKey: ["storageInfo"], queryFn: getStorageUsage });
  const progressColor = getProgressColor(storageUsage?.percentage || 0);

  return (
    <Sidebar>
      <SidebarHeader className="bg-background border-b p-3">
        <SidebarMenu>
          <Logo />
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarGroupLabel className="text-sm p-0">Storage</SidebarGroupLabel>
        <SidebarGroupContent className="flex flex-col gap-2">
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-2">
              <SidebarMenuButton className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear">
                <span>All files</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter className="mt-auto border-t p-3">
        {isPending ? (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sidebar-foreground">
              <span>Storage Usage</span>
              <div>
                <span className="text-sm">
                  {storageUsage?.percentage.toFixed(2)}%
                </span>
                {isError && (
                  <Button
                    size="icon-sm"
                    variant="ghost"
                    onClick={() => refetch()}
                  >
                    <RotateCcw />
                  </Button>
                )}
              </div>
            </div>
            <Progress
              className={`h-1.5 [&>div]:bg-${progressColor}-500`}
              value={storageUsage?.percentage}
            />
            <span className="flex items-center justify-between text-sm text-bold text-muted-foreground">
              {bytesToGb(storageUsage?.size || 0)} GB of{" "}
              {bytesToGb(storageUsage?.maxSize || 0, 0)} GB
            </span>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
