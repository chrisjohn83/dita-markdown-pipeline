# GET /vehicles/\&#123;vehicleId\&#125;/health — Get Vehicle Health Score &#123;#ref-maintenance-health-score .reference&#125;

Returns a composite predictive health score for the vehicle, derived from telemetry trends across engine, battery, tyres, and brakes — enabling proactive maintenance decisions.

## Endpoint &#123; .section&#125;

<table><tbody><tr><td>

**Method**

</td><td>

`GET`

</td></tr><tr><td>

**URI Path**

</td><td>

`https://api.connectedcar.io/v1/vehicles/&#123;vehicleId&#125;/health`

</td></tr><tr><td>

**Auth Scope**

</td><td>

`telemetry:read`

</td></tr><tr><td>

**Rate Limit**

</td><td>

60 requests / minute per tenant

</td></tr><tr><td>

**Score Refresh**

</td><td>

Health scores are recalculated every 4 hours from rolling telemetry data.

</td></tr></tbody>
</table>## Authentication &#123; .section&#125;

```
Authorization: Bearer &#123;access_token&#125;
X-Tenant-ID: &#123;tenant_id&#125;
```

## Health Score Interpretation &#123; .section&#125;

|Score Range|Grade|Recommended Action|
|-----------|-----|------------------|
|90–100|Excellent|No action required. Continue standard service intervals.|
|75–89|Good|Monitor flagged components at next scheduled service.|
|60–74|Fair|Schedule a service inspection within 30 days.|
|40–59|Poor|Schedule urgent service within 7 days.|
|0–39|Critical|Immediate service required. Consider removing vehicle from service.|

## Sample Request &#123; .section&#125;

```
GET /v1/vehicles/veh_X7K2M9P1/health HTTP/1.1
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
    "overall_health_score": 74,
    "grade": "Fair",
    "recommendation": "Schedule service inspection within 30 days.",
    "score_calculated_at": "2026-04-30T06:00:00Z",
    "components": &#123;
      "engine": &#123;
        "score": 82,
        "grade": "Good",
        "indicators": &#123;
          "coolant_temp_trend": "stable",
          "oil_pressure_trend": "declining",
          "runtime_hours": 1842,
          "last_service_km_ago": 8200
        &#125;,
        "flag": "Oil pressure declining — inspect at next service."
      &#125;,
      "battery": &#123;
        "score": 91,
        "grade": "Excellent",
        "indicators": &#123;
          "voltage_v": 12.7,
          "charge_cycles": 312,
          "health_percent": 92
        &#125;,
        "flag": null
      &#125;,
      "brakes": &#123;
        "score": 68,
        "grade": "Fair",
        "indicators": &#123;
          "front_pad_wear_percent": 62,
          "rear_pad_wear_percent": 58,
          "harsh_braking_events_30d": 14
        &#125;,
        "flag": "Brake pad wear exceeding threshold — inspect within 2 weeks."
      &#125;,
      "tyres": &#123;
        "score": 55,
        "grade": "Poor",
        "indicators": &#123;
          "front_left_pressure_kpa": 198,
          "front_right_pressure_kpa": 201,
          "rear_left_pressure_kpa": 178,
          "rear_right_pressure_kpa": 195
        &#125;,
        "flag": "Rear-left tyre pressure critically low — immediate inspection required."
      &#125;
    &#125;,
    "predicted_failure_risk": &#123;
      "next_30_days_percent": 18,
      "next_90_days_percent": 42,
      "highest_risk_component": "tyres"
    &#125;,
    "maintenance_due": [
      &#123; "service": "Oil change", "due_km": 1800, "due_date_estimate": "2026-06-15" &#125;,
      &#123; "service": "Brake inspection", "due_km": null, "due_date_estimate": "2026-05-14" &#125;,
      &#123; "service": "Tyre pressure check", "due_km": null, "due_date_estimate": "2026-05-01" &#125;
    ]
  &#125;,
  "request_id": "g7h8i9j0-k1l2-3456-ghij-567890123456",
  "timestamp": "2026-04-30T10:05:00Z"
&#125;
```

## Error Codes &#123; .section&#125;

|HTTP Status|Error Code|Description|Resolution|
|-----------|----------|-----------|----------|
|`404`|`VEHICLE_NOT_FOUND`|Vehicle ID not found in tenant.|Verify the vehicle ID.|
|`404`|`INSUFFICIENT_TELEMETRY`|Not enough telemetry data to compute a health score \(vehicle onboarded too recently\).|Health score available after 24 hours of telemetry collection.|
|`403`|`INSUFFICIENT_SCOPE`|Token missing `telemetry:read` scope.|Re-authorize with correct scope.|

**Related information**  


[Query Telemetry History](ref-maintenance-telemetry.md)

[GET/POST Maintenance Alerts](ref-maintenance-alerts.md)

[Task: Monitor Telemetry Trends](task-maintenance-monitor-trends.md)


