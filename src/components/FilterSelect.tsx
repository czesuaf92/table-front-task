import Select, { MultiValue } from 'react-select';
import { SelectOptionType } from "../types";

interface FilterSelectProps {
  options: SelectOptionType[];
  placeholder: string;
  name: string;
  onChangeCallback: React.Dispatch<React.SetStateAction<SelectOptionType[]>>;
}

const FilterSelect = ({ options, placeholder, name, onChangeCallback }: FilterSelectProps) => {
  const handleChange = (selected: MultiValue<SelectOptionType>) => {
    onChangeCallback(selected as SelectOptionType[]);
  };
  return (
    <Select
      options={options}
      isMulti
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          minWidth: 250,
        })
      }}
      placeholder={placeholder}
      name={name}
      onChange={handleChange}
    />
  );
};
export default FilterSelect;
