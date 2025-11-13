import { useNavigate } from "react-router";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Empty className="min-h-screen">
      <EmptyHeader>
        <EmptyTitle className="text-4xl font-bold">404 - Not Found</EmptyTitle>
        <EmptyDescription>
          The page you're looking for doesn't exist. Try going back home.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={() => navigate("/")} className="hover:cursor-pointer">
          Go Back Home
        </Button>
      </EmptyContent>
    </Empty>
  );
}
