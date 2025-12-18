import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";

export default function Results() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResultsByProfessor() {
      if (!user?.professor?.id) return;

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/results/professor?professorId=${
            user.professor.id
          }`,
          { withCredentials: true }
        );

        if (res.data.exams) {
          setExams(res.data.exams);
        }
      } catch (err) {
        console.error("Failed to fetch professor results:", err);
        setExams([]);
      } finally {
        setLoading(false);
      }
    }

    fetchResultsByProfessor();
  }, [user]);

  return (
    <section className="h-full flex flex-col gap-8 items-center">
      <h1 className="font-bold text-2xl text-center">Manage Results</h1>

      {/* Professor Info Card */}
      <Card className="max-w-xl w-full">
        <CardContent className="grid md:grid-cols-2 gap-6">
          <div>
            <strong>Professor Name: </strong>
            <span>{user.name}</span>
          </div>
          <div>
            <strong>Department: </strong>
            <span>{user.professor?.department ?? "—"}</span>
          </div>
        </CardContent>
      </Card>

      {/* Results Table */}
      {loading ? (
        <p className="text-center text-muted-foreground">Loading results...</p>
      ) : exams.length === 0 ? (
        <p className="text-center text-muted-foreground">No exams found.</p>
      ) : (
        <Table className="max-w-4xl mx-auto">
          <TableHeader>
            <TableRow>
              <TableHead>Subject Name</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Exam Date</TableHead>
              <TableHead>Total Results</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {exams.map((exam) => (
              <TableRow key={exam._id}>
                <TableCell className="font-medium">
                  {exam.subject?.name ?? "—"}
                </TableCell>
                <TableCell>{exam.subject?.year ?? "—"}</TableCell>
                <TableCell>
                  {exam.date
                    ? new Date(exam.date).toLocaleDateString("en-GB")
                    : "—"}
                </TableCell>
                <TableCell>
                  {exam.totalResults ?? 0}/{exam.totalStudents ?? 0}
                </TableCell>
                <TableCell>
                  {exam.published ? (
                    <Badge variant="secondary" className="bg-green-200">
                      Published
                    </Badge>
                  ) : exam.totalResults > 0 ? (
                    <Badge variant="secondary" className="bg-yellow-200">
                      Draft
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Not Graded</Badge>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/professor/results/${exam._id}`)}
                  >
                    Manage Results
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </section>
  );
}
