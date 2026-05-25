# Fleet Group Management APIs {#ref-fleet-group-management .reference}

Create fleet groups, assign vehicles to groups, and retrieve group details. Fleet groups enable centralized management of vehicles by region, type, or purpose.

## POST /fleet/groups — Create a Fleet Group { .section}

<table><tbody><tr><td>

**Method**

</td><td>

`POST`

</td></tr><tr><td>

**URI Path**

</td><td>

`https://api.connectedcar.io/v1/fleet/groups`

</td></tr><tr><td>

**Auth Scope**

</td><td>

`fleet:write`

</td></tr></tbody>
</table>**Authentication**

```
Authorization: Bearer {access_token}
X-Tenant-ID: {tenant_id}
Content-Type: application/json
```

**Request Body Parameters**

|Field|Type|Required|Description|
|-----|----|--------|-----------|
|`name`|string|Yes|Display name for the group \(max 100 chars\).|
|`description`|string|No|Optional description of the group's purpose.|
|`region`|string|No|Geographic region tag \(e.g., `north-america`\).|
|`tags`|array|No|Array of string tags for filtering \(e.g., `["delivery","urban"]`\).|

**Sample Request**

```
POST /v1/fleet/groups HTTP/1.1
Host: api.connectedcar.io
Authorization: Bearer eyJhbGciOiJSUzI1NiJ9...
X-Tenant-ID: tenant_abc123
Content-Type: application/json
X-Request-ID: b2c3d4e5-f6a7-8901-bcde-f12345678901

{
  "name": "North Region Fleet",
  "description": "All delivery vehicles operating in the northern region",
  "region": "north-america",
  "tags": ["delivery", "urban", "north"]
}
```

**Sample Response — 201 Created**

```
{
  "status": "success",
  "data": {
    "group_id": "grp_fleet_north",
    "name": "North Region Fleet",
    "description": "All delivery vehicles operating in the northern region",
    "region": "north-america",
    "tags": ["delivery", "urban", "north"],
    "vehicle_count": 0,
    "created_at": "2026-04-30T09:00:00Z",
    "created_by": "user_admin_01"
  },
  "request_id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
  "timestamp": "2026-04-30T09:00:01Z"
}
```

## PUT /fleet/vehicles/\{vehicleId\}/group — Assign Vehicle to Group { .section}

<table><tbody><tr><td>

**Method**

</td><td>

`PUT`

</td></tr><tr><td>

**URI Path**

</td><td>

`https://api.connectedcar.io/v1/fleet/vehicles/{vehicleId}/group`

</td></tr><tr><td>

**Auth Scope**

</td><td>

`fleet:write`

</td></tr></tbody>
</table>**Path Parameters**

|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|`vehicleId`|string|Yes|Platform vehicle identifier.|

**Sample Request**

```
PUT /v1/fleet/vehicles/veh_X7K2M9P1/group HTTP/1.1
Host: api.connectedcar.io
Authorization: Bearer eyJhbGciOiJSUzI1NiJ9...
X-Tenant-ID: tenant_abc123
Content-Type: application/json

{
  "group_id": "grp_fleet_north"
}
```

**Sample Response — 200 OK**

```
{
  "status": "success",
  "data": {
    "vehicle_id": "veh_X7K2M9P1",
    "vin": "1HGCM82633A004352",
    "group_id": "grp_fleet_north",
    "group_name": "North Region Fleet",
    "assigned_at": "2026-04-30T09:05:00Z",
    "assigned_by": "user_admin_01"
  },
  "timestamp": "2026-04-30T09:05:01Z"
}
```

## GET /fleet/groups/\{groupId\}/vehicles — List Vehicles in Group { .section}

<table><tbody><tr><td>

**Method**

</td><td>

`GET`

</td></tr><tr><td>

**URI Path**

</td><td>

`https://api.connectedcar.io/v1/fleet/groups/{groupId}/vehicles`

</td></tr><tr><td>

**Auth Scope**

</td><td>

`fleet:read`

</td></tr></tbody>
</table>**Sample Request**

```
GET /v1/fleet/groups/grp_fleet_north/vehicles?page=1&limit=5 HTTP/1.1
Host: api.connectedcar.io
Authorization: Bearer eyJhbGciOiJSUzI1NiJ9...
X-Tenant-ID: tenant_abc123
```

**Sample Response — 200 OK**

```
{
  "status": "success",
  "data": {
    "group_id": "grp_fleet_north",
    "group_name": "North Region Fleet",
    "vehicles": [
      { "vehicle_id": "veh_X7K2M9P1", "vin": "1HGCM82633A004352", "status": "active" },
      { "vehicle_id": "veh_A3N8Q5R7", "vin": "2T1BURHE0JC054321", "status": "active" }
    ],
    "pagination": { "page": 1, "limit": 5, "total_records": 28, "total_pages": 6 }
  },
  "timestamp": "2026-04-30T09:10:00Z"
}
```

## Error Codes — Fleet Group APIs { .section}

|HTTP Status|Error Code|Description|Resolution|
|-----------|----------|-----------|----------|
|`400`|`MISSING_REQUIRED_FIELD`|Required field `name` or `group_id` absent from request body.|Add the missing field and retry.|
|`404`|`GROUP_NOT_FOUND`|The specified `group_id` does not exist in this tenant.|Verify the group ID or create the group first.|
|`404`|`VEHICLE_NOT_FOUND`|No vehicle with the given `vehicleId` exists in this tenant.|Verify the vehicle ID using the List Vehicles endpoint.|
|`409`|`GROUP_NAME_CONFLICT`|A fleet group with the same name already exists.|Use a unique group name or update the existing group.|
|`403`|`INSUFFICIENT_SCOPE`|Token missing `fleet:write` scope for write operations.|Re-authorize with `fleet:write` scope.|

**Related information**  


[List All Fleet Vehicles](ref-fleet-list-vehicles.md)

[Task: Monitor Fleet Vehicles](task-fleet-monitor-vehicles.md)

