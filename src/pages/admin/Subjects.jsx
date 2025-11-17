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

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [professorsLoading, setProfessorsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    year: "",
    department: "",
    professorId: "",
  });

  const [editingSubject, setEditingSubject] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState(null);

  // Fetch subjects
  useEffect(() => {
    async function fetchSubjects() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/subjects`,
          { withCredentials: true }
        );
        if (res.data.subjects) {
          setSubjects(res.data.subjects);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchSubjects();
  }, []);

  // Fetch professors when department changes
  useEffect(() => {
    if (!formData.department) {
      setProfessors([]);
      return;
    }

    async function fetchProfessors() {
      setProfessorsLoading(true);
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/professors?department=${encodeURIComponent(formData.department)}`,
          { withCredentials: true }
        );
        if (res.data.professors) {
          setProfessors(res.data.professors);
        }
      } catch (err) {
        console.error(err);
        setProfessors([]);
      } finally {
        setProfessorsLoading(false);
      }
    }

    fetchProfessors();
  }, [formData.department]);

  // Update professorId in form once professors are loaded
  useEffect(() => {
    if (editingSubject && !professorsLoading && professors.length > 0) {
      const profExists = professors.find(
        (p) => p._id === editingSubject.professorId?._id
      );

      setFormData((prev) => ({
        ...prev,
        professorId: profExists ? editingSubject.professorId._id : "",
      }));
    }
  }, [editingSubject, professorsLoading, professors]);

  // Handle input change
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // Validation
  const isFormValid = editingSubject
    ? true
    : formData.name.trim() !== "" &&
      formData.year !== "" &&
      formData.department !== "" &&
      formData.professorId !== "";

  // Handle form submit
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let res;

      if (editingSubject) {
        res = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/subjects/${editingSubject._id}`,
          formData,
          { withCredentials: true }
        );

        if (res.data.subject) {
          setSubjects((prev) =>
            prev.map((s) =>
              s._id === editingSubject._id ? res.data.subject : s
            )
          );
          toast.success(
            `Subject ${res.data.subject.name} updated successfully!`
          );
        }
      } else {
        res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/subjects`,
          formData,
          { withCredentials: true }
        );

        if (res.data.subject) {
          setSubjects((prev) => [...prev, res.data.subject]);
          toast.success(
            `Subject ${res.data.subject.name} created successfully!`
          );
        }
      }

      // Reset form
      setFormData({
        name: "",
        year: "",
        department: "",
        professorId: "",
      });

      setEditingSubject(null);
    } catch (err) {
      console.error(err);
      toast.error(
        editingSubject
          ? "Failed to update subject. Please try again."
          : "Failed to create subject. Please try again."
      );
    }
  }

  // Handle Edit
  function handleEdit(subject) {
    setEditingSubject(subject);

    setFormData({
      name: subject.name,
      year: subject.year,
      department: subject.department,
      professorId: "", // initially empty, will be set after professors are loaded
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Open delete modal
  function openDeleteModal(subject) {
    setSubjectToDelete(subject);
    setDeleteModalOpen(true);
  }

  // Close modal
  function closeDeleteModal() {
    setSubjectToDelete(null);
    setDeleteModalOpen(false);
  }

  // Confirm delete
  async function confirmDelete() {
    if (!subjectToDelete) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/subjects/${subjectToDelete._id}`,
        { withCredentials: true }
      );

      setSubjects((prev) => prev.filter((s) => s._id !== subjectToDelete._id));

      closeDeleteModal();
      toast.success(`Subject ${subjectToDelete.name} deleted successfully!`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete subject. Please try again.");
    }
  }

  // Reset form
  function resetForm() {
    setFormData({
      name: "",
      year: "",
      department: "",
      professorId: "",
    });
  }

  function cancelEdit() {
    resetForm();
    setEditingSubject(null);
  }

  return (
    <section className="h-full flex gap-8 flex-col items-center">
      <h1 className="font-bold text-2xl text-center">Manage Subjects</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl w-full space-y-6 p-6 border rounded-xl shadow-xs"
      >
        <FieldGroup>
          <FieldSet className="grid md:grid-cols-2 gap-4">
            <FieldGroup className="space-y-4">
              {/* subject name */}
              <Field>
                <FieldLabel htmlFor="name">Subject Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Subject Name"
                />
              </Field>

              {/* year */}
              <Field>
                <FieldLabel htmlFor="year">Year</FieldLabel>
                <Select
                  name="year"
                  value={formData.year}
                  onValueChange={(v) =>
                    setFormData((prev) => ({ ...prev, year: v }))
                  }
                >
                  <SelectTrigger id="year">
                    <SelectValue placeholder="Select Year" />
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
            </FieldGroup>

            <FieldGroup className="space-y-4">
              {/* department */}
              <Field>
                <FieldLabel htmlFor="department">Department</FieldLabel>
                <Select
                  name="department"
                  value={formData.department}
                  onValueChange={(v) =>
                    setFormData((prev) => ({
                      ...prev,
                      department: v,
                      professorId: "",
                    }))
                  }
                >
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Software Engineering">
                      Software Engineering
                    </SelectItem>
                    <SelectItem value="Computer Science">
                      Computer Science
                    </SelectItem>
                    <SelectItem value="Information Systems">
                      Information Systems
                    </SelectItem>
                    <SelectItem value="Artificial Intelligence">
                      Artificial Intelligence
                    </SelectItem>
                    <SelectItem value="Mathematical Science">
                      Mathematical Science
                    </SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              {/* professor select */}
              <Field>
                <FieldLabel htmlFor="professor">Professor</FieldLabel>
                <Select
                  name="professorId"
                  value={formData.professorId}
                  onValueChange={(v) =>
                    setFormData((prev) => ({ ...prev, professorId: v }))
                  }
                  disabled={!formData.department || professorsLoading}
                >
                  <SelectTrigger id="professor">
                    <SelectValue placeholder="Select Professor" />
                  </SelectTrigger>
                  <SelectContent>
                    {professorsLoading ? (
                      <SelectItem disabled value="loading">
                        Loading professors...
                      </SelectItem>
                    ) : professors.length === 0 ? (
                      <SelectItem disabled value="no-professor">
                        No professors in this department
                      </SelectItem>
                    ) : (
                      professors.map((prof) => (
                        <SelectItem key={prof._id} value={prof._id}>
                          {prof.userId.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>
          </FieldSet>

          <Field orientation="horizontal" className="flex justify-center gap-4">
            {editingSubject ? (
              <>
                <Button type="submit">Update Subject</Button>
                <Button type="button" variant="secondary" onClick={cancelEdit}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button type="submit" disabled={!isFormValid}>
                  Add Subject
                </Button>
                <Button type="button" variant="secondary" onClick={resetForm}>
                  Reset
                </Button>
              </>
            )}
          </Field>
        </FieldGroup>
      </form>

      {/* Table */}
      <Table className="max-w-3xl mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Professor</TableHead>
            <TableHead className="text-center">Edit</TableHead>
            <TableHead className="text-center">Delete</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {subjects.map((subject) => (
            <TableRow key={subject._id}>
              <TableCell className="font-medium">{subject.name}</TableCell>
              <TableCell>{subject.year}</TableCell>
              <TableCell>{subject.department}</TableCell>
              <TableCell>
                {subject.professorId ? subject.professorId.userId?.name : "—"}
              </TableCell>

              <TableCell className="text-center">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleEdit(subject)}
                  className="rounded-md hover:bg-yellow-500 hover:text-white"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
              </TableCell>

              <TableCell className="text-center">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => openDeleteModal(subject)}
                  className="rounded-md hover:bg-red-500 hover:text-white"
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Delete modal */}
      <Modal
        isOpen={deleteModalOpen}
        onRequestClose={closeDeleteModal}
        className="bg-white p-6 max-w-md mx-auto mt-40 rounded-xl shadow-lg outline-none"
        overlayClassName="fixed inset-0 bg-black/50 z-40"
      >
        <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
        <p className="mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{subjectToDelete?.name}</span>?
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
