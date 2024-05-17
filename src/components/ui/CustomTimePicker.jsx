import React from "react";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

const CustomTimePicker = ({ value, onChange }) => {
  const handleChange = (newValue) => {
    if (newValue) {
      onChange(newValue.format("HH:mm"));
    } else {
      onChange("");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopTimePicker
        value={value ? dayjs(value, "HH:mm") : null}
        onChange={handleChange}
        minutesStep={15}
        ampm={true}
        views={["hours", "minutes"]}
      />
    </LocalizationProvider>
  );
};

export default CustomTimePicker;
