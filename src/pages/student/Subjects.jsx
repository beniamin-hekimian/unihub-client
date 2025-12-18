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

export default function Subjects() {
  const { user } = useAuth();
  const [enrolments, setEnrolments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubjectsByStudent() {
      try {
        if (!user) return;
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/enrolments/student/${
            user.student.id
          }`,
          { withCredentials: true }
        );
        if (res.data.subjects) {
          setEnrolments(res.data.subjects);
        }
      } catch (err) {
        console.error("Failed to fetch subjects:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSubjectsByStudent();
  }, [user]);

  return (
    <section className="h-full flex gap-8 flex-col items-center">
      <h1 className="font-bold text-2xl text-center">My Subjects</h1>

      {/* Student Info Card */}
      <Card className="max-w-xl w-full">
        <CardContent className="grid md:grid-cols-2 gap-6">
          <div>
            <strong>Student Name: </strong>
            <span>{user.name}</span>
          </div>
          <div>
            <strong>Major: </strong>
            <span>{user.student?.major ?? "—"}</span>
          </div>
        </CardContent>
      </Card>

      {/* Student Subjects Table */}
      {loading ? (
        <p className="text-center text-muted-foreground">Loading subjects...</p>
      ) : enrolments.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No subjects assigned yet.
        </p>
      ) : (
        <Table className="max-w-3xl mx-auto">
          <TableHeader>
            <TableRow>
              <TableHead>Subject Name</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Department</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enrolments.map((e) => (
              <TableRow key={e._id}>
                <TableCell className="font-medium">
                  {e.subjectId.name}
                </TableCell>
                <TableCell>{e.subjectId.year}</TableCell>
                <TableCell>{e.subjectId.department ?? "—"}</TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant="secondary"
                    className={e.passed ? "bg-green-200" : "bg-yellow-200"}
                  >
                    {e.passed ? "Passed" : "Studying"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </section>
  );
}
