
interface RadioButtonGroupProps {
  label: string;
  options: string[];
  selectedOption: string;
  onChange: (value: string) => void;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  label,
  options,
  selectedOption,
  onChange,
}) => {
  return (
    <div>
      {label}:
      {options.map((option) => (
        <label key={option}>
          <input
            type="radio"
            name={label}
            value={option}
            checked={selectedOption === option}
            onChange={(e) => onChange(e.target.value)} 
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default RadioButtonGroup;
