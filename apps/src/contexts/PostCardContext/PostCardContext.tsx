"use client";
import React, { ReactNode, createContext, useState } from "react";
import { PostCardType } from "../@Types/PostCardType";

interface CardContextProp {
  children: ReactNode;
}

interface ContextProps {
  CardInfo: PostCardType[];
  setCardInfo: React.Dispatch<React.SetStateAction<PostCardType[]>>;
  toggleFavorite: (id: string) => void;
  nextToken: string | null;
  fetchMoreCards: (token: string | null) => Promise<{ newCards: PostCardType[], newNextToken: string | null }>;

}

export const MyCardContext = createContext<ContextProps>({
  CardInfo: [],
  setCardInfo: () => {},
  toggleFavorite: () => {},
  nextToken: null,
  fetchMoreCards: async () => ({ newCards: [], newNextToken: null }),

});

const CardContext: React.FC<CardContextProp> = ({
  children,
}: CardContextProp) => {
  const [CardInfo, setCardInfo] = useState<PostCardType[]>(
);

  const [nextToken, setNextToken] = useState<string | null>(null);
  const fetchMoreCards = async (token: string | null): Promise<{ newCards: PostCardType[], newNextToken: string | null }> => {
    // Simulate an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const newCards: PostCardType[] = [
          // Example new cards, replace with actual data fetching logic
            ];
        const newNextToken: string | null = 'nextToken'; // Update with new token from API

        resolve({ newCards, newNextToken });
      }, 2000); // Simulate delay
    });
  };

  function toggleFavorite(id: string) {
    const updatedCard = CardInfo.map((card) => {
      if (card.id == id) {
        return {
          ...card,
          isFavorite: !card.isFavorite,
        };
      }
      return card;
    });
    setCardInfo(updatedCard);
  }

  // State Value
  const ContextValue = {
    CardInfo,
    setCardInfo,
    toggleFavorite,
    nextToken,
    fetchMoreCards,
    // handleAddCard
  };

  return (
    <MyCardContext.Provider value={ContextValue}>
      {children}
    </MyCardContext.Provider>
  );
};

export default CardContext;
