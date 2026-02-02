import Logo from "@/components/Logo";
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

export function AppSidebar() {
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
        <div className="space-y-2 text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>Storage Usage</span>
            <span>62%</span>
          </div>
          <Progress className="h-1.5" value={62} />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
