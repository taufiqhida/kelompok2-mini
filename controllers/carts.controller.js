const { carts } = require('../models')

const addToCart = async (req, res) => {
  try {
    const { productId, userId, quantity } = req.body;

    if (!productId || !userId || !quantity) {
      return res.status(400).json({ message: 'Masukkan Product ID, User ID, dan Quantity' });
    }

    const product = await prisma.products.findUnique({
      where: { id: parseInt(productId) },
    });

    const user = await prisma.users.findUnique({
      where: { id: parseInt(userId) },
    });

    if (!product || !user) {
      return res.status(404).json({ message: 'Product atau User tidak ditemukan' });
    }

    const addedToCart = await prisma.carts.create({
      data: {
        product_id: product.id,
        price: product.price,
        quantity: parseInt(quantity),
        user_id: user.id,
      },
    });

    res.status(200).json({ message: 'Sukses menambahkan ke cart', addedToCart });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};
const getCartByUserId = async (req, res) => {
  const userId = req.user_id;

  try {
    const userWithCart = await prisma.users.findUnique({
      where: { id: userId },
      include: {
        cart: true,
      },
    });

    if (!userWithCart) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json(userWithCart.cart);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const cartId = parseInt(req.params.cartId);
    const { quantity } = req.body;

    const updatedCartItem = await prisma.carts.update({
      where: { id: cartId },
      data: {
        quantity: parseInt(quantity),
      },
    });

    res.status(200).json({ message: 'Cart item updated successfully.', updatedCartItem });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const cartId = parseInt(req.params.cartId);

    await prisma.carts.delete({
      where: { id: cartId },
    });

    res.status(200).json({ message: 'Cart item deleted successfully.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};


module.exports = {
  addToCart,
  getCartByUserId,
  updateCartItem,
  deleteCartItem
};
