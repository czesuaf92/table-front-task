import Select, { MultiValue } from 'react-select';
import { SelectOptionType } from "../types";

interface FilterSelectProps {
  options: SelectOptionType[];
  placeholder: string;
  name: string;
}

const FilterSelect = ({ options, placeholder, name }: FilterSelectProps) => {
  const handleChangeSelect = (selected: MultiValue<SelectOptionType>) => {
    console.log(selected);
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
      onChange={handleChangeSelect}
    />
  );
};
export default FilterSelect;
