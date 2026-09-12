import { useEffect } from "react";

/** Sets document.title and resets on unmount — replaces duplicated
 *  useEffect across page components. Pass { noindex: true } for internal
 *  pages like /admin so they never appear in search results. */
export default function usePageTitle(
  title: string,
  opts?: { noindex?: boolean },
) {
  const noindex = opts?.noindex ?? false;
  useEffect(() => {
    document.title = title;
    if (!noindex) return;
    let tag = document.querySelector(
      'meta[name="robots"]',
    ) as HTMLMetaElement | null;
    let created = false;
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "robots");
      document.head.appendChild(tag);
      created = true;
    }
    const prev = tag.getAttribute("content");
    tag.setAttribute("content", "noindex, nofollow");
    return () => {
      if (created) tag?.remove();
      else if (prev) tag?.setAttribute("content", prev);
      else tag?.removeAttribute("content");
    };
  }, [title, noindex]);
}
