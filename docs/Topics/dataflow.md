# Platform Data Flow &#123;#Untitled .concept&#125;

Data in the IoT Connected Car Platform travels from vehicle sensors through edge devices, cloud processing, and storage layers before reaching user applications and dashboards.

Understanding the end-to-end data flow is essential for diagnosing issues, optimizing performance, and designing integrations. The platform routes data through a sequence of well-defined processing stages.

## Data Flow Stages &#123;#section_fzc_1fj_cjc .section&#125;

1.  **Vehicle Sensors:** Engine, GPS, battery, fuel, and safety sensors generate raw telemetry at configurable intervals \(typically every 1–5 seconds\).
2.  **TCU / Edge Device:** The Telematics Control Unit aggregates sensor readings, applies local filtering, and packages data into MQTT or HTTP payloads.
3.  **Transport Layer \(MQTT / HTTP\):** Payloads are transmitted over TLS-secured channels to the cloud. MQTT is used for streaming telemetry; HTTP/REST for command acknowledgments and bulk uploads.
4.  **API Gateway:** Validates the incoming connection's JWT or device certificate, applies rate limiting, and routes the payload to the Telemetry Ingestion Service.
5.  **Telemetry Ingestion Service:** Deserializes, normalizes, and validates the incoming data against the platform schema. Malformed records are quarantined.
6.  **gRPC Processing Service:** Applies business logic — alert rule evaluation, geofence checks, event detection — and routes results to storage or the notification dispatcher.
7.  **Database \(Time-Series / SQLite\):** Normalized records are persisted. Time-series databases handle high-frequency writes; SQLite is used for device metadata and configuration.
8.  **GraphQL / REST APIs:** The stored data is made available to consumers through queryable API endpoints with filtering, aggregation, and pagination support.
9.  **User Dashboard / Apps:** Mobile and web applications query the APIs to display real-time status, historical charts, alerts, and driving insights.

## Command Reverse Flow &#123;#section_hzc_1fj_cjc .section&#125;

Remote commands travel in the opposite direction through the same infrastructure:

1.  User issues a command via the mobile app or web portal.
2.  Command is authenticated and validated by the API Gateway.
3.  Command Service queues and delivers the command to the vehicle via MQTT.
4.  TCU receives, executes, and acknowledges the command.
5.  Acknowledgment propagates back to the user application as a status update.

## Data Latency Characteristics &#123;#section_jzc_1fj_cjc .section&#125;

|Stage|Typical Latency|Notes|
|-----|---------------|-----|
|Sensor to TCU|&lt; 10 ms|Local CAN bus communication|
|TCU to Cloud \(5G\)|20–80 ms|Varies by network conditions|
|Ingestion to Storage|100–300 ms|Includes normalization pipeline|
|Storage to Dashboard|&lt; 500 ms|API query + rendering|
|Command Round-trip|500 ms–2 s|Includes delivery + acknowledgment|

**Related information**  


[Platform Architecture Overview](../../dita/concepts/concept-architecture.md)

[How to Execute Remote Commands](../../dita/tasks/task-remote-operations.md)


