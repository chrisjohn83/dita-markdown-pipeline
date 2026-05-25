# Monitor Fleet Vehicles in Real Time &#123;#task-fleet-monitor-vehicles .task&#125;

Use the Fleet Management REST APIs to retrieve a live view of all vehicles in your fleet, inspect individual vehicle status, and identify vehicles that are offline or in alert state.

Before monitoring fleet vehicles via the API:

-   Obtain a valid access token with the `fleet:read` scope. See [API Authentication](../auth/ref-api-authentication.md).
-   Note your `tenant_id` from the Admin console.
-   Vehicles must be onboarded and in `active` status.

Fleet monitoring is the process of continuously polling vehicle status and location data to maintain situational awareness across large fleets. This task walks through the API call sequence a client application uses to render a live fleet dashboard.

1.  Authenticate and obtain a Bearer token.

    ```
    POST https://auth.connectedcar.io/oauth2/token
    grant_type=client_credentials
    &client_id=YOUR_CLIENT_ID
    &client_secret=YOUR_CLIENT_SECRET
    &scope=fleet:read
    ```

    Store the returned `access_token` for subsequent calls.

2.  Retrieve the full list of active fleet vehicles.

    ```
    GET /v1/fleet/vehicles?status=active&limit=200
    Authorization: Bearer &#123;access_token&#125;
    X-Tenant-ID: &#123;tenant_id&#125;
    ```

    Parse `data.vehicles[]` to populate your fleet map or table. Use `pagination.next_page` to page through results if `total_records` exceeds your `limit`.

3.  Identify vehicles that are offline or have active alerts.

    Filter the vehicle list where:

    -   `connectivity.online == false` — vehicle is unreachable.
    -   `alerts_active > 0` — vehicle has unresolved alerts.
    Flag these vehicles for immediate attention on the dashboard.

4.  Drill into individual vehicle status for flagged vehicles.

    ```
    GET /v1/fleet/vehicles/&#123;vehicleId&#125;/status
    Authorization: Bearer &#123;access_token&#125;
    X-Tenant-ID: &#123;tenant_id&#125;
    ```

    Review `engine.state`, `fuel.level_percent`, `battery.health_percent`, `location`, and `connectivity.last_heartbeat` for diagnostic context.

5.  Refresh the fleet list on a polling interval for real-time updates.

    Recommended polling interval: every **30 seconds** for the fleet list; every **10 seconds** for individual vehicle status during active monitoring. Respect the `429 Too Many Requests` response and implement exponential back-off if rate limits are reached.


Your client application maintains a current view of all fleet vehicles, their locations, connectivity states, and alert conditions — enabling dispatchers and fleet managers to respond rapidly to incidents.

To organize vehicles by region or purpose, proceed to [Manage Fleet Groups](task-fleet-manage-groups.md).

**Related information**  


[API: List Fleet Vehicles](ref-fleet-list-vehicles.md)

[API: Get Vehicle Status](ref-fleet-vehicle-status.md)

[API Authentication](../auth/ref-api-authentication.md)


