# MovieCard Component Flow Chart

This document outlines the flow of the `MovieCard` component, including state updates, re-renders, and `useEffect` behavior.

---

## Flow Chart

```plaintext
User Hovers on MovieCard
          ↓
Set isHovered to true → Triggers Re-render
          ↓
useEffect Runs (isHovered changed) → Fetch Trailer
          ↓
Set trailerUrl → Triggers Re-render
          ↓
Render Trailer (Iframe)

User Stops Hovering
          ↓
Set isHovered to false → Triggers Re-render
          ↓
useEffect Runs (isHovered changed) → Hide Trailer

User Hovers Over Different MovieCard
          ↓
Set isHovered to true → Triggers Re-render
          ↓
useEffect Runs (isHovered and movieId changed) → Fetch New Trailer
          ↓
Set trailerUrl → Triggers Re-render
          ↓
Render New Trailer (Iframe)
```
