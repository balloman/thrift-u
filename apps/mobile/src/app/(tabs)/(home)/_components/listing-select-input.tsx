import RNPickerSelect from "react-native-picker-select";
import { ListingBase } from "./listing-base";

interface Category {
  label: string;
  value: string;
}

const items: Category[] = [
  { label: "Shirt", value: "shirt" },
  { label: "Pants", value: "pants" },
  { label: "Shoes", value: "shoes" },
  { label: "Accessories", value: "accessories" },
  { label: "Outerwear", value: "outerwear" },
  { label: "Dresses", value: "dresses" },
  { label: "Skirts", value: "skirts" },
  { label: "Suits", value: "suits" },
  { label: "Activewear", value: "activewear" },
  { label: "Other", value: "other" },
];

export function ListingSelectInput() {
  return (
    <ListingBase label="Category">
      <RNPickerSelect items={items} onValueChange={console.log} />
    </ListingBase>
  );
}
