# API Documentation

## Base URL

- Development: `http://localhost:8080`
- Production: TBD

## Endpoints

### Health Check

```
GET /health
```

Returns the health status of the API.

**Response:**
```json
{
  "status": "healthy",
  "service": "saros-analytics-backend"
}
```

### Get Positions

```
GET /api/positions?wallet={wallet_address}
```

Retrieves all DLMM positions for a given wallet.

**Parameters:**
- `wallet` (optional): Solana wallet address

**Response:**
```json
[
  {
    "id": "string",
    "pair": "string",
    "liquidity": 12500.50,
    "fees_earned": 125.75,
    "impermanent_loss": -2.3,
    "apr": 15.4,
    "status": "active"
  }
]
```

### Get Portfolio Summary

```
GET /api/portfolio-summary?wallet={wallet_address}
```

Returns aggregated portfolio metrics.

**Response:**
```json
{
  "total_liquidity": 26400.75,
  "total_fees_earned": 227.75,
  "average_apr": 15.4,
  "total_positions": 3
}
```

### Get Analytics Data

```
GET /api/analytics?wallet={wallet_address}
```

Returns historical analytics data for charts.

**Response:**
```json
[
  {
    "date": "2024-01-01",
    "liquidity": 10000.0,
    "fees": 50.0,
    "volume": 25000.0
  }
]
```

## Error Responses

All endpoints may return standard HTTP error responses:

- `400 Bad Request`: Invalid parameters
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

Error response format:
```json
{
  "error": "Error message description"
}
```

## Rate Limiting

Currently no rate limiting is implemented. This should be added for production use.

## Authentication

No authentication is currently required. For production, implement proper authentication and authorization.