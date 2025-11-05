// src/components/Loading.jsx
import { BeatLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/90 z-50">
      <BeatLoader color="var(--primary)" size={15} margin={5} />
    </div>
  );
}
