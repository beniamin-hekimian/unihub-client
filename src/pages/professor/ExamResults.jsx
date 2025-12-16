import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function ExamResults() {
  const { examId } = useParams();

  const [exam, setExam] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch exam + students + existing results
  useEffect(() => {
    async function fetchResults() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/results/exam/${examId}`,
          { withCredentials: true }
        );

        setExam(res.data.exam);
        setStudents(res.data.students);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load exam results");
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, [examId]);

  function handleMarkChange(studentId, value) {
    setStudents((prev) =>
      prev.map((s) => (s.studentId === studentId ? { ...s, mark: value } : s))
    );
  }

  async function saveResults(publish = false) {
    try {
      setSaving(true);

      const updatedStudents = [...students];

      for (let i = 0; i < updatedStudents.length; i++) {
        const s = updatedStudents[i];

        if (s.mark === null || s.mark === "") continue;

        if (s.resultId) {
          // update existing result
          await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/results/${s.resultId}`,
            { mark: s.mark, published: publish },
            { withCredentials: true }
          );

          // update local state
          s.published = publish;
        } else {
          // create new result
          const res = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/results`,
            {
              studentId: s.studentId,
              examId,
              mark: s.mark,
              published: publish,
            },
            { withCredentials: true }
          );

          s.resultId = res.data.result._id;
          s.published = publish;
        }
      }

      setStudents(updatedStudents); // update state after all updates

      toast.success(publish ? "Results published successfully" : "Draft saved");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save results");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="text-center">Loading results...</p>;
  }

  return (
    <section className="h-full flex flex-col gap-6 items-center">
      <h1 className="font-bold text-2xl text-center">Exam Results</h1>

      {/* Exam Info */}
      <Card className="max-w-2xl w-full">
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div>
            <strong>Subject:</strong> {exam.subject.name} (Year{" "}
            {exam.subject.year})
          </div>
          <div>
            <strong>Date:</strong>{" "}
            {new Date(exam.date).toLocaleDateString("en-GB")}
          </div>
        </CardContent>
      </Card>

      {/* Results Table */}
      <Table className="max-w-4xl mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Mark</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {students.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-muted-foreground"
              >
                No enrolled students
              </TableCell>
            </TableRow>
          ) : (
            students.map((s) => (
              <TableRow key={s.studentId}>
                <TableCell className="font-medium">{s.name}</TableCell>
                <TableCell>{s.email}</TableCell>
                <TableCell className="w-32">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={s.mark ?? ""}
                    onChange={(e) =>
                      handleMarkChange(s.studentId, e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  {s.resultId ? (
                    s.published ? (
                      <Badge variant="secondary" className="bg-green-200">
                        Published
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-yellow-200">
                        Draft
                      </Badge>
                    )
                  ) : (
                    <Badge variant="outline">Not Graded</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Actions */}
      <div className="flex gap-4">
        <Button
          variant="secondary"
          disabled={saving}
          onClick={() => saveResults(false)}
        >
          Save Draft
        </Button>
        <Button disabled={saving} onClick={() => saveResults(true)}>
          Publish Results
        </Button>
      </div>
    </section>
  );
}
