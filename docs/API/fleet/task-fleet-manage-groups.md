# Create and Manage Fleet Groups via API &#123;#task-fleet-manage-groups .task&#125;

Use the Fleet Group REST APIs to create logical vehicle groups, assign vehicles to groups, and retrieve grouped fleet views for region- or role-based fleet management.

Before managing fleet groups via the API:

-   Obtain a valid access token with `fleet:read` and `fleet:write` scopes.
-   Note the `vehicle_id` values for all vehicles to be grouped \(retrieve from [List Fleet Vehicles](ref-fleet-list-vehicles.md)\).

Fleet groups allow operators to segment vehicles by geography, vehicle type, department, or operational purpose. Once grouped, fleet dashboards and bulk commands can be scoped to a specific group — reducing noise and improving operational efficiency.

1.  Create a new fleet group.

    ```
    POST /v1/fleet/groups HTTP/1.1
    Authorization: Bearer &#123;access_token&#125;
    X-Tenant-ID: &#123;tenant_id&#125;
    Content-Type: application/json
    
    &#123;
      "name": "North Region Fleet",
      "description": "Urban delivery vehicles — northern territory",
      "region": "north-america",
      "tags": ["delivery", "urban"]
    &#125;
    ```

    Note the returned `group_id` \(e.g., `grp_fleet_north`\) for subsequent assignment calls.

2.  Assign vehicles to the new group one at a time, or repeat for each vehicle.

    ```
    PUT /v1/fleet/vehicles/&#123;vehicleId&#125;/group HTTP/1.1
    Authorization: Bearer &#123;access_token&#125;
    X-Tenant-ID: &#123;tenant_id&#125;
    Content-Type: application/json
    
    &#123;
      "group_id": "grp_fleet_north"
    &#125;
    ```

    Repeat this call for every vehicle ID that belongs to the group. For bulk assignments, use the `POST /v1/fleet/groups/&#123;groupId&#125;/bulk-assign` endpoint with an array of `vehicle_ids`.

3.  Verify the group membership by listing vehicles in the group.

    ```
    GET /v1/fleet/groups/grp_fleet_north/vehicles
    Authorization: Bearer &#123;access_token&#125;
    X-Tenant-ID: &#123;tenant_id&#125;
    ```

    Confirm `data.vehicles[]` contains all expected members and that `pagination.total_records` matches your expected count.

4.  Monitor vehicles within the group using the group-scoped status filter.

    ```
    GET /v1/fleet/vehicles?group_id=grp_fleet_north&status=active
    Authorization: Bearer &#123;access_token&#125;
    X-Tenant-ID: &#123;tenant_id&#125;
    ```

    This returns only active vehicles in the specified group, enabling a focused operational view for regional dispatchers.


Fleet groups are created and populated. Group-scoped API queries now return only the relevant subset of vehicles, enabling region- or role-based fleet monitoring and command targeting.

**Related information**  


[API: Fleet Group Management](ref-fleet-group-management.md)

[Task: Monitor Fleet Vehicles](task-fleet-monitor-vehicles.md)


