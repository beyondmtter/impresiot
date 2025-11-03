export const getWorkshopStatus = (startDate, startTime) => {
    const workshopDate = new Date(startDate);
    const [hours, minutes] = startTime.split(":").map(Number);

    workshopDate.setHours(hours, minutes, 0, 0);

    const currentTime = new Date();
    const timeDifference = workshopDate - currentTime;

    if (timeDifference <= 0) {
        return "Closed";
    }

    // Calculate time left
    const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesLeft = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    if (daysLeft > 0) {
        return `${daysLeft}d ${hoursLeft}h`;
    }

    // Show hours and minutes if less than 1 day left
    return ` ${hoursLeft}h ${minutesLeft}m`;
};
