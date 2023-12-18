# Isar Aerospace Frontend Assignment

[Demo](https://isar.netlify.app/)

---
 <ins>**Assignment A & B**</ins>

Demo Link - https://isar.netlify.app

Repo Link - https://github.com/nitron99/isar-aerospace-assignment

**Note** - Assignment A & B are both combined into one react app. Where you can get Spectrum's status via websocket or manually refresh (https request). There is also a 3D representation of spectrum to indicate "isAscending" key in the status object.

**Package used**

Networking - Axios<br>
State management - Redux<br>
3d rendering - 3js + react three fiber<br>
Graphs and charts - Apex charts<br>


---
<ins>**Assignment C**<ins>

Here are some points on potential improvements of the API structure, deviations from common
standards or performance enhancements.

1. Keys in status payload from https request are in camelCase and from websocket, they are in PaselCase. If you they have same keys then in our usecase, they both should be in same case.

2. There is mapping for current time ( or any time value ) to data values of Altitude, Temperature and Velocity. There should be a discrete x-axis(time) value to plot (x-y)point in graph.

3. There should be units for Altitude, Temperature and Velocity(m/s, C, F, m, km/h) in a seperate https request. We should not add units data in websocket payload because it can make websocket's payload bulky and inefficient.

4. We can also make https and web socket APIs to send data only to authenticated user by implementing a JWT authentication system.


Credits - Fire animation in three.js was referenced from - [Link](https://codesandbox.io/p/sandbox/shader-fire-3878x)
