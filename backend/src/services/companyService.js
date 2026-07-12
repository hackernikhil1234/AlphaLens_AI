const YahooFinance = require('yahoo-finance2').default;
const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] });

const resolveCompany = async (query) => {
  const trimmed = query.trim();

  if (/^[A-Z]{1,5}$/.test(trimmed)) {
    return { ticker: trimmed, name: trimmed };
  }

  try {
    const results = await yahooFinance.search(trimmed);
    const equity = (results.quotes || []).find(q => q.quoteType === 'EQUITY');
    if (equity && equity.symbol) {
      return {
        ticker: equity.symbol,
        name: equity.longname || equity.shortname || equity.symbol
      };
    }
  } catch (err) {
    console.error('Yahoo Finance search error:', err.message);
  }

  const ticker = trimmed.toUpperCase().substring(0, 5);
  return { ticker, name: ticker };
};

module.exports = { resolveCompany };
