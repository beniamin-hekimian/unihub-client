import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { Pencil, Trash } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/context/AuthContext";

export default function Exams() {
  const { user } = useAuth();
  const [exams, setExams] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [examsLoading, setExamsLoading] = useState(true);
  const [subjectsLoading, setSubjectsLoading] = useState(false);

  const [formData, setFormData] = useState({
    subjectId: "",
    date: "",
    duration: "",
    location: "",
  });

  const [editingExam, setEditingExam] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [examToDelete, setExamToDelete] = useState(null);

  // Fetch Exams for that professor
  useEffect(() => {
    async function fetchExams() {
      if (!user?.id) return;

      setExamsLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/exams/professor?professorId=${
            user.professor.id
          }`,
          {
            withCredentials: true,
          }
        );
        if (res.data.exams) setExams(res.data.exams);
      } catch (err) {
        console.error(err);
      } finally {
        setExamsLoading(false);
      }
    }
    fetchExams();
  }, [user]);

  // Fetch subjects taught by this professor
  useEffect(() => {
    async function fetchSubjects() {
      if (!user?.id) return;
      setSubjectsLoading(true);

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/subjects/professors/${
            user.professor.id
          }`,
          { withCredentials: true }
        );
        if (res.data.subjects) setSubjects(res.data.subjects);
      } catch (err) {
        console.error(err);
        setSubjects([]);
      } finally {
        setSubjectsLoading(false);
      }
    }

    fetchSubjects();
  }, [user]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const isFormValid = formData.subjectId && formData.date;

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let res;
      if (editingExam) {
        // Update exam mode
        res = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/exams/${editingExam._id}`,
          formData,
          { withCredentials: true }
        );
        if (res.data.exam) {
          setExams((prev) =>
            prev.map((e) => (e._id === editingExam._id ? res.data.exam : e))
          );
          toast.success("Exam updated successfully!");
        }
      } else {
        // Create exam mode
        res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/exams`,
          { ...formData },
          { withCredentials: true }
        );
        if (res.data.exam) {
          setExams((prev) => [...prev, res.data.exam]);
          toast.success("Exam created successfully!");
        }
      }

      setFormData({ subjectId: "", date: "", duration: "", location: "" });
      setEditingExam(null);
    } catch (err) {
      console.error(err);
      toast.error(
        editingExam ? "Failed to update exam." : "Failed to create exam."
      );
    }
  }

  function handleEdit(exam) {
    setEditingExam(exam);
    setFormData({
      subjectId: exam.subjectId?._id || "",
      date: exam.date ? exam.date.split("T")[0] : "",
      duration: exam.duration,
      location: exam.location,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openDeleteModal(exam) {
    setExamToDelete(exam);
    setDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    setExamToDelete(null);
    setDeleteModalOpen(false);
  }

  async function confirmDelete() {
    if (!examToDelete) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/exams/${examToDelete._id}`,
        { withCredentials: true }
      );
      setExams((prev) => prev.filter((e) => e._id !== examToDelete._id));
      toast.success("Exam deleted successfully!");
      closeDeleteModal();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete exam.");
    }
  }

  function resetForm() {
    setFormData({ subjectId: "", date: "", duration: "", location: "" });
    setEditingExam(null);
  }

  // Sort exams by date
  const sortedExams = [...exams].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <section className="h-full flex flex-col gap-8 items-center">
      <h1 className="font-bold text-2xl text-center">Manage Exams</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl w-full space-y-6 p-6 border rounded-xl shadow-xs"
      >
        <FieldGroup>
          <FieldSet className="grid md:grid-cols-2 gap-4">
            <FieldGroup className="space-y-4">
              {/* Subject */}
              <Field>
                <FieldLabel htmlFor="subjectId">
                  Subject<span className="text-red-500">*</span>
                </FieldLabel>
                <Select
                  name="subjectId"
                  value={formData.subjectId}
                  onValueChange={(v) =>
                    setFormData((prev) => ({ ...prev, subjectId: v }))
                  }
                  disabled={subjectsLoading}
                >
                  <SelectTrigger id="subjectId">
                    <SelectValue placeholder="Subject Name" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjectsLoading ? (
                      <SelectItem disabled value="loading">
                        Loading...
                      </SelectItem>
                    ) : subjects.length === 0 ? (
                      <SelectItem disabled value="none">
                        No subjects assigned
                      </SelectItem>
                    ) : (
                      subjects.map((s) => (
                        <SelectItem key={s._id} value={s._id}>
                          {s.name} ({`year ` + s.year})
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </Field>

              {/* Date */}
              <Field>
                <FieldLabel htmlFor="date">
                  Date<span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </Field>
            </FieldGroup>

            <FieldGroup className="space-y-4">
              <Field>
                <FieldLabel htmlFor="duration">Duration</FieldLabel>
                <Select
                  name="duration"
                  value={String(formData.duration)}
                  onValueChange={(v) =>
                    setFormData((prev) => ({ ...prev, duration: Number(v) }))
                  }
                >
                  <SelectTrigger id="duration">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="60">60 min</SelectItem>
                    <SelectItem value="90">90 min</SelectItem>
                    <SelectItem value="120">120 min</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              {/* Location */}
              <Field>
                <FieldLabel htmlFor="location">Location</FieldLabel>
                <Select
                  name="location"
                  value={formData.location}
                  onValueChange={(v) =>
                    setFormData((prev) => ({ ...prev, location: v }))
                  }
                >
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Room A">Room A</SelectItem>
                    <SelectItem value="Room B">Room B</SelectItem>
                    <SelectItem value="Room C">Room C</SelectItem>
                    <SelectItem value="Lab 1">Lab 1</SelectItem>
                    <SelectItem value="Lab 2">Lab 2</SelectItem>
                    <SelectItem value="Main Hall">Main Hall</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>
          </FieldSet>

          <Field orientation="horizontal" className="flex justify-center gap-4">
            {editingExam ? (
              <>
                <Button type="submit">Update Exam</Button>
                <Button type="reset" variant="secondary" onClick={resetForm}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button type="submit" disabled={!isFormValid}>
                  Add Exam
                </Button>
                <Button type="reset" variant="secondary" onClick={resetForm}>
                  Reset
                </Button>
              </>
            )}
          </Field>
        </FieldGroup>
      </form>

      {/* Exams Table */}
      {examsLoading ? (
        <p className="text-center text-muted-foreground">Loading exams...</p>
      ) : exams.length === 0 ? (
        <p className="text-center text-muted-foreground">No exams available</p>
      ) : (
        <Table className="max-w-4xl mx-auto">
          <TableHeader>
            <TableRow>
              <TableHead>Subject Name</TableHead>
              <TableHead>Exam Date</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-center">Edit</TableHead>
              <TableHead className="text-center">Delete</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {sortedExams.map((exam) => (
              <TableRow key={exam._id}>
                <TableCell className="font-medium">
                  {exam.subjectId?.name || "—"}
                </TableCell>
                <TableCell>
                  {exam.date
                    ? new Date(exam.date).toLocaleDateString("en-GB")
                    : "—"}
                </TableCell>
                <TableCell>
                  {exam.duration ? `${exam.duration} min` : "—"}
                </TableCell>
                <TableCell>{exam.location || "—"}</TableCell>
                <TableCell className="text-center">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleEdit(exam)}
                    className="rounded-md hover:bg-yellow-500 hover:text-white"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => openDeleteModal(exam)}
                    className="rounded-md hover:bg-red-500 hover:text-white"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onRequestClose={closeDeleteModal}
        className="bg-white p-6 max-w-md mx-auto mt-40 rounded-xl shadow-lg outline-none"
        overlayClassName="fixed inset-0 bg-black/50 z-40"
      >
        <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
        <p className="mb-6">
          Are you sure you want to delete the exam for{" "}
          <span className="font-semibold">{examToDelete?.subjectId?.name}</span>
          ?
        </p>
        <div className="flex justify-end gap-4">
          <Button variant="secondary" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={confirmDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </section>
  );
}
