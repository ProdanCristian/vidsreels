#!/bin/bash

# Monitor Server Events Script for VidsReels
# Usage: ./monitor-events.sh [production|localhost] [facebook|tiktok|all]

ENVIRONMENT=${1:-localhost}
PLATFORM=${2:-all}

if [ "$ENVIRONMENT" = "production" ]; then
    BASE_URL="https://vidsreels.com"
else
    BASE_URL="http://localhost:3000"
fi

AUTH_KEY="monitor-key-123"

echo "🔍 Monitoring VidsReels Server Events"
echo "Environment: $ENVIRONMENT"
echo "Platform: $PLATFORM"
echo "URL: $BASE_URL"
echo "----------------------------------------"

# Build query parameters
QUERY_PARAMS="limit=20"
if [ "$PLATFORM" != "all" ]; then
    QUERY_PARAMS="$QUERY_PARAMS&platform=$PLATFORM"
fi

# Make the request
curl -s -H "Authorization: Bearer $AUTH_KEY" \
     "$BASE_URL/api/monitor-events?$QUERY_PARAMS" | \
     jq -r '
     .stats as $stats |
     "📊 STATS:" |
     "  Total Events: \($stats.total)" |
     "  Facebook: \($stats.facebook)" |
     "  TikTok: \($stats.tiktok)" |
     "  Successful: \($stats.successful)" |
     "  Failed: \($stats.failed)" |
     "  Last Hour: \($stats.lastHour)" |
     "" |
     "📋 RECENT EVENTS:" |
     (.events[] | 
      "[\(.timestamp)] \(.platform) \(.eventName) - \(if .success then "✅ SUCCESS" else "❌ FAILED" end)" |
      "  Event ID: \(.eventId)" |
      "  Host: \(.host)" |
      "  User Data: Email=\(.hasEmail), Phone=\(.hasPhone)" |
      (if .value then "  Value: \(.value) \(.currency // "USD")" else empty end) |
      (if .error then "  Error: \(.error)" else empty end) |
      ""
     )'

echo "----------------------------------------"
echo "💡 Tips:"
echo "  - Run './monitor-events.sh production' for live site"
echo "  - Run './monitor-events.sh localhost facebook' for Facebook only"
echo "  - Check Vercel logs for more detailed information" 