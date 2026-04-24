import { Card } from "@/shared/ui/card";

type EmptyStateProps = {
  title: string;
  description: string;
};

export const EmptyState = ({ title, description }: EmptyStateProps) => (
  <Card>
    <h3>{title}</h3>
    <p>{description}</p>
  </Card>
);
