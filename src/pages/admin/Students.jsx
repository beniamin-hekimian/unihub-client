import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { Pencil, Trash } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
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

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true); // new loading state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    year: "",
    major: "",
  });
  const [editingStudent, setEditingStudent] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  // Fetch all students
  useEffect(() => {
    async function fetchStudents() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/students`,
          { withCredentials: true }
        );
        // Sort by name
        const sortedStudents = res.data.students.sort((a, b) =>
          a.userId.name.localeCompare(b.userId.name)
        );
        setStudents(sortedStudents);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // stop loading after fetch
      }
    }
    fetchStudents();
  }, []);

  // Handle form change
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // Check if form is valid
  const isFormValid = editingStudent
    ? true // always valid in edit mode
    : formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.password.trim() !== "" &&
      formData.gender !== "" &&
      formData.year !== "" &&
      formData.major !== "";

  // Handle form submit
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let res;

      if (editingStudent) {
        // UPDATE mode
        res = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/students/${editingStudent._id}`,
          formData,
          { withCredentials: true }
        );

        if (res.data.student) {
          // Update the student in UI
          setStudents((prev) =>
            prev.map((s) =>
              s._id === editingStudent._id ? res.data.student : s
            )
          );
          toast.success(
            `Student ${res.data.student.userId.name} updated successfully!`
          );
        }
      } else {
        // CREATE mode
        res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/students`,
          formData,
          { withCredentials: true }
        );

        if (res.data.student) {
          setStudents((prev) => [...prev, res.data.student]);
          toast.success(
            `Student ${res.data.student.userId.name} created successfully!`
          );
        }
      }

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        gender: "",
        year: "",
        major: "",
      });
      setEditingStudent(null);
    } catch (err) {
      console.error(err);
      toast.error(
        editingStudent
          ? "Failed to update student. Please try again."
          : "Failed to create student. Please try again."
      );
    }
  }

  // Open delete modal
  function openDeleteModal(student) {
    setStudentToDelete(student);
    setDeleteModalOpen(true);
  }

  // Close modal
  function closeDeleteModal() {
    setStudentToDelete(null);
    setDeleteModalOpen(false);
  }

  function handleEdit(student) {
    setEditingStudent(student);
    setFormData({
      name: student.userId.name,
      email: student.userId.email,
      password: student.userId.password || "",
      gender: student.userId.gender || "",
      year: student.year || "",
      major: student.major || "",
    });

    // Scroll to form if needed
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Handle confirm delete
  async function confirmDelete() {
    if (!studentToDelete) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/students/${studentToDelete._id}`,
        { withCredentials: true }
      );

      // Remove from UI
      setStudents((prev) => prev.filter((s) => s._id !== studentToDelete._id));
      closeDeleteModal();
      toast.success(
        `Student ${studentToDelete.userId.name} deleted successfully!`
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete student. Please try again.");
    }
  }

  function resetForm() {
    setFormData({
      name: "",
      email: "",
      password: "",
      gender: "",
      year: "",
      major: "",
    });
  }

  function cancelEdit() {
    resetForm();
    setEditingStudent(null);
  }

  return (
    <section className="h-full flex gap-8 flex-col items-center">
      <h1 className="font-bold text-2xl text-center">
        Manage University Students
      </h1>
      {/* Manage students form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl w-full space-y-6 p-6 border rounded-xl shadow-xs"
      >
        <FieldGroup>
          <FieldSet className="grid md:grid-cols-2 gap-4">
            <FieldGroup className="space-y-4">
              {/* name field */}
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Student Name"
                />
              </Field>
              {/* gender field */}
              <Field>
                <FieldLabel htmlFor="gender">Gender</FieldLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onValueChange={(val) =>
                    setFormData((prev) => ({ ...prev, gender: val }))
                  }
                >
                  <SelectTrigger id="gender" required>
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>
            <FieldGroup className="space-y-4">
              {/* email field */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="student@example.com"
                />
              </Field>
              {/* password field */}
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                  placeholder="********"
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />
          <FieldSet>
            {/* year field */}
            <FieldGroup className="grid md:grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="year">Year</FieldLabel>
                <Select
                  name="year"
                  value={formData.year}
                  onValueChange={(val) =>
                    setFormData((prev) => ({ ...prev, year: val }))
                  }
                >
                  <SelectTrigger id="year">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              {/* major field */}
              <Field>
                <FieldLabel htmlFor="major">Major</FieldLabel>
                <Select
                  name="major"
                  value={formData.major}
                  onValueChange={(val) =>
                    setFormData((prev) => ({ ...prev, major: val }))
                  }
                >
                  <SelectTrigger id="major">
                    <SelectValue placeholder="Major" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Software Engineering">
                      Software Engineering
                    </SelectItem>
                    <SelectItem value="Computer Networks">
                      Computer Networks
                    </SelectItem>
                    <SelectItem value="Artificial Intelligence">
                      Artificial Intelligence
                    </SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal" className="flex justify-center gap-4">
            {editingStudent ? (
              <>
                <Button type="submit">Update Student</Button>
                <Button type="button" variant="secondary" onClick={cancelEdit}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button type="submit" disabled={!isFormValid}>
                  Add Student
                </Button>
                <Button type="button" variant="secondary" onClick={resetForm}>
                  Reset
                </Button>
              </>
            )}
          </Field>
        </FieldGroup>
      </form>

      {/* All students table */}
      {loading ? (
        <p className="text-center mt-4 text-gray-500">Loading students...</p>
      ) : students.length === 0 ? (
        <p className="text-center mt-4 text-gray-500">No students found yet.</p>
      ) : (
        <Table className="max-w-3xl mx-auto">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Major</TableHead>
              <TableHead className="text-center">Edit</TableHead>
              <TableHead className="text-center">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student._id}>
                <TableCell className="font-medium">
                  {student.userId.name}
                </TableCell>
                <TableCell>{student.userId.email}</TableCell>
                <TableCell>{student.userId.gender}</TableCell>
                <TableCell>{student.year}</TableCell>
                <TableCell>{student.major}</TableCell>

                {/* Edit button */}
                <TableCell className="text-center">
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-md hover:bg-yellow-500 hover:text-white"
                    onClick={() => handleEdit(student)}
                  >
                    <Pencil className="w-4 h-4" />{" "}
                  </Button>
                </TableCell>

                {/* Delete button */}
                <TableCell className="text-center">
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-md hover:bg-red-500 hover:text-white"
                    onClick={() => openDeleteModal(student)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Confirm Delete"
        className="bg-white p-6 max-w-md mx-auto mt-40 rounded-xl shadow-lg outline-none"
        overlayClassName="fixed inset-0 bg-black/50 z-40"
      >
        <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
        <p className="mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{studentToDelete?.userId.name}</span>?
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
