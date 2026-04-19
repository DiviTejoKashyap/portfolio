/**
 * CustomCursor — REMOVED.
 *
 * The custom cursor was killed in favor of a footnote spec system
 * (see components/Spec.tsx). Design decisions now appear as inline
 * textbook-style footnotes beneath each section, visible to every user,
 * accessible to screen readers, and compatible with OS-level cursor
 * preferences.
 *
 * This component is kept as a null-returning stub so existing imports
 * in Index.tsx don't break. If you ever want to remove it fully:
 *   1. Delete this file
 *   2. Remove <CustomCursor /> and its import from src/pages/Index.tsx
 */
const CustomCursor = () => {
  // Ensure we don't leave the native cursor hidden if this component
  // was previously mounted with the old version.
  if (typeof document !== "undefined") {
    document.documentElement.style.cursor = "";
  }
  return null;
};

export default CustomCursor;
