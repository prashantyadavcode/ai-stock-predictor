// Vercel API endpoint for stock predictions
export default function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { symbol, days, modelType } = req.body;

        if (!symbol || !days || !modelType) {
            return res.status(400).json({ 
                error: 'Missing required parameters: symbol, days, modelType' 
            });
        }

        // Mock prediction response (in production, you'd use real ML models)
        const mockPrediction = {
            symbol: symbol.toUpperCase(),
            predictions: Array.from({ length: days }, (_, i) => {
                const basePrice = getBasePrice(symbol);
                const trend = getTrend(symbol);
                const volatility = getVolatility(symbol);
                const noise = (Math.random() - 0.5) * volatility * 0.5;
                return basePrice * (1 + trend * (i + 1) + noise);
            }),
            confidence: getConfidence(modelType),
            model: modelType,
            timestamp: new Date().toISOString()
        };

        res.status(200).json(mockPrediction);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

function getBasePrice(symbol) {
    const prices = {
        'AAPL': 150, 'MSFT': 300, 'GOOGL': 2500, 'AMZN': 3000,
        'TSLA': 200, 'NVDA': 400, 'META': 300, 'NFLX': 400,
        'AMD': 120, 'INTC': 45, 'CRM': 200, 'ADBE': 500,
        'PYPL': 60, 'UBER': 40, 'SPOT': 150, 'SQ': 50,
        'ZM': 80, 'SHOP': 60, 'ROKU': 70, 'PELOTON': 15
    };
    return prices[symbol] || 100;
}

function getTrend(symbol) {
    const trends = {
        'AAPL': 0.001, 'MSFT': 0.0008, 'GOOGL': 0.0005, 'AMZN': 0.0003,
        'TSLA': 0.002, 'NVDA': 0.0015, 'META': 0.0007, 'NFLX': 0.0004,
        'AMD': 0.0012, 'INTC': 0.0002, 'CRM': 0.0006, 'ADBE': 0.0008,
        'PYPL': 0.0003, 'UBER': 0.0004, 'SPOT': 0.0005, 'SQ': 0.0007,
        'ZM': -0.0002, 'SHOP': 0.0006, 'ROKU': 0.0003, 'PELOTON': -0.0005
    };
    return trends[symbol] || 0.0005;
}

function getVolatility(symbol) {
    const volatilities = {
        'AAPL': 0.02, 'MSFT': 0.018, 'GOOGL': 0.025, 'AMZN': 0.03,
        'TSLA': 0.05, 'NVDA': 0.04, 'META': 0.03, 'NFLX': 0.035,
        'AMD': 0.045, 'INTC': 0.025, 'CRM': 0.035, 'ADBE': 0.03,
        'PYPL': 0.04, 'UBER': 0.05, 'SPOT': 0.04, 'SQ': 0.06,
        'ZM': 0.05, 'SHOP': 0.06, 'ROKU': 0.07, 'PELOTON': 0.08
    };
    return volatilities[symbol] || 0.02;
}

function getConfidence(modelType) {
    const confidences = {
        'lstm': 0.87,
        'arima': 0.81,
        'linear': 0.75,
        'ensemble': 0.94
    };
    return confidences[modelType] || 0.80;
}
