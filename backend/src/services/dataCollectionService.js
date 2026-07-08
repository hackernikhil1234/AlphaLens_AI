const axios = require('axios');
const YahooFinance = require('yahoo-finance2').default;
const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] });

const collectData = async (ticker) => {
  try {
    // 1. Yahoo Finance Data (Company Profile & Financials)
    let company = {};
    let marketData = {};
    
    try {
      const quoteSummary = await yahooFinance.quoteSummary(ticker, {
        modules: ['price', 'summaryDetail', 'summaryProfile', 'financialData']
      });

      company = {
        name: quoteSummary.price?.longName || ticker,
        sector: quoteSummary.summaryProfile?.sector || 'Unknown',
        industry: quoteSummary.summaryProfile?.industry || 'Unknown',
        businessSummary: quoteSummary.summaryProfile?.longBusinessSummary || 'No summary available.'
      };

      marketData = {
        currentPrice: quoteSummary.price?.regularMarketPrice,
        marketCap: quoteSummary.price?.marketCap,
        trailingPE: quoteSummary.summaryDetail?.trailingPE,
        forwardPE: quoteSummary.summaryDetail?.forwardPE,
        dividendYield: quoteSummary.summaryDetail?.dividendYield,
        profitMargin: quoteSummary.financialData?.profitMargins,
        revenueGrowth: quoteSummary.financialData?.revenueGrowth,
        debtToEquity: quoteSummary.financialData?.debtToEquity,
        freeCashflow: quoteSummary.financialData?.freeCashflow
      };
    } catch (err) {
      console.error(`Yahoo Finance error for ${ticker}:`, err.message);
    }

    // 2. News API & Tavily (Recent news)
    let news = [];
    
    if (process.env.NEWS_API_KEY) {
      try {
        const newsResponse = await axios.get(`https://newsapi.org/v2/everything?q=${ticker}&sortBy=publishedAt&pageSize=5&language=en&apiKey=${process.env.NEWS_API_KEY}`);
        if (newsResponse.data && newsResponse.data.articles) {
          news = newsResponse.data.articles.map(article => ({
            title: article.title,
            source: article.source.name,
            date: article.publishedAt,
            summary: article.description
          }));
        }
      } catch (err) {
        console.error("NewsAPI Error:", err.message);
      }
    }

    // Fallback or supplement with Tavily if NewsAPI fails or returns empty
    if (process.env.TAVILY_API_KEY && news.length === 0) {
      try {
        const tavilyResponse = await axios.post('https://api.tavily.com/search', {
          api_key: process.env.TAVILY_API_KEY,
          query: `Latest financial news and analysis for ${company.name || ticker} stock`,
          search_depth: "basic",
          include_answer: false,
          max_results: 5
        });
        if (tavilyResponse.data && tavilyResponse.data.results) {
          news = tavilyResponse.data.results.map(res => ({
            title: res.title,
            source: res.url,
            summary: res.content
          }));
        }
      } catch (err) {
        console.error("Tavily API Error:", err.message);
      }
    }

    return { ticker, company, marketData, news };
  } catch (error) {
    console.error(`Data collection fatal error for ${ticker}:`, error.message);
    // Return minimal state if everything completely fails
    return { ticker, company: {}, marketData: {}, news: [] };
  }
};

module.exports = { collectData };
