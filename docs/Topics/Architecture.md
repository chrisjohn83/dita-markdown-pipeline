## Platform Architecture Overview &#123;#concept_qzh_v2j_cjc&#125;

The IoT Connected Car Platform follows a distributed, layered architecture spanning vehicle hardware, edge devices, cloud services, and user applications.

The platform is organized into six architectural layers. Each layer has a well-defined responsibility and communicates with adjacent layers through standardized interfaces. This separation of concerns enables independent scaling, testing, and evolution of each component.

### Architectural Layers &#123;#section_rzh_v2j_cjc .section&#125;

Layer 1 — Vehicle / TCU
:   The physical vehicle layer comprising sensors, ECUs \(Electronic Control Units\), and the Telematics Control Unit \(TCU\). The TCU acts as the edge gateway, aggregating sensor data and relaying commands from the cloud.

Layer 2 — Wireless Modules
:   Handles RF communication using UWB, 5G NR, and satellite \(NR-NTN\) protocols. Manages connectivity handoff, signal quality monitoring, and coexistence between wireless technologies.

Layer 3 — Data Processing Layer
:   A cloud-hosted streaming and rules engine. Receives raw telemetry, applies normalization and enrichment, evaluates alert rules, and routes data to the appropriate storage or notification channel.

Layer 4 — Storage Layer
:   Persists telemetry data in a time-series database optimized for high-frequency writes and range queries. Supports long-term retention for trend analysis and compliance.

Layer 5 — IoT Control Center
:   The core platform services layer. Contains the Device Registry, Command Service, and Telemetry Service. Provides the central orchestration point for all platform operations.

Layer 6 — API Gateway and User Applications
:   Exposes REST and GraphQL APIs for external consumers. Serves mobile apps, web portals, and third-party integrations. Enforces authentication, rate limiting, and versioning.

### Component Responsibilities &#123;#section_tzh_v2j_cjc .section&#125;

|Component|Layer|Responsibility|
|---------|-----|--------------|
|TCU / Edge Device|Vehicle|Sensor aggregation, command relay, local edge processing|
|MQTT Broker|Connectivity|Lightweight publish-subscribe messaging between device and cloud|
|API Gateway|Platform|Authentication, routing, rate limiting, API versioning|
|Device Registry|Platform|Stores device identity, credentials, and status|
|Command Service|Platform|Routes, queues, delivers, and acknowledges remote commands|
|Telemetry Service|Platform|Ingests, normalizes, and processes vehicle telemetry streams|
|Time-Series DB|Storage|High-frequency telemetry persistence and range queries|
|Mobile / Web App|Application|User-facing interface for monitoring and remote control|

### Design Principles &#123;#section_vzh_v2j_cjc .section&#125;

-   **Loose coupling:** Each layer communicates via published interfaces only.
-   **Horizontal scalability:** Cloud services scale independently under load.
-   **Security by design:** TLS and certificate-based auth at every boundary.
-   **Observability:** All service interactions produce structured audit logs.

**Related information**  


[Platform Data Flow](../../dita/concepts/concept-dataflow.md)

[Supported Technologies](../../dita/reference/ref-technologies.md)


