import { useEffect, useState } from "react";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";

export default function StudentResults() {
  const { user } = useAuth();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      if (!user?.student?.id) return;

      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/results/student?studentId=${
            user.student.id
          }`,
          { withCredentials: true }
        );

        if (res.data.results) {
          setResults(res.data.results);
          console.log(res.data.results);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, [user]);

  return (
    <section className="h-full flex flex-col gap-8 items-center">
      <h1 className="text-2xl font-bold text-center">My Results</h1>

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

      {/* Student results table */}
      {loading ? (
        <p className="text-center text-muted-foreground">Loading results...</p>
      ) : results.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No published results available
        </p>
      ) : (
        <Table className="max-w-2xl mx-auto">
          <TableHeader>
            <TableRow>
              <TableHead>Subject Name</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Exam Date</TableHead>
              <TableHead className="text-center">Mark</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {results.map((result) => (
              <TableRow key={result._id}>
                <TableCell className="font-medium">
                  {result.examId?.subjectId?.name || "—"}
                </TableCell>
                <TableCell>{result.examId?.subjectId?.year || "—"}</TableCell>
                <TableCell>
                  {result.examId?.date
                    ? new Date(result.examId.date).toLocaleDateString("en-GB")
                    : "—"}
                </TableCell>
                <TableCell className="text-center font-semibold">
                  {result.mark}
                </TableCell>
                <TableCell className="text-center">
                  {result.passed ? (
                    <Badge variant="secondary" className="bg-green-200">
                      Passed
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-red-200">
                      Failed
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </section>
  );
}
