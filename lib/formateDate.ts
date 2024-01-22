export function formatDate(inputDateString: string, daysToAdd: number = 1): string {
    const inputDate = new Date(inputDateString);
  
    // Add days
    inputDate.setDate(inputDate.getDate() + daysToAdd);
  
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = inputDate.toLocaleDateString('en-US', options);
  
    return formattedDate;
  }
