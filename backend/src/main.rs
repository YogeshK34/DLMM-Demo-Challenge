use axum::{
    extract::Query,
    http::Method,
    response::Json,
    routing::get,
    Router,
};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use tower::ServiceBuilder;
use tower_http::cors::{Any, CorsLayer};
use tracing::info;

#[derive(Debug, Serialize, Deserialize)]
struct Position {
    id: String,
    pair: String,
    liquidity: f64,
    fees_earned: f64,
    impermanent_loss: f64,
    apr: f64,
    status: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct PortfolioSummary {
    total_liquidity: f64,
    total_fees_earned: f64,
    average_apr: f64,
    total_positions: u32,
}

#[derive(Debug, Serialize, Deserialize)]
struct AnalyticsData {
    date: String,
    liquidity: f64,
    fees: f64,
    volume: f64,
}

#[derive(Debug, Deserialize)]
struct PositionsQuery {
    wallet: Option<String>,
}

async fn get_positions(Query(params): Query<PositionsQuery>) -> Json<Vec<Position>> {
    info!("Fetching positions for wallet: {:?}", params.wallet);
    
    // Mock data - replace with actual Saros DLMM SDK calls
    let positions = vec![
        Position {
            id: "1".to_string(),
            pair: "SOL/USDC".to_string(),
            liquidity: 12500.50,
            fees_earned: 125.75,
            impermanent_loss: -2.3,
            apr: 15.4,
            status: "active".to_string(),
        },
        Position {
            id: "2".to_string(),
            pair: "RAY/SOL".to_string(),
            liquidity: 8300.25,
            fees_earned: 67.80,
            impermanent_loss: 1.2,
            apr: 18.7,
            status: "active".to_string(),
        },
        Position {
            id: "3".to_string(),
            pair: "ORCA/USDC".to_string(),
            liquidity: 5600.00,
            fees_earned: 34.20,
            impermanent_loss: -0.8,
            apr: 12.1,
            status: "inactive".to_string(),
        },
    ];
    
    Json(positions)
}

async fn get_portfolio_summary(Query(params): Query<PositionsQuery>) -> Json<PortfolioSummary> {
    info!("Fetching portfolio summary for wallet: {:?}", params.wallet);
    
    let summary = PortfolioSummary {
        total_liquidity: 26400.75,
        total_fees_earned: 227.75,
        average_apr: 15.4,
        total_positions: 3,
    };
    
    Json(summary)
}

async fn get_analytics_data(Query(params): Query<PositionsQuery>) -> Json<Vec<AnalyticsData>> {
    info!("Fetching analytics data for wallet: {:?}", params.wallet);
    
    let analytics = vec![
        AnalyticsData {
            date: "2024-01-01".to_string(),
            liquidity: 10000.0,
            fees: 50.0,
            volume: 25000.0,
        },
        AnalyticsData {
            date: "2024-01-02".to_string(),
            liquidity: 12000.0,
            fees: 75.0,
            volume: 30000.0,
        },
        AnalyticsData {
            date: "2024-01-03".to_string(),
            liquidity: 15000.0,
            fees: 90.0,
            volume: 35000.0,
        },
        AnalyticsData {
            date: "2024-01-04".to_string(),
            liquidity: 18000.0,
            fees: 110.0,
            volume: 28000.0,
        },
        AnalyticsData {
            date: "2024-01-05".to_string(),
            liquidity: 20000.0,
            fees: 125.0,
            volume: 42000.0,
        },
        AnalyticsData {
            date: "2024-01-06".to_string(),
            liquidity: 22000.0,
            fees: 140.0,
            volume: 38000.0,
        },
        AnalyticsData {
            date: "2024-01-07".to_string(),
            liquidity: 26400.0,
            fees: 227.0,
            volume: 45000.0,
        },
    ];
    
    Json(analytics)
}

async fn health_check() -> Json<HashMap<String, String>> {
    let mut response = HashMap::new();
    response.insert("status".to_string(), "healthy".to_string());
    response.insert("service".to_string(), "saros-analytics-backend".to_string());
    Json(response)
}

#[tokio::main]
async fn main() {
    // Initialize tracing
    tracing_subscriber::fmt::init();
    
    // Build our application with routes
    let app = Router::new()
        .route("/health", get(health_check))
        .route("/api/positions", get(get_positions))
        .route("/api/portfolio-summary", get(get_portfolio_summary))
        .route("/api/analytics", get(get_analytics_data))
        .layer(
            ServiceBuilder::new().layer(
                CorsLayer::new()
                    .allow_origin(Any)
                    .allow_methods([Method::GET, Method::POST])
                    .allow_headers(Any),
            ),
        );

    let listener = tokio::net::TcpListener::bind("0.0.0.0:8080").await.unwrap();
    info!("Server running on http://0.0.0.0:8080");
    
    axum::serve(listener, app).await.unwrap();
}
