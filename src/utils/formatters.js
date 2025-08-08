export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  export const formatPercentage = (value) => {
    return `${(value * 100).toFixed(1)}%`;
  };