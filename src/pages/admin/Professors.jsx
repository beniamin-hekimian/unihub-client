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

export default function Professors() {
  const [professors, setProfessors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    department: "",
  });
  const [editingProfessor, setEditingProfessor] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [professorToDelete, setProfessorToDelete] = useState(null);

  // Fetch all professors
  useEffect(() => {
    async function fetchProfessors() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/professors`,
          { withCredentials: true }
        );
        if (res.data.professors) {
          setProfessors(res.data.professors);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchProfessors();
  }, []);

  // Handle form change
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // Check if form is valid
  const isFormValid = editingProfessor
    ? true
    : formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.password.trim() !== "" &&
      formData.gender !== "" &&
      formData.phone.trim() !== "" &&
      formData.department !== "";

  // Handle form submit
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let res;

      if (editingProfessor) {
        // UPDATE mode
        res = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/professors/${
            editingProfessor._id
          }`,
          formData,
          { withCredentials: true }
        );

        if (res.data.professor) {
          // Update the student in UI
          setProfessors((prev) =>
            prev.map((p) =>
              p._id === editingProfessor._id ? res.data.professor : p
            )
          );
          toast.success(
            `Professor ${res.data.professor.userId.name} updated successfully!`
          );
        }
      } else {
        // CREATE mode
        res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/professors`,
          formData,
          { withCredentials: true }
        );

        if (res.data.professor) {
          setProfessors((prev) => [...prev, res.data.professor]);
          toast.success(
            `Professor ${res.data.professor.userId.name} created successfully!`
          );
        }
      }

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        gender: "",
        phone: "",
        department: "",
      });

      setEditingProfessor(null);
    } catch (err) {
      console.error(err);
      toast.error(
        editingProfessor
          ? "Failed to update professor. Please try again."
          : "Failed to create professor. Please try again."
      );
    }
  }

  // Open delete modal
  function openDeleteModal(prof) {
    setProfessorToDelete(prof);
    setDeleteModalOpen(true);
  }

  // Close modal
  function closeDeleteModal() {
    setProfessorToDelete(null);
    setDeleteModalOpen(false);
  }

  function handleEdit(professor) {
    setEditingProfessor(professor);
    setFormData({
      name: professor.userId.name,
      email: professor.userId.email,
      password: professor.userId.password || "",
      gender: professor.userId.gender || "",
      phone: professor.phone || "",
      department: professor.department || "",
    });

    // Scroll to form if needed
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Handle confirm delete
  async function confirmDelete() {
    if (!professorToDelete) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/professors/${
          professorToDelete._id
        }`,
        { withCredentials: true }
      );

      // Remove from UI
      setProfessors((prev) =>
        prev.filter((p) => p._id !== professorToDelete._id)
      );

      closeDeleteModal();
      toast.success(
        `Professor ${professorToDelete.userId.name} deleted successfully!`
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete professor. Please try again.");
    }
  }

  function resetForm() {
    setFormData({
      name: "",
      email: "",
      password: "",
      gender: "",
      phone: "",
      department: "",
    });
  }

  function cancelEdit() {
    resetForm();
    setEditingProfessor(null);
  }

  return (
    <section className="h-full flex gap-8 flex-col items-center">
      <h1 className="font-bold text-2xl text-center">
        Manage University Professors
      </h1>

      {/* Manage professors form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl w-full space-y-6 p-6 border rounded-xl shadow-xs"
      >
        <FieldGroup>
          <FieldSet className="grid md:grid-cols-2 gap-4">
            <FieldGroup className="space-y-4">
              {/* name */}
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Professor Name"
                />
              </Field>

              {/* gender */}
              <Field>
                <FieldLabel htmlFor="gender">Gender</FieldLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onValueChange={(val) =>
                    setFormData((prev) => ({ ...prev, gender: val }))
                  }
                >
                  <SelectTrigger id="gender">
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
              {/* email */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="professor@example.com"
                />
              </Field>

              {/* password */}
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
            <FieldGroup className="grid md:grid-cols-2 gap-4">
              {/* phone */}
              <Field>
                <FieldLabel htmlFor="phone">Phone</FieldLabel>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel"
                  placeholder="123-456-7890"
                />
              </Field>

              {/* department */}
              <Field>
                <FieldLabel htmlFor="department">Department</FieldLabel>
                <Select
                  name="department"
                  value={formData.department}
                  onValueChange={(val) =>
                    setFormData((prev) => ({ ...prev, department: val }))
                  }
                >
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Department" />
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
                      Mathematical Sciences
                    </SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>
          </FieldSet>

          <Field orientation="horizontal" className="flex justify-center gap-4">
            {editingProfessor ? (
              <>
                <Button type="submit">Update Professor</Button>
                <Button type="button" variant="secondary" onClick={cancelEdit}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button type="submit" disabled={!isFormValid}>
                  Add Professor
                </Button>
                <Button type="button" variant="secondary" onClick={resetForm}>
                  Reset
                </Button>
              </>
            )}
          </Field>
        </FieldGroup>
      </form>

      {/* Professors table */}
      <Table className="max-w-3xl mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Department</TableHead>
            <TableHead className="text-center">Edit</TableHead>
            <TableHead className="text-center">Delete</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {professors.map((professor) => (
            <TableRow key={professor._id}>
              <TableCell className="font-medium">
                {professor.userId.name}
              </TableCell>
              <TableCell>{professor.userId.email}</TableCell>
              <TableCell>{professor.userId.gender}</TableCell>
              <TableCell>{professor.phone}</TableCell>
              <TableCell>{professor.department}</TableCell>

              {/* Edit button */}
              <TableCell className="text-center">
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-md hover:bg-yellow-500 hover:text-white"
                  onClick={() => handleEdit(professor)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
              </TableCell>

              {/* Delete button */}
              <TableCell className="text-center">
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-md hover:bg-red-500 hover:text-white"
                  onClick={() => openDeleteModal(professor)}
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
        contentLabel="Confirm Delete"
        className="bg-white p-6 max-w-md mx-auto mt-40 rounded-xl shadow-lg outline-none"
        overlayClassName="fixed inset-0 bg-black/50 z-40"
      >
        <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
        <p className="mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold">
            {professorToDelete?.userId.name}
          </span>
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
