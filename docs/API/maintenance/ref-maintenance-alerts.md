# Maintenance Alert APIs — GET and POST &#123;#ref-maintenance-alerts .reference&#125;

Retrieve active maintenance alerts for a vehicle and create custom alert rules that trigger when telemetry thresholds are exceeded.

## GET /vehicles/\&#123;vehicleId\&#125;/alerts — List Active Alerts &#123; .section&#125;

|

**Method**

||

`GET`

||

**URI Path**

||

`https://api.connectedcar.io/v1/vehicles/&#123;vehicleId&#125;/alerts`

||

**Auth Scope**

||

`telemetry:read`

|
**Query Parameters**

|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|`severity`|string|No|Filter by severity. Values: `critical`, `warning`, `info`.|
|`status`|string|No|Filter by alert status. Values: `active`, `resolved`. Default: `active`.|
|`category`|string|No|Filter by component category: `engine`, `battery`, `brakes`, `tyres`, `connectivity`.|

**Sample Request**

```
GET /v1/vehicles/veh_X7K2M9P1/alerts?severity=critical&status=active HTTP/1.1
Host: api.connectedcar.io
Authorization: Bearer eyJhbGciOiJSUzI1NiJ9...
X-Tenant-ID: tenant_abc123
```

**Sample Response — 200 OK**

```
&#123;
  "status": "success",
  "data": &#123;
    "vehicle_id": "veh_X7K2M9P1",
    "alerts": [
      &#123;
        "alert_id": "alrt_T4P2N8K1",
        "category": "tyres",
        "severity": "critical",
        "rule_id": "rule_tyre_pressure",
        "metric": "tyre_pressure_rear_left_kpa",
        "triggered_value": 178,
        "threshold": 195,
        "condition": "less_than",
        "message": "Rear-left tyre pressure critically low: 178 kPa (min 195 kPa).",
        "status": "active",
        "triggered_at": "2026-04-30T06:00:00Z",
        "resolved_at": null,
        "notification_sent": true,
        "notification_channels": ["push", "sms"]
      &#125;,
      &#123;
        "alert_id": "alrt_B7R3M6Q2",
        "category": "brakes",
        "severity": "warning",
        "rule_id": "rule_brake_wear",
        "metric": "front_pad_wear_percent",
        "triggered_value": 62,
        "threshold": 60,
        "condition": "greater_than",
        "message": "Front brake pad wear at 62% — inspect within 14 days.",
        "status": "active",
        "triggered_at": "2026-04-28T14:22:00Z",
        "resolved_at": null,
        "notification_sent": true,
        "notification_channels": ["push"]
      &#125;
    ],
    "total_alerts": 2
  &#125;,
  "timestamp": "2026-04-30T10:10:00Z"
&#125;
```

## POST /vehicles/\&#123;vehicleId\&#125;/alerts/rules — Create Alert Rule &#123; .section&#125;

|

**Method**

||

`POST`

||

**URI Path**

||

`https://api.connectedcar.io/v1/vehicles/&#123;vehicleId&#125;/alerts/rules`

||

**Auth Scope**

||

`telemetry:write`

|
**Request Body Parameters**

|Field|Type|Required|Description|
|-----|----|--------|-----------|
|`name`|string|Yes|Human-readable rule name.|
|`metric`|string|Yes|Telemetry metric to monitor \(see supported metrics in telemetry endpoint\).|
|`condition`|string|Yes|Comparison operator: `greater_than`, `less_than`, `equals`.|
|`threshold`|number|Yes|Numeric threshold value that triggers the alert.|
|`severity`|string|Yes|Alert severity: `critical`, `warning`, `info`.|
|`notification_channels`|string\[\]|Yes|Delivery channels: `push`, `sms`, `email`.|
|`cooldown_minutes`|integer|No|Minimum minutes between repeat notifications. Default: `60`.|

**Sample Request**

```
POST /v1/vehicles/veh_X7K2M9P1/alerts/rules HTTP/1.1
Host: api.connectedcar.io
Authorization: Bearer eyJhbGciOiJSUzI1NiJ9...
X-Tenant-ID: tenant_abc123
Content-Type: application/json

&#123;
  "name": "High Engine Temperature Alert",
  "metric": "engine_temp_celsius",
  "condition": "greater_than",
  "threshold": 105,
  "severity": "critical",
  "notification_channels": ["push", "sms", "email"],
  "cooldown_minutes": 30
&#125;
```

**Sample Response — 201 Created**

```
&#123;
  "status": "success",
  "data": &#123;
    "rule_id": "rule_eng_temp_high",
    "vehicle_id": "veh_X7K2M9P1",
    "name": "High Engine Temperature Alert",
    "metric": "engine_temp_celsius",
    "condition": "greater_than",
    "threshold": 105,
    "severity": "critical",
    "notification_channels": ["push", "sms", "email"],
    "cooldown_minutes": 30,
    "enabled": true,
    "created_at": "2026-04-30T10:15:00Z",
    "created_by": "user_fleet_mgr_01"
  &#125;,
  "timestamp": "2026-04-30T10:15:01Z"
&#125;
```

## Error Codes — Alert APIs &#123; .section&#125;

|HTTP Status|Error Code|Description|Resolution|
|-----------|----------|-----------|----------|
|`400`|`INVALID_METRIC`|Metric name is not supported for alert rules.|Use a supported metric from the telemetry endpoint documentation.|
|`400`|`INVALID_CONDITION`|Condition operator not recognized.|Use `greater_than`, `less_than`, or `equals`.|
|`409`|`RULE_ALREADY_EXISTS`|An alert rule for the same metric and condition already exists on this vehicle.|Update the existing rule or delete it before creating a new one.|
|`403`|`INSUFFICIENT_SCOPE`|Token missing required scope \(`telemetry:read` or `telemetry:write`\).|Re-authorize with the correct scope.|
|`404`|`VEHICLE_NOT_FOUND`|Vehicle ID not found in tenant.|Verify vehicle ID from the fleet list.|

**Related information**  


[Query Telemetry History](ref-maintenance-telemetry.md)

[Get Vehicle Health Score](ref-maintenance-health-score.md)

[Task: Configure Maintenance Alerts](task-maintenance-configure-alerts.md)



