# Monitor Telemetry Trends for Predictive Maintenance &#123;#task-maintenance-monitor-trends .task&#125;

Use the Telemetry and Health Score APIs to retrieve historical data, identify deteriorating component trends, and take proactive maintenance action before a failure occurs.

Before monitoring telemetry trends:

-   Obtain an access token with `telemetry:read` scope.
-   The vehicle must have at least 24 hours of telemetry data on the platform.
-   Identify the vehicle's `vehicleId` from the fleet list.

Predictive maintenance uses historical telemetry trends — not just current values — to anticipate component degradation. This task describes the API call sequence for a maintenance dashboard that proactively surfaces at-risk vehicles.

1.  Retrieve the overall health score to quickly triage vehicle condition.

    ```
    GET /v1/vehicles/&#123;vehicleId&#125;/health
    Authorization: Bearer &#123;access_token&#125;
    X-Tenant-ID: &#123;tenant_id&#125;
    ```

    Focus on:

    -   `overall_health_score` — composite risk indicator.
    -   `components` — per-component scores and flags.
    -   `predicted_failure_risk.next_30_days_percent` — failure probability.
    -   `maintenance_due[]` — upcoming service tasks with estimated dates.
2.  For components flagged as Fair, Poor, or Critical, query their telemetry history.

    ```
    GET /v1/vehicles/&#123;vehicleId&#125;/telemetry
      ?from=2026-04-01T00:00:00Z
      &to=2026-04-30T23:59:59Z
      &metrics=engine_temp,oil_pressure,battery_voltage
      &resolution=1h
    Authorization: Bearer &#123;access_token&#125;
    X-Tenant-ID: &#123;tenant_id&#125;
    ```

    Plot the returned `records[]` over time to visually identify declining trends \(e.g., steadily falling oil pressure, rising engine temperature\).

3.  Identify anomalies surfaced in the telemetry response.

    Check the `anomalies_detected[]` array in the telemetry response. Each anomaly includes:

    -   `metric` — which sensor triggered the anomaly.
    -   `value` vs `threshold` — the breach magnitude.
    -   `severity` — `warning` or `critical`.
    Cross-reference with the health score component flags for a complete picture.

4.  Retrieve any active maintenance alerts on the vehicle.

    ```
    GET /v1/vehicles/&#123;vehicleId&#125;/alerts?status=active
    Authorization: Bearer &#123;access_token&#125;
    X-Tenant-ID: &#123;tenant_id&#125;
    ```

    Review `alerts[].message` and `severity` to determine urgency and schedule the appropriate maintenance action.

5.  Generate the maintenance action plan based on the combined findings.

    Based on findings from steps 1–4, prioritize maintenance actions:

    |Health Grade|Urgency|Action|
    |------------|-------|------|
    |Critical \(0–39\)|Immediate|Remove from service. Schedule emergency maintenance.|
    |Poor \(40–59\)|Within 7 days|Schedule priority service appointment.|
    |Fair \(60–74\)|Within 30 days|Schedule next available service slot.|
    |Good \(75–89\)|At next service|Note flagged components for inspection.|


A prioritized maintenance action plan is generated from telemetry trends and health scores, enabling your team to service vehicles proactively and prevent unplanned downtime.

To receive automated alerts when thresholds are breached in future, proceed to [Configure Maintenance Alert Rules](task-maintenance-configure-alerts.md).

**Related information**  


[API: Query Telemetry History](ref-maintenance-telemetry.md)

[API: Get Vehicle Health Score](ref-maintenance-health-score.md)

[API: Maintenance Alerts](ref-maintenance-alerts.md)



