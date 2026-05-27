## Perform Connectivity Testing &#123;#task_ez3_xlj_cjc&#125;

Validate a vehicle device's wireless connectivity by running RF and protocol tests across simulated 5G, LTE, and satellite \(NR-NTN\) network conditions.

Before performing connectivity testing, ensure:

-   The device is onboarded and has **Active** status on the platform.
-   You have *Test Engineer* or *Admin* role permissions.
-   The network simulation environment is available and configured.

Connectivity testing validates that a vehicle's wireless modules perform correctly under a range of simulated network conditions. This includes RF performance \(signal strength, frequency compliance\) and protocol behavior \(MQTT, HTTP, gRPC\). Tests can be run against simulated 5G, LTE, and satellite environments without requiring live network access.

1.  Navigate to **Test Center** &gt; **Connectivity Testing**.

2.  Select the target device from the device list.

    Use the search or filter to locate the device by VIN, Device ID, or fleet group.

3.  Select the test type to initiate.

|

**RF Test**

||

Validates signal strength, frequency accuracy, and emission levels.

||

**Protocol Test**

||

Verifies MQTT, HTTP, and gRPC communication conformance and reliability.

||

**Full Connectivity Suite**

||

Runs both RF and protocol tests sequentially in a single session.

|
4.  Configure the simulated network conditions.

    1.  Select the network type: **5G NR**, **LTE**, or **Satellite \(NR-NTN\)**.

    2.  Set the channel conditions: signal strength \(dBm\), latency \(ms\), and packet loss \(%\).

    3.  Optionally enable interference simulation for coexistence testing.

5.  Click **Start Test** to begin the test session.

6.  Monitor the live test results in the **Test Monitor** panel.

    Results display in real time. Key metrics to observe:

    -   **Signal Strength:** Should be within the configured acceptable range.
    -   **Round-Trip Latency:** Should meet the threshold for the selected network type.
    -   **Packet Loss Rate:** Should remain below the configured maximum.
7.  Review the test summary report when the session completes.

    The report includes pass/fail status for each metric and a full trace log.

8.  Export the report if required for compliance documentation.

    Reports can be exported as PDF or CSV from the **Test History** tab.


Device connectivity is validated across the selected network scenarios. A test report is generated and stored in the platform. Devices that pass all thresholds are cleared for the next validation stage.

**Related information**  







