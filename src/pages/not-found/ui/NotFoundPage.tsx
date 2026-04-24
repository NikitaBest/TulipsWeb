import { Link } from "react-router-dom";
import { routes } from "@/shared/config/routes";
import { EmptyState } from "@/shared/ui/empty-state";
import { PageContainer } from "@/shared/ui/page-container";

export const NotFoundPage = () => (
  <PageContainer>
    <EmptyState title="404" description="Страница не найдена." />
    <Link to={routes.landing}>На главную</Link>
  </PageContainer>
);
