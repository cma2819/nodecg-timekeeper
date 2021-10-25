# nodecg-timekeeper

Simple timer for timekeeping program.

# Installation

```
nodecg install cma2819/nodecg-timekeeper
```

# Configuration

## defaultconfig

``` json
{
  "disableDashboardControl": false,
  "tickRateMs": 100
}
```

## properties

### disableDashboardControl

- default: false
- Disable control timekeeper in dashboard if this is `false`.
  - This means that only control from extension message is allowed.

### tickRateMs

- default: 100
- Tick rate for update time.
- **Note: This simple timekeeper doesn't have digits less than second. Too less tick rate makes bad performance for other extensions.**

# Replicant schema

## Time data structure

This bundle shows time structure with common `Time` schema.

- [schema](../schemas/lib/time.json)

|key|type|description|
|:--|:--|:--|
|display|string|Time as string formatted to (hh:)mm:ss|
|rawInSecond|number|Time as second|

## timekeeping

Shows current time and timer status.

- name: `timekeeping`
- type: object
- [schema](../schemas/timekeeping.json)

|key|type|description|
|:--|:--|:--|
|time|[Time](#time-data-structure)|Current time data|
|status|`'paused'`\|`'in_progress'`\|`'finished'`|Current timer status string|

## history

Store times already finished.

- name: `history`
- type: array of [Time](#time-data-structure)
- [schema](../schemas/history.json)

# Control timer

This bundle has built-in controller on dashboard.

Also provides really simple message listener. Use `sendMessageToBundle` if you want to trigger action from your dashboard or graphics.

## dashboard

*Easy.*

![Simple Controller Image](./img/dashboard-controller.png)

## messages

If you avoid to use built-in controller and trigger action from your dashboard, it recommended to configure `disableDashboardControl: true`.

Documented [here](./md/extension.md).

# Graphics

This bundle has built-in simple graphics. This graphics is not for stream overlay. Share graphic view (e.g. Screen share with discord) or graphic's url **(risky way if you authorize to use NodeCG)** for timekeeping.

![Built-in graphics](./img/graphics.png)