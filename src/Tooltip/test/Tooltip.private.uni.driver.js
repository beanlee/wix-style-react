import { tooltipDriverFactory as publicDriverFactory } from '../Tooltip.uni.driver';

export const tooltipPrivateDriverFactory = (base, body) => {
  return {
    ...publicDriverFactory(base, body),
  };
};
