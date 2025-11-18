import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import Avatar from "@/components/Avatar";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <section className="h-full flex justify-center items-center p-4">
      <Card className="max-w-sm w-full shadow-lg border border-border">
        <CardHeader className="flex items-center gap-4 border-b border-border">
          <Avatar gender={user.gender} className="h-16 w-16" />
          <CardTitle className="text-lg md:text-xl font-semibold text-foreground">
            {user.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-3">
          <div className="flex justify-between">
            <strong className="text-foreground font-medium">Email:</strong>
            <span className="text-muted-foreground">{user.email}</span>
          </div>

          <div className="flex justify-between">
            <strong className="text-foreground font-medium">Role:</strong>
            <span
              className={
                user.role === "admin"
                  ? "text-green-500"
                  : user.role === "professor"
                  ? "text-purple-500"
                  : "text-blue-500"
              }
            >
              {user.role}
            </span>
          </div>

          {/* Extra professor-only info */}
          {user.role === "professor" && (
            <>
              <Separator />
              <div className="flex justify-between">
                <strong className="text-foreground font-medium">Phone:</strong>
                <span className="text-muted-foreground">
                  {user.professor.phone || "—"}
                </span>
              </div>

              <div className="flex justify-between">
                <strong className="text-foreground font-medium">
                  Department:
                </strong>
                <span className="text-muted-foreground">
                  {user.professor.department || "—"}
                </span>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
