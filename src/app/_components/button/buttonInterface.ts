export type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  color?: "blue" | "green";
  uppercase?: boolean;
  filled?: boolean;
  fullWidth?: boolean;
  href?: string;
} & (
  | React.ButtonHTMLAttributes<HTMLButtonElement>
  | React.AnchorHTMLAttributes<HTMLAnchorElement>
);
