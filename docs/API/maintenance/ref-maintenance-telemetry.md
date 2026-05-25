# GET /vehicles/\&#123;vehicleId\&#125;/telemetry — Query Telemetry History &#123;#ref-maintenance-telemetry .reference&#125;

Retrieves historical telemetry records for a vehicle over a specified time range. Used for trend analysis, predictive maintenance modelling, and usage reporting.

## Endpoint &#123; .section&#125;

|

**Method**

||

`GET`

||

**URI Path**

||

`https://api.connectedcar.io/v1/vehicles/&#123;vehicleId&#125;/telemetry`

||

**Auth Scope**

||

`telemetry:read`

||

**Rate Limit**

||

60 requests / minute per tenant

||

**Max Range**

||

90 days per request. Use pagination for longer periods.

|
## Authentication &#123; .section&#125;

```
Authorization: Bearer &#123;access_token&#125;
X-Tenant-ID: &#123;tenant_id&#125;
```

## Query Parameters &#123; .section&#125;

|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|`from`|ISO 8601|Yes|Start of time range \(UTC\), e.g., `2026-04-01T00:00:00Z`.|
|`to`|ISO 8601|Yes|End of time range \(UTC\), e.g., `2026-04-30T23:59:59Z`.|
|`metrics`|string\[\]|No|Comma-separated metric names to return. Default: all. Values: `speed`, `fuel_level`, `battery_voltage`, `engine_temp`, `oil_pressure`, `odometer`, `location`.|
|`resolution`|string|No|Aggregation bucket size: `raw`, `1m`, `5m`, `1h`, `1d`. Default: `5m`.|
|`page`|integer|No|Page number. Default: `1`.|
|`limit`|integer|No|Records per page. Default: `500`. Max: `2000`.|

## Sample Request &#123; .section&#125;

```
GET /v1/vehicles/veh_X7K2M9P1/telemetry
  ?from=2026-04-29T00:00:00Z
  &to=2026-04-30T23:59:59Z
  &metrics=fuel_level,engine_temp,oil_pressure,battery_voltage
  &resolution=1h
  &limit=50 HTTP/1.1
Host: api.connectedcar.io
Authorization: Bearer eyJhbGciOiJSUzI1NiJ9...
X-Tenant-ID: tenant_abc123
Accept: application/json
```

## Sample Response — 200 OK &#123; .section&#125;

```
&#123;
  "status": "success",
  "data": &#123;
    "vehicle_id": "veh_X7K2M9P1",
    "vin": "1HGCM82633A004352",
    "from": "2026-04-29T00:00:00Z",
    "to": "2026-04-30T23:59:59Z",
    "resolution": "1h",
    "metrics_returned": ["fuel_level", "engine_temp", "oil_pressure", "battery_voltage"],
    "records": [
      &#123;
        "timestamp": "2026-04-29T00:00:00Z",
        "fuel_level_percent": 72,
        "engine_temp_celsius": 21,
        "oil_pressure_kpa": 280,
        "battery_voltage_v": 12.7
      &#125;,
      &#123;
        "timestamp": "2026-04-29T01:00:00Z",
        "fuel_level_percent": 71,
        "engine_temp_celsius": 88,
        "oil_pressure_kpa": 310,
        "battery_voltage_v": 14.1
      &#125;,
      &#123;
        "timestamp": "2026-04-29T02:00:00Z",
        "fuel_level_percent": 68,
        "engine_temp_celsius": 91,
        "oil_pressure_kpa": 275,
        "battery_voltage_v": 14.2
      &#125;
    ],
    "pagination": &#123;
      "page": 1,
      "limit": 50,
      "total_records": 48,
      "total_pages": 1
    &#125;,
    "anomalies_detected": [
      &#123;
        "timestamp": "2026-04-29T01:00:00Z",
        "metric": "oil_pressure_kpa",
        "value": 310,
        "threshold": 300,
        "severity": "warning"
      &#125;
    ]
  &#125;,
  "request_id": "f6a7b8c9-d0e1-2345-fabc-456789012345",
  "timestamp": "2026-04-30T10:00:00Z"
&#125;
```

## Error Codes &#123; .section&#125;

|HTTP Status|Error Code|Description|Resolution|
|-----------|----------|-----------|----------|
|`400`|`INVALID_DATE_RANGE`|`from` is after `to`, or range exceeds 90 days.|Adjust the date range and paginate for longer periods.|
|`400`|`INVALID_METRIC`|One or more metric names in the `metrics` parameter are unrecognized.|Use only supported metric names listed in the parameters table.|
|`404`|`VEHICLE_NOT_FOUND`|No vehicle with this ID exists in the tenant.|Verify the vehicle ID.|
|`403`|`INSUFFICIENT_SCOPE`|Token missing `telemetry:read` scope.|Re-authorize with `telemetry:read`.|

**Related information**  


[GET Vehicle Health Score](ref-maintenance-health-score.md)

[GET/POST Maintenance Alerts](ref-maintenance-alerts.md)

[Task: Monitor Telemetry Trends](task-maintenance-monitor-trends.md)



