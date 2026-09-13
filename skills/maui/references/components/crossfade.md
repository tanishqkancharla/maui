# Crossfade

Gallery: `/components/crossfade`. Import from `"maui"`.

When `contentKey` changes, the previous view fades out along `direction`, then the next view fades in from the opposite side. Sequential (`mode="wait"`). Offset is spacing step 6.

```tsx
<Crossfade direction="up" contentKey={label}>
  <Text>{label}</Text>
</Crossfade>
```

- `direction` is required: `"up" | "down" | "left" | "right"`.
- `contentKey` is required. **Do not** put `key` on `Crossfade` itself or the exit is skipped.
- Reduced motion: opacity only.
