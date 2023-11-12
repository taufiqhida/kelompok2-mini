const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  users: prisma.users,
  permissions: prisma.permissions,
  roles: prisma.roles,
  products: prisma.products,
  productImages: prisma.product_images,
  productVariants: prisma.product_variants,
  productVariantValues: prisma.product_variant_values,
  orders: prisma.orders,
  orderItems: prisma.order_items,
  carts: prisma.carts,
  settings: prisma.settings,
  shippingMethods: prisma.shipping_methods,
  categories: prisma.categories,
  userAddresses: prisma.user_addresses,
};
