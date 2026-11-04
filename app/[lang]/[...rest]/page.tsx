import { notFound } from "next/navigation";

/* Unknown URLs under a language render [lang]/not-found.tsx inside the site's layout. Without this
   route they never reach that page and get Next's bare default 404, with no header or way home. */
export default function CatchAll() {
  notFound();
}
