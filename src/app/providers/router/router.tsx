import { createBrowserRouter, createHashRouter } from "react-router-dom";
import { ArticlePage } from "@/pages/article";
import { ChatPage } from "@/pages/chat";
import { KnowledgeBasePage } from "@/pages/knowledge-base";
import { LandingPage } from "@/pages/landing";
import { NotFoundPage } from "@/pages/not-found";
import { routes } from "@/shared/config/routes";

const routeConfig = [
  { path: routes.landing, element: <LandingPage /> },
  { path: routes.chat, element: <ChatPage /> },
  { path: routes.knowledgeBase, element: <KnowledgeBasePage /> },
  { path: "/knowledge-base/:id", element: <ArticlePage /> },
  { path: "*", element: <NotFoundPage /> },
];

const routerMode = (import.meta.env.VITE_ROUTER_MODE ?? "hash").toLowerCase();

export const appRouter = routerMode === "browser" ? createBrowserRouter(routeConfig) : createHashRouter(routeConfig);
