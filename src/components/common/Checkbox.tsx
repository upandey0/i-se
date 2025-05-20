type CheckboxProps = {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
};

export const Checkbox = ({ id, label, checked, onChange, className = '' }: CheckboxProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded cursor-pointer transition-colors duration-200"
      />
      <label
        htmlFor={id}
        className="ml-2 block text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
      >
        {label}
      </label>
    </div>
  );
};