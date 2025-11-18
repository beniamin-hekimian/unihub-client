import { useEffect, useState } from "react";
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
import { useAuth } from "@/context/AuthContext";

export default function Subjects() {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    async function fetchSubjects() {
      try {
        if (!user) return;
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/subjects?professorId=${
            user.professor.id
          }`,
          { withCredentials: true }
        );
        if (res.data.subjects) {
          setSubjects(res.data.subjects);
        }
      } catch (err) {
        console.error("Failed to fetch subjects:", err);
      }
    }
    fetchSubjects();
  }, [user]);

  return (
    <section className="h-full flex gap-8 flex-col items-center">
      <h1 className="font-bold text-2xl text-center">
        Professor Assigned Subjects
      </h1>

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

      {/* Professor Subjects Table */}
      <Table className="max-w-xl mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead>Subject Name</TableHead>
            <TableHead>Year</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subjects.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={2}
                className="text-center text-muted-foreground"
              >
                No subjects assigned yet.
              </TableCell>
            </TableRow>
          ) : (
            subjects.map((subject) => (
              <TableRow key={subject._id}>
                <TableCell className="font-medium">{subject.name}</TableCell>
                <TableCell>{subject.year}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </section>
  );
}
