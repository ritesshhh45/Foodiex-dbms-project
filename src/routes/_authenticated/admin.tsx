import { createFileRoute } from "@tanstack/react-router";
import { AdminPanel } from "@/components/admin/AdminPanel";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin dashboard — FoodieX" }, { name: "description", content: "Platform administration." }, { property: "og:title", content: "Admin dashboard — FoodieX" }, { property: "og:description", content: "Platform administration." }] }),
  component: AdminPanel,
});