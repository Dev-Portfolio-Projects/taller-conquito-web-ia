let cart = [];

export const IVA_RATE = 0.15;

export const getCart = () => cart;

export const addToCart = (product) => {
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    cart = cart.map((item) =>
      item.id === product.id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item,
    );

    return;
  }

  cart = [
    ...cart,
    {
      ...product,
      quantity: 1,
    },
  ];
};

export const removeFromCart = (id) => {
  const product = cart.find((item) => item.id === id);

  if (!product) return;

  if (product.quantity > 1) {
    cart = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity - 1,
          }
        : item,
    );

    return;
  }

  cart = cart.filter((item) => item.id !== id);
};

export const increaseQuantity = (id) => {
  cart = cart.map((item) =>
    item.id === id
      ? {
          ...item,
          quantity: item.quantity + 1,
        }
      : item,
  );
};

export const decreaseQuantity = (id) => {
  const product = cart.find((item) => item.id === id);

  if (!product) return;

  if (product.quantity > 1) {
    cart = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity - 1,
          }
        : item,
    );
  } else {
    removeFromCart(id);
  }
};

export const calculateSubtotal = () => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const calculateIVA = () => {
  return calculateSubtotal() * IVA_RATE;
};

export const calculateTotal = (shipping = 0) => {
  return calculateSubtotal() + calculateIVA() + shipping;
};

export const clearCart = () => {
  cart = [];
};
