import dayjs from 'dayjs'

export interface Product {
  id: number
  name: string
  description: string
  category: string
  price: number
  stock: number
  threshold: number
  image: string
  createdAt: string
}

export interface Order {
  id: number
  productId: number
  quantity: number
  total: number
  date: string
}

// Mock product data
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "Premium noise-cancelling wireless headphones",
    category: "Electronics",
    price: 149.99,
    stock: 42,
    threshold: 10,
    image: "https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    createdAt: "2023-01-10T08:15:30Z"
  },
  {
    id: 2,
    name: "Smart Watch Series 5",
    description: "Latest model with health monitoring features",
    category: "Electronics",
    price: 299.99,
    stock: 27,
    threshold: 15,
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    createdAt: "2023-02-15T10:20:45Z"
  },
  {
    id: 3,
    name: "Ergonomic Office Chair",
    description: "Comfortable chair with lumbar support",
    category: "Furniture",
    price: 199.99,
    stock: 15,
    threshold: 5,
    image: "https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    createdAt: "2023-03-22T14:30:15Z"
  },
  {
    id: 4,
    name: "Organic Cotton T-Shirt",
    description: "Soft, eco-friendly t-shirt",
    category: "Clothing",
    price: 24.99,
    stock: 78,
    threshold: 20,
    image: "https://images.pexels.com/photos/5384423/pexels-photo-5384423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    createdAt: "2023-01-05T09:45:20Z"
  },
  {
    id: 5,
    name: "Stainless Steel Water Bottle",
    description: "Insulated bottle that keeps drinks cold for 24 hours",
    category: "Home & Kitchen",
    price: 34.99,
    stock: 53,
    threshold: 15,
    image: "https://images.pexels.com/photos/1188649/pexels-photo-1188649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    createdAt: "2023-02-28T11:10:05Z"
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    description: "Portable speaker with rich sound",
    category: "Electronics",
    price: 79.99,
    stock: 8,
    threshold: 10,
    image: "https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    createdAt: "2023-03-10T13:25:40Z"
  },
  {
    id: 7,
    name: "Yoga Mat",
    description: "Non-slip exercise mat",
    category: "Sports & Outdoors",
    price: 29.99,
    stock: 35,
    threshold: 10,
    image: "https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    createdAt: "2023-01-20T15:50:10Z"
  },
  {
    id: 8,
    name: "Electric Coffee Grinder",
    description: "Stainless steel grinder for fresh coffee",
    category: "Home & Kitchen",
    price: 49.99,
    stock: 12,
    threshold: 8,
    image: "https://images.pexels.com/photos/6802983/pexels-photo-6802983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    createdAt: "2023-02-10T16:35:25Z"
  }
];

// Generate mock orders (past 12 months)
const generateOrders = (): Order[] => {
  const orders: Order[] = [];
  const now = dayjs();
  
  for (let i = 1; i <= 500; i++) {
    const randomProduct = mockProducts[Math.floor(Math.random() * mockProducts.length)];
    const randomQuantity = Math.floor(Math.random() * 5) + 1;
    const randomDaysAgo = Math.floor(Math.random() * 365);
    const orderDate = now.subtract(randomDaysAgo, 'day').format();
    
    orders.push({
      id: i,
      productId: randomProduct.id,
      quantity: randomQuantity,
      total: randomProduct.price * randomQuantity,
      date: orderDate
    });
  }
  
  return orders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

const mockOrders = generateOrders();

// Service functions
export const getProducts = (): Product[] => {
  return [...mockProducts];
};

export const getProduct = (id: number): Product | undefined => {
  return mockProducts.find(product => product.id === id);
};

export const getOrders = (): Order[] => {
  return [...mockOrders];
};

export const getLowStockProducts = (): Product[] => {
  return mockProducts.filter(product => product.stock <= product.threshold);
};

export const addProduct = (product: Omit<Product, 'id' | 'createdAt'>): Product => {
  const newProduct: Product = {
    ...product,
    id: Math.max(...mockProducts.map(p => p.id)) + 1,
    createdAt: new Date().toISOString()
  };
  
  mockProducts.push(newProduct);
  return newProduct;
};

export const updateProductStock = (id: number, newStock: number): Product | undefined => {
  const product = mockProducts.find(p => p.id === id);
  if (product) {
    product.stock = newStock;
  }
  return product;
};

// Data analysis functions
export const getRevenueByPeriod = (period: 'day' | 'week' | 'month' | 'year') => {
  const now = dayjs();
  const periodMap: Record<string, number> = {};
  const format: Record<string, string> = {
    day: 'YYYY-MM-DD',
    week: 'YYYY-[W]ww',
    month: 'YYYY-MM',
    year: 'YYYY'
  };
  
  mockOrders.forEach(order => {
    const orderDate = dayjs(order.date);
    // Filter to include only past 12 periods
    let includePeriod = false;
    
    if (period === 'day') {
      includePeriod = now.diff(orderDate, 'day') <= 30;
    } else if (period === 'week') {
      includePeriod = now.diff(orderDate, 'week') <= 12;
    } else if (period === 'month') {
      includePeriod = now.diff(orderDate, 'month') <= 12;
    } else if (period === 'year') {
      includePeriod = now.diff(orderDate, 'year') <= 5;
    }
    
    if (includePeriod) {
      const periodKey = orderDate.format(format[period]);
      periodMap[periodKey] = (periodMap[periodKey] || 0) + order.total;
    }
  });
  
  return Object.entries(periodMap)
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => a.label.localeCompare(b.label));
};

export const getRevenueByCategory = () => {
  const categoryMap: Record<string, number> = {};
  
  mockOrders.forEach(order => {
    const product = mockProducts.find(p => p.id === order.productId);
    if (product) {
      categoryMap[product.category] = (categoryMap[product.category] || 0) + order.total;
    }
  });
  
  return Object.entries(categoryMap)
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total);
};

export const getTotalRevenue = (): number => {
  return mockOrders.reduce((sum, order) => sum + order.total, 0);
};

export const getTotalOrders = (): number => {
  return mockOrders.length;
};

export const getAverageOrderValue = (): number => {
  return getTotalRevenue() / getTotalOrders();
};