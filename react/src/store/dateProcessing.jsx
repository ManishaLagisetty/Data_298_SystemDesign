// Utility to calculate month number from a date
const getMonthNumber = (date) => {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const diff = date - startOfYear;
    return Math.ceil((diff / (1000 * 60 * 60 * 24) + startOfYear.getDay() + 1) / 30);
};

// Generate random date within a range
const getRandomDate = (start, end) => {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return isNaN(date.getTime()) ? new Date() : date; // Default to current date if invalid
};

export { getMonthNumber, getRandomDate };