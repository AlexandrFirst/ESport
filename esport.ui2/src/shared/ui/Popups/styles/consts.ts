import styles from "./popup.module.css";

import { DropdownDirection } from "../types/dropdownDirection";

export const mapDirectionClass: Record<DropdownDirection, string> = {
  "bottom left": styles.optionsBottomLeft,
  "bottom right": styles.optionsBottomRight,
  "top right": styles.optionsTopRight,
  "top left": styles.optionsTopLeft,
  "top center": styles.optionsTopCenter,
};
