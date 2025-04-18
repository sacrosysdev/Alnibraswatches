export const SALES_AND_COST = [
  {
    day: "Mon",
    sales: 1200,
    cost: 800,
  },
  {
    day: "Tue",
    sales: 1500,
    cost: 1000,
  },
  {
    day: "Wed",
    sales: 1300,
    cost: 700,
  },
  {
    day: "Thu",
    sales: 1500,
    cost: 1000,
  },
  {
    day: "Fri",
    sales: 1800,
    cost: 1200,
  },
  {
    day: "Sat",
    sales: 2300,
    cost: 1800,
  },
  {
    day: "Sun",
    sales: 2000,
    cost: 1500,
  },
];
export const LAST_WEEK_TOTAL = 27000;
export const VISIT_CHART_DATA = [
  {
    day: "monday",
    count: 5000,
  },
  {
    day: "tuesday",
    count: 2500,
  },
  {
    day: "wednesday",
    count: 2300,
  },
  {
    day: "thursday",
    count: 2800,
  },
  {
    day: "friday",
    count: 3800,
  },
  {
    day: "saturday",
    count: 3500,
  },
  {
    day: "sunday",
    count: 3000,
  },
];
export const CUSTOMER_DATA = [
  {
    day: "monday",
    count: "1500",
  },
  {
    day: "tuesday",
    count: "3000",
  },
  {
    day: "wednesday",
    count: "2000",
  },
  {
    day: "thursday",
    count: "3500",
  },
  {
    day: "friday",
    count: "4200",
  },
  {
    day: "saturday",
    count: "3800",
  },
  {
    day: "sunday",
    count: "5000",
  },
];

export const PRODUCT_DATA = [
  {
    day: "monday",
    productAdded: 500,
    soldProducts: 30,
  },
  {
    day: "tuesday",
    productAdded: 100,
    soldProducts: 80,
  },
  {
    day: "wednesday",
    productAdded: 150,
    soldProducts: 300,
  },
  {
    day: "thursday",
    productAdded: 400,
    soldProducts: 50,
  },
  {
    day: "friday",
    productAdded: 0,
    soldProducts: 80,
  },
  {
    day: "saturday",
    productAdded: 0,
    soldProducts: 30,
  },
  {
    day: "monday",
    productAdded: 0,
    soldProducts: 480,
  },
];

export const REVENUE_DATA = [
  {
    day: "monday",
    revenue: 10000,
  },
  {
    day: "tuesday",
    revenue: 18000,
  },
  {
    day: "wednesday",
    revenue: 9000,
  },
  {
    day: "thursday",
    revenue: 31000,
  },
  {
    day: "friday",
    revenue: 17000,
  },
  {
    day: "saturday",
    revenue: 12000,
  },
  {
    day: "sunday",
    revenue: 10000,
  },
];
export const MERDED_DATA = CUSTOMER_DATA.map((c) => {
  const product = PRODUCT_DATA.find((p) => p.day === c.day) || {};
  const revenue = REVENUE_DATA.find((r) => r.day === c.day) || {};

  const productAdded = +product.productAdded || 0;
  const sold = +product.soldProducts || 0;

  return {
    day: c.day,
    customers: +c.count,
    totalProducts: productAdded,
    soldProducts: sold,
    productsInStock: productAdded - sold,
    totalRevenue: +revenue.revenue || 0,
  };
});
