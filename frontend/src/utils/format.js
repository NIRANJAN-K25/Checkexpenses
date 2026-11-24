export const money = n => '₹' + n.toLocaleString('en-IN', { maximumFractionDigits: 2 });
