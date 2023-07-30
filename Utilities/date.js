export const getFormattedCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;

}


export const daysBetweenDates = (date1, date2) => {
    const date1Obj = new Date(date1);
    const date2Obj = new Date(date2);

    const timeDiff = Math.abs(date2Obj - date1Obj);

    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    return daysDiff;
}