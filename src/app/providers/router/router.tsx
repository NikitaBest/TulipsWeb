import { createBrowserRouter } from "react-router-dom";
import { ArticlePage } from "@/pages/article";
import { ChatPage } from "@/pages/chat";
import { KnowledgeBasePage } from "@/pages/knowledge-base";
import { LandingPage } from "@/pages/landing";
import { NotFoundPage } from "@/pages/not-found";
import { routes } from "@/shared/config/routes";

export const appRouter = createBrowserRouter([
  { path: routes.landing, element: <LandingPage /> },
  { path: routes.chat, element: <ChatPage /> },
  { path: routes.knowledgeBase, element: <KnowledgeBasePage /> },
  { path: "/knowledge-base/:id", element: <ArticlePage /> },
  { path: "*", element: <NotFoundPage /> },
]);
