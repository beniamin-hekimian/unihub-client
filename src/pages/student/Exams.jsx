import { useState, useEffect } from "react";
import axios from "axios";
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

export default function Exams() {
  const { user } = useAuth();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExamsByStudent() {
      try {
        if (!user?.student?.id) return;

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/exams/student?studentId=${
            user.student.id
          }`,
          { withCredentials: true }
        );

        if (res.data.exams) setExams(res.data.exams);
      } catch (err) {
        console.error("Failed to fetch exams:", err);
        setExams([]);
      } finally {
        setLoading(false);
      }
    }

    fetchExamsByStudent();
  }, [user]);

  // Sort exams: upcoming first, past last
  const sortedExams = exams
    .slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <section className="h-full flex gap-8 flex-col items-center">
      <h1 className="font-bold text-2xl text-center">My Exams</h1>

      {/* Student Info Card */}
      <Card className="max-w-xl w-full">
        <CardContent className="grid md:grid-cols-2 gap-6">
          <div>
            <strong>Student Name: </strong>
            <span>{user?.name}</span>
          </div>
          <div>
            <strong>Major: </strong>
            <span>{user?.student?.major ?? "—"}</span>
          </div>
        </CardContent>
      </Card>

      {/* Exams Table */}
      <Table className="max-w-5xl mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead>Exam</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center text-muted-foreground"
              >
                Loading exams...
              </TableCell>
            </TableRow>
          ) : sortedExams.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center text-muted-foreground"
              >
                No exams scheduled yet.
              </TableCell>
            </TableRow>
          ) : (
            sortedExams.map((exam) => {
              const isPast = exam.date && new Date(exam.date) < new Date();
              return (
                <TableRow key={exam._id}>
                  <TableCell className="font-medium">
                    {exam.subjectId?.name ?? "—"}
                  </TableCell>
                  <TableCell>{exam.subjectId?.year ?? "—"}</TableCell>
                  <TableCell>
                    {exam.date
                      ? new Date(exam.date).toLocaleDateString("en-GB")
                      : "—"}
                  </TableCell>
                  <TableCell>
                    {exam.duration ? `${exam.duration} min` : "—"}
                  </TableCell>
                  <TableCell>{exam.location ?? "—"}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={isPast ? "bg-red-200" : "bg-blue-200"}
                    >
                      {isPast ? "Past" : "Upcoming"}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </section>
  );
}
