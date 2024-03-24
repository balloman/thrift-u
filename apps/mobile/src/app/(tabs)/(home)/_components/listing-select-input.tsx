import RNPickerSelect from "react-native-picker-select";
import { ListingBase, type ListingBaseProps } from "./listing-base";

export interface SelectItem {
  label: string;
  value: string;
}

export function ListingSelectInput(
  props: {
    items: SelectItem[];
    onValueChange: (value: string) => void;
    value: string;
  } & Omit<ListingBaseProps, "children">,
) {
  return (
    <ListingBase label={props.label} error={props.error}>
      <RNPickerSelect
        items={props.items}
        onValueChange={props.onValueChange}
        value={props.value}
      />
    </ListingBase>
  );
}
