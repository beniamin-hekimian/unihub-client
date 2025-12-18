import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserAvatar({ gender, className }) {
  // select image based on gender
  const imageSrc =
    gender === "male" ? "/male.png" : gender === "female" ? "/female.png" : null;

  return (
    <Avatar className={className}>
      {imageSrc && <AvatarImage src={imageSrc} alt="User avatar" />}

      <AvatarFallback className="bg-muted text-muted-foreground">
        <User />
      </AvatarFallback>
    </Avatar>
  );
}
