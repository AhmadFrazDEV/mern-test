# Debug Fixes Explained

##  Original Problems:
1. Sorting was done in JS after fetching all posts → inefficient, slow, risky for memory.
2. No `.limit()` → may crash if DB has 100k+ posts.
3. No error handling → API may hang or crash if DB fails.

##  Fixes:
- Used `.sort()` inside MongoDB query → leverages DB indexes
- Added `.limit(100)` → prevents memory overload
- Wrapped in try/catch → gracefully returns HTTP 500 on failure
