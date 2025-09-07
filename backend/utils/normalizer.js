
function normalizeTrades(rawTrades) {
  return rawTrades.map(trade => ({
    symbol: trade.scrip,
    quantity: trade.qty,
    price: trade.price,
    timestamp: new Date(trade.ts)
  }));
}
module.exports = { normalizeTrades };
