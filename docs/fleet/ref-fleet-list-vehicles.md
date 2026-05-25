# GET /fleet/vehicles — List All Fleet Vehicles {#ref-fleet-list-vehicles .reference}

Retrieves a paginated list of all vehicles registered to the authenticated tenant's fleet, with optional filters for status, group, and vehicle type.

## Endpoint { .section}

<table><tbody><tr><td>

**Method**

</td><td>

`GET`

</td></tr><tr><td>

**URI Path**

</td><td>

`https://api.connectedcar.io/v1/fleet/vehicles`

</td></tr><tr><td>

**Auth Scope**

</td><td>

`fleet:read`

</td></tr><tr><td>

**Rate Limit**

</td><td>

120 requests / minute per tenant

</td></tr></tbody>
</table>## Authentication { .section}

```
Authorization: Bearer {access_token}
X-Tenant-ID: {tenant_id}
```

See [API Authentication](../auth/ref-api-authentication.md) for token acquisition details.

## Query Parameters { .section}

|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|`status`|string|No|Filter by vehicle status. Values: `active`, `inactive`, `maintenance`.|
|`group_id`|string|No|Filter vehicles belonging to a specific fleet group.|
|`page`|integer|No|Page number, 1-based. Default: `1`.|
|`limit`|integer|No|Records per page. Default: `50`. Max: `200`.|
|`sort`|string|No|Sort field. Values: `vin`, `last_seen`, `status`. Default: `last_seen`.|

## Sample Request { .section}

```
GET /v1/fleet/vehicles?status=active&page=1&limit=3 HTTP/1.1
Host: api.connectedcar.io
Authorization: Bearer eyJhbGciOiJSUzI1NiJ9...
X-Tenant-ID: tenant_abc123
X-Request-ID: 7f3d9c2a-1b4e-4f8a-9d2c-3e5f7a1b9e4d
Accept: application/json
```

## Sample Response — 200 OK { .section}

```
{
  "status": "success",
  "data": {
    "vehicles": [
      {
        "vehicle_id": "veh_X7K2M9P1",
        "vin": "1HGCM82633A004352",
        "make": "Toyota",
        "model": "Camry",
        "year": 2023,
        "status": "active",
        "group_id": "grp_fleet_north",
        "group_name": "North Region Fleet",
        "last_seen": "2026-04-30T08:14:22Z",
        "location": {
          "latitude": 37.7749,
          "longitude": -122.4194,
          "address": "San Francisco, CA, USA"
        },
        "connectivity": {
          "signal_type": "5G",
          "signal_strength_dbm": -72,
          "online": true
        }
      },
      {
        "vehicle_id": "veh_A3N8Q5R7",
        "vin": "2T1BURHE0JC054321",
        "make": "Ford",
        "model": "Transit",
        "year": 2022,
        "status": "active",
        "group_id": "grp_fleet_north",
        "group_name": "North Region Fleet",
        "last_seen": "2026-04-30T08:10:05Z",
        "location": {
          "latitude": 37.3382,
          "longitude": -121.8863,
          "address": "San Jose, CA, USA"
        },
        "connectivity": {
          "signal_type": "LTE",
          "signal_strength_dbm": -85,
          "online": true
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 3,
      "total_records": 142,
      "total_pages": 48,
      "next_page": "/v1/fleet/vehicles?status=active&page=2&limit=3"
    }
  },
  "request_id": "7f3d9c2a-1b4e-4f8a-9d2c-3e5f7a1b9e4d",
  "timestamp": "2026-04-30T08:15:00Z"
}
```

## Error Codes { .section}

|HTTP Status|Error Code|Description|Resolution|
|-----------|----------|-----------|----------|
|`400`|`INVALID_QUERY_PARAM`|An unrecognized or malformed query parameter was supplied.|Review query parameter names and value formats.|
|`401`|`TOKEN_EXPIRED`|Bearer token has expired.|Refresh the access token and retry.|
|`403`|`INSUFFICIENT_SCOPE`|Token missing `fleet:read` scope.|Re-authorize with `fleet:read` scope.|
|`429`|`RATE_LIMIT_EXCEEDED`|Too many requests in the current time window.|Back off and retry after `Retry-After` header value.|
|`500`|`INTERNAL_ERROR`|Unexpected server error.|Retry with exponential back-off. Contact support if persistent.|

**Related information**  


[GET Vehicle Status](ref-fleet-vehicle-status.md)

[Fleet Group Management](ref-fleet-group-management.md)

[API Authentication](../auth/ref-api-authentication.md)

