export default function changeDateFormat(userDate: string): false | string {
  // Expecting Date as "25-10-2021 or 25/10/2021" Otherwise Throw error
  try {
    const splittedDate = userDate.split(/[-\/]/).reverse().join('-');
    if (isNaN(Date.parse(splittedDate))) {
      return false;
    } else {
      return splittedDate;
    }
  } catch (error) {
    return false;
  }
}
