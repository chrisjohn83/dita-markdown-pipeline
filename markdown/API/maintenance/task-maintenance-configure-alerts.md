# Configure Predictive Maintenance Alert Rules via API {#task-maintenance-configure-alerts .task}

Create custom telemetry alert rules that automatically notify your team when a vehicle's sensor readings cross maintenance-critical thresholds — enabling real-time predictive alerts.

Before configuring alert rules:

-   Obtain an access token with `telemetry:write` scope.
-   Identify the metrics and threshold values relevant to your maintenance policy.
-   Confirm notification channel preferences \(push, SMS, email\) with end users.

Custom alert rules let maintenance managers define their own threshold policies for each vehicle or vehicle class. Rules are evaluated in real time against incoming telemetry and fire notifications immediately when a threshold is breached.

1.  Identify the telemetry metrics and thresholds to monitor.

    Common predictive maintenance alert rules:

    |Metric|Condition|Threshold|Severity|
    |------|---------|---------|--------|
    |`engine_temp_celsius`|greater\_than|105|critical|
    |`oil_pressure_kpa`|less\_than|200|warning|
    |`battery_voltage_v`|less\_than|11.8|critical|
    |`front_pad_wear_percent`|greater\_than|60|warning|
    |`tyre_pressure_rear_left_kpa`|less\_than|195|critical|

2.  Create each alert rule via the API.

    ```
    POST /v1/vehicles/{vehicleId}/alerts/rules HTTP/1.1
    Authorization: Bearer {access_token}
    X-Tenant-ID: {tenant_id}
    Content-Type: application/json
    
    {
      "name": "Low Oil Pressure Warning",
      "metric": "oil_pressure_kpa",
      "condition": "less_than",
      "threshold": 200,
      "severity": "warning",
      "notification_channels": ["push", "email"],
      "cooldown_minutes": 60
    }
    ```

    Repeat for each metric you want to monitor. Note the returned `rule_id` for each rule.

3.  Verify all rules are created and enabled for the vehicle.

    ```
    GET /v1/vehicles/{vehicleId}/alerts/rules
    Authorization: Bearer {access_token}
    X-Tenant-ID: {tenant_id}
    ```

    Confirm each rule shows `"enabled": true` and the metric, condition, and threshold values are correct.

4.  Simulate a threshold breach \(optional\) to test the alert pipeline end-to-end.

    Use the platform's test alert endpoint to fire a synthetic alert for a rule:

    ```
    POST /v1/vehicles/{vehicleId}/alerts/rules/{ruleId}/test
    Authorization: Bearer {access_token}
    X-Tenant-ID: {tenant_id}
    ```

    Verify that notifications arrive on the configured channels within 30 seconds.

5.  Monitor incoming alerts using the GET alerts endpoint on a polling schedule.

    ```
    GET /v1/vehicles/{vehicleId}/alerts?status=active&severity=critical
    Authorization: Bearer {access_token}
    X-Tenant-ID: {tenant_id}
    ```

    Recommended polling interval for maintenance dashboards: every **5 minutes**. For critical alerts, consider webhook subscriptions instead of polling — contact your platform administrator to configure webhook delivery.

6.  Acknowledge and resolve alerts once the maintenance action is completed.

    ```
    PATCH /v1/vehicles/{vehicleId}/alerts/{alertId}
    Content-Type: application/json
    
    { "status": "resolved", "resolution_note": "Tyre pressure corrected to 220 kPa." }
    ```

    Resolved alerts are retained in the audit log with timestamps and resolution notes.


Custom maintenance alert rules are active on the platform. Your team will receive real-time notifications when vehicle telemetry breaches maintenance thresholds, enabling timely intervention before a failure occurs.

**Related information**  


[API: Maintenance Alerts](ref-maintenance-alerts.md)

[Task: Monitor Telemetry Trends](task-maintenance-monitor-trends.md)

[API: Query Telemetry History](ref-maintenance-telemetry.md)

