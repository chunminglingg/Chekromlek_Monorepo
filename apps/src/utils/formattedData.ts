const calculateElapsedTime = (isoString: string) => {
  const date = new Date(isoString);
  const now = new Date();

  // Calculate elapsed time in seconds
  const secondsElapsed = Math.floor((now.getTime() - date.getTime()) / 1000);

  // Determine the appropriate string based on elapsed time
  if (secondsElapsed < 60) {
    return `${secondsElapsed} second${secondsElapsed !== 1 ? "s" : ""} ago`;
  } else if (secondsElapsed < 3600) {
    const minutesElapsed = Math.floor(secondsElapsed / 60);
    return `${minutesElapsed} minute${minutesElapsed !== 1 ? "s" : ""} ago`;
  } else if (secondsElapsed < 86400) {
    const hoursElapsed = Math.floor(secondsElapsed / 3600);
    return `${hoursElapsed} hour${hoursElapsed !== 1 ? "s" : ""} ago`;
  } else if (secondsElapsed < 2592000) {
    // 30 days in seconds
    const daysElapsed = Math.floor(secondsElapsed / 86400);
    return `${daysElapsed} day${daysElapsed !== 1 ? "s" : ""} ago`;
  } else if (secondsElapsed < 31536000) {
    // 365 days in seconds
    const monthsElapsed = Math.floor(secondsElapsed / 2592000); // 30 days in seconds
    return `${monthsElapsed} month${monthsElapsed !== 1 ? "s" : ""} ago`;
  } else {
    const yearsElapsed = Math.floor(secondsElapsed / 31536000); // 365 days in seconds
    return `${yearsElapsed} year${yearsElapsed !== 1 ? "s" : ""} ago`;
  }
};

export const formattedData = (data: any) => {
  return data.map((item: any) => {
    return {
      ...item,
      id: item._id,
      createdAt: calculateElapsedTime(item.createdAt),
    };
  });
};


// import { format, parseISO } from 'date-fns';

// const formatDate = (isoString: string) => {
//   const date = parseISO(isoString);
//   const formattedDate = format(date, "MM/dd/yyyy, HH:mm:ss");
//   return formattedDate;
// };

// export const formattedData = (data: any) => {
//   return data.map((item: any) => {
//     return {
//       ...item,
//       id: item._id,
//       createdAt: formatDate(item.createdAt),
//     };
//   });
// };
