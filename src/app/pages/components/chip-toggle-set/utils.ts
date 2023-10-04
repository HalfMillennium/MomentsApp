export interface ChipToggle {
  label: string;
  icon: string;
  /** If this chip should be included in the chip set */
  available?: boolean;
  checked: boolean;
}
