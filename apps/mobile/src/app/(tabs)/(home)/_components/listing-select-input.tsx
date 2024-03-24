import RNPickerSelect from "react-native-picker-select";
import { ListingBase } from "./listing-base";

export interface SelectItem {
  label: string;
  value: string;
}

export function ListingSelectInput(props: {
  items: SelectItem[];
  label: string;
}) {
  return (
    <ListingBase label={props.label}>
      <RNPickerSelect items={props.items} onValueChange={console.log} />
    </ListingBase>
  );
}
