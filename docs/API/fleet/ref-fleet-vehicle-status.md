# GET /fleet/vehicles/\&#123;vehicleId\&#125;/status — Get Vehicle Status &#123;#ref-fleet-vehicle-status .reference&#125;

Returns the real-time operational status of a single vehicle, including location, connectivity, engine state, fuel/battery level, and door lock state.

## Endpoint &#123; .section&#125;

|

**Method**

||

`GET`

||

**URI Path**

||

`https://api.connectedcar.io/v1/fleet/vehicles/&#123;vehicleId&#125;/status`

||

**Auth Scope**

||

`fleet:read`

||

**Rate Limit**

||

300 requests / minute per tenant

|
## Authentication &#123; .section&#125;

```
Authorization: Bearer &#123;access_token&#125;
X-Tenant-ID: &#123;tenant_id&#125;
```

## Path Parameters &#123; .section&#125;

|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|`vehicleId`|string|Yes|Unique platform vehicle identifier \(e.g., `veh_X7K2M9P1`\).|

## Sample Request &#123; .section&#125;

```
GET /v1/fleet/vehicles/veh_X7K2M9P1/status HTTP/1.1
Host: api.connectedcar.io
Authorization: Bearer eyJhbGciOiJSUzI1NiJ9...
X-Tenant-ID: tenant_abc123
X-Request-ID: a1b2c3d4-e5f6-7890-abcd-ef1234567890
Accept: application/json
```

## Sample Response — 200 OK &#123; .section&#125;

```
&#123;
  "status": "success",
  "data": &#123;
    "vehicle_id": "veh_X7K2M9P1",
    "vin": "1HGCM82633A004352",
    "timestamp": "2026-04-30T08:20:15Z",
    "operational_status": "active",
    "engine": &#123;
      "state": "off",
      "runtime_hours": 1842.5,
      "coolant_temp_celsius": 22
    &#125;,
    "location": &#123;
      "latitude": 37.7749,
      "longitude": -122.4194,
      "heading_degrees": 275,
      "speed_kmh": 0,
      "altitude_m": 16,
      "address": "Market St, San Francisco, CA, USA",
      "geofence_status": "inside"
    &#125;,
    "fuel": &#123;
      "level_percent": 68,
      "range_km": 412,
      "type": "petrol"
    &#125;,
    "battery": &#123;
      "voltage_v": 12.7,
      "health_percent": 92,
      "charging": false
    &#125;,
    "doors": &#123;
      "locked": true,
      "front_left": "closed",
      "front_right": "closed",
      "rear_left": "closed",
      "rear_right": "closed",
      "trunk": "closed"
    &#125;,
    "connectivity": &#123;
      "online": true,
      "signal_type": "5G",
      "signal_strength_dbm": -72,
      "last_heartbeat": "2026-04-30T08:20:10Z"
    &#125;,
    "odometer_km": 24315,
    "alerts_active": 0
  &#125;,
  "request_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "timestamp": "2026-04-30T08:20:15Z"
&#125;
```

## Error Codes &#123; .section&#125;

|HTTP Status|Error Code|Description|Resolution|
|-----------|----------|-----------|----------|
|`404`|`VEHICLE_NOT_FOUND`|No vehicle with the given `vehicleId` exists in this tenant.|Verify the vehicle ID using the List Vehicles endpoint.|
|`403`|`INSUFFICIENT_SCOPE`|Token missing `fleet:read` scope.|Re-authorize with correct scope.|
|`503`|`VEHICLE_OFFLINE`|Vehicle TCU is not currently reachable; last known status returned.|Check `connectivity.last_heartbeat` for staleness context.|

**Related information**  


[List All Fleet Vehicles](ref-fleet-list-vehicles.md)

[Fleet Group Management](ref-fleet-group-management.md)



