import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin dashboard — FoodieX" }, { name: "description", content: "Platform administration." }, { property: "og:title", content: "Admin dashboard — FoodieX" }, { property: "og:description", content: "Platform administration." }] }),
  component: () => <div className="mx-auto max-w-5xl px-4 py-16"><h1 className="text-3xl font-extrabold">Admin dashboard</h1><p className="mt-2 text-muted-foreground">Coming in the next step.</p></div>,
});
