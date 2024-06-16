const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  const formattedDate = date.toLocaleString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return formattedDate;
};

export const formattedData = (data: any) => {
  return data.map((item: any) => {
    return {
      ...item,
      id: item._id,
      createdAt: formatDate(item.createdAt),
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
