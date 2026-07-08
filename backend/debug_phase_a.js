/**
 * Phase A - External Dependency Verification
 * Tests: Gemini API (raw), NewsAPI, Yahoo Finance, Tavily
 * No LangChain used in Gemini test.
 */
require('dotenv').config();

async function testGeminiRaw() {
  console.log('\n========== PHASE A1: GEMINI API (RAW, NO LANGCHAIN) ==========');
  const key = process.env.GEMINI_API_KEY;
  console.log('API Key present:', !!key);
  console.log('API Key prefix:', key ? key.substring(0, 8) + '...' : 'MISSING');

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`;
  const body = {
    contents: [{ role: 'user', parts: [{ text: 'Say hello.' }] }]
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const json = await res.json();
    console.log('HTTP Status:', res.status, res.statusText);
    if (res.ok) {
      const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
      console.log('✅ Gemini Response:', text);
    } else {
      console.error('❌ Gemini Error Body:', JSON.stringify(json, null, 2));
    }
  } catch (err) {
    console.error('❌ Gemini Fetch Error:', err.message);
  }
}

async function testGemini20Flash() {
  console.log('\n========== PHASE A1b: GEMINI 2.0-FLASH FALLBACK TEST ==========');
  const key = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`;
  const body = {
    contents: [{ role: 'user', parts: [{ text: 'Say hello.' }] }]
  };
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const json = await res.json();
    console.log('HTTP Status:', res.status, res.statusText);
    if (res.ok) {
      const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
      console.log('✅ gemini-2.0-flash Response:', text);
    } else {
      console.error('❌ gemini-2.0-flash Error:', JSON.stringify(json.error, null, 2));
    }
  } catch (err) {
    console.error('❌ gemini-2.0-flash Fetch Error:', err.message);
  }
}

async function listModels() {
  console.log('\n========== PHASE A1c: LIST AVAILABLE MODELS ==========');
  const key = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
  try {
    const res = await fetch(url);
    const json = await res.json();
    console.log('HTTP Status:', res.status);
    if (res.ok) {
      const names = (json.models || []).map(m => m.name);
      console.log('Available models:', names);
    } else {
      console.error('❌ List models error:', JSON.stringify(json.error, null, 2));
    }
  } catch (err) {
    console.error('❌ List models fetch error:', err.message);
  }
}

async function testNewsAPI() {
  console.log('\n========== PHASE A2: NEWS API ==========');
  const key = process.env.NEWS_API_KEY;
  console.log('NewsAPI Key present:', !!key);
  const url = `https://newsapi.org/v2/everything?q=AAPL&pageSize=3&apiKey=${key}`;
  try {
    const res = await fetch(url);
    const json = await res.json();
    console.log('HTTP Status:', res.status);
    if (res.ok && json.status === 'ok') {
      console.log('✅ NewsAPI articles count:', json.articles?.length);
      console.log('First article title:', json.articles?.[0]?.title);
    } else {
      console.error('❌ NewsAPI Error:', JSON.stringify(json, null, 2));
    }
  } catch (err) {
    console.error('❌ NewsAPI Fetch Error:', err.message);
  }
}

async function testYahooFinance() {
  console.log('\n========== PHASE A3: YAHOO FINANCE ==========');
  try {
    const YahooFinance = require('yahoo-finance2').default;
    const yf = new YahooFinance({ suppressNotices: ['yahooSurvey'] });
    const result = await yf.quoteSummary('AAPL', {
      modules: ['price', 'summaryProfile', 'financialData']
    });
    console.log('✅ Yahoo Finance company name:', result.summaryProfile?.longName || result.price?.longName);
    console.log('✅ Current price:', result.price?.regularMarketPrice);
    console.log('✅ Sector:', result.summaryProfile?.sector);
    console.log('✅ P/E ratio:', result.summaryProfile?.trailingPE || result.price?.trailingPE);
    console.log('✅ Free cash flow:', result.financialData?.freeCashflow);
  } catch (err) {
    console.error('❌ Yahoo Finance Error:', err.message);
    console.error(err.stack);
  }
}

async function testTavily() {
  console.log('\n========== PHASE A4: TAVILY ==========');
  const key = process.env.TAVILY_API_KEY;
  console.log('Tavily Key present:', !!key);
  try {
    const res = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ api_key: key, query: 'Apple Inc stock analysis', max_results: 3 })
    });
    const json = await res.json();
    console.log('HTTP Status:', res.status);
    if (res.ok) {
      console.log('✅ Tavily results count:', json.results?.length);
      console.log('First result title:', json.results?.[0]?.title);
    } else {
      console.error('❌ Tavily Error:', JSON.stringify(json, null, 2));
    }
  } catch (err) {
    console.error('❌ Tavily Fetch Error:', err.message);
  }
}

async function main() {
  await testGeminiRaw();
  await testGemini20Flash();
  await listModels();
  await testNewsAPI();
  await testYahooFinance();
  await testTavily();
  console.log('\n========== PHASE A COMPLETE ==========\n');
}

main().catch(console.error);
