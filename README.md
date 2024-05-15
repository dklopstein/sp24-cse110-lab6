Derek Klopstein

1. The first one is the best option. This is because we wanted automated tests, which means option 2 doesn't work because we're manually running them, and running them after all development is complete is pointless. We should test as we go, which fits the continuous integration and continuous development we've been talking about. This way, every time we push code to GitHub, we have automated tests that run. Using this, if we decide to change something within the code, add new features, or any modifications to the product we can see if it is still able to function properly with the automated checks. If not, we can decide not to merge it into the main branch.

---

2. No. End-to-end testing automates test cases that emulate user actions from start to finish (end to end). In the case of a function returning the correct output, something like an automated unit test via GitHub actions would be preferable. 