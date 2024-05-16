import React from "react";
import { TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

const CustomTimePicker = ({ value, onChange }) => {
  const handleChange = (newValue) => {
    if (newValue) {
      onChange(newValue.format("hh:mm A"));
    } else {
      onChange("");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        value={value ? dayjs(value, "hh:mm A") : null}
        onChange={handleChange}
        minutesStep={30}
        ampm={true}
        desktopModeMediaQuery="@media (pointer: fine)"
        views={['hours', 'minutes']}
      />
    </LocalizationProvider>
  );
};

export default CustomTimePicker;
