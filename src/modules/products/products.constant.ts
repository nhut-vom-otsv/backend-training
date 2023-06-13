import { SortValues } from 'src/constants';
import { Product } from './product.entity';

const sortByPriceAsc = (a: Product, b: Product) => a.price - b.price;

const sortByPriceDesc = (a: Product, b: Product) => b.price - a.price;

const sortByTitleAsc = (a: Product, b: Product) =>
  a.title.localeCompare(b.title);

const sortByTitleDesc = (a: Product, b: Product) =>
  b.title.localeCompare(a.title);

const sortByRateAsc = (a: Product, b: Product) => a.rate - b.rate;

const sortByRateDesc = (a: Product, b: Product) => b.rate - a.rate;

const sortFunctions: Record<string, (a: Product, b: Product) => number> = {
  [SortValues.PRICE_ASC]: sortByPriceAsc,
  [SortValues.PRICE_DESC]: sortByPriceDesc,
  [SortValues.AZ]: sortByTitleAsc,
  [SortValues.ZA]: sortByTitleDesc,
  [SortValues.RATE_ASC]: sortByRateAsc,
  [SortValues.RATE_DESC]: sortByRateDesc,
};

export {
  sortByPriceAsc,
  sortByPriceDesc,
  sortByTitleAsc,
  sortByTitleDesc,
  sortByRateAsc,
  sortByRateDesc,
  sortFunctions,
};
