import React, { createContext, useState, useContext } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [hasPlacedOrder, setHasPlacedOrder] = useState(false);

  return (
    <OrderContext.Provider value={{ hasPlacedOrder, setHasPlacedOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
