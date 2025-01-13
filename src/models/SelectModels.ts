export interface SelectProps {
  className?: string;
  id?: string;
  placeholder?: string;
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
