let cart = [];

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

export const clearCart = () => {
  cart = [];
};
