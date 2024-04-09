export function useTimeFormatting() {
  function convertTo12HourFormat(time24) {
    if (!time24) {
      return "";
    }
    const [hours, minutes] = time24.split(":");
    if (!hours || !minutes) {
      return "";
    }
    const hoursInt = parseInt(hours, 10);
    const suffix = hoursInt >= 12 ? "PM" : "AM";
    const hours12 = ((hoursInt + 11) % 12) + 1;
    const formattedHours = hours12.toString().padStart(2, "0");
    return `${formattedHours}:${minutes} ${suffix}`;
  }

  function translateToArabic(timeString) {
    const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    const amPmTranslation = {
      AM: "ص",
      PM: "م"
    };
    const [time, period] = timeString.split(" ");
    const [hours, minutes] = time.split(":");
    const translateDigits = (digits) =>
      digits
        .split("")
        .map((digit) => arabicNumbers[parseInt(digit)])
        .join("");
    const translatedHours = translateDigits(hours);
    const translatedMinutes = translateDigits(minutes);
    const translatedSuffix = amPmTranslation[period];
    return `${translatedHours}:${translatedMinutes} ${translatedSuffix}`;
  }

  return {
    convertTo12HourFormat,
    translateToArabic
  };
}
