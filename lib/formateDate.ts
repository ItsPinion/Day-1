export function formateDate(date: string) {
    let dateStr = date;
    let dateObj = new Date(dateStr);
    
    let formattedDate = dateObj.toLocaleDateString('en-US', {
       year: 'numeric', 
       month: 'long', 
       day: 'numeric'
    });
    
    return (formattedDate);
    
}
