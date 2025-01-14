export interface ISidebarRouter {
  path?: string;
  label: string;
  icon: string;
  children?: {
    path: string;
    label: string;
    icon: string;
  }[];
}
