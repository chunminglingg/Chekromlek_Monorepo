import { formatDistanceToNow } from "date-fns";

const calculateElapsedTime = (isoString: string) => {
  const date = new Date(isoString);
  return formatDistanceToNow(date, { addSuffix: true });
};

export const formattedData = (data: any[]) => {
  return data.map((item) => ({
    ...item,
    id: item._id, // Assuming _id is the unique identifier in your data object
    createdAt: calculateElapsedTime(item.createdAt),
  }));
};
