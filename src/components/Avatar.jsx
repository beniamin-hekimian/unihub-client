import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// local avatar images
import maleAvatar from "@/assets/images/male.png";
import femaleAvatar from "@/assets/images/female.png";

export default function UserAvatar({ gender, className }) {
  // select image based on gender
  const imageSrc =
    gender === "male" ? maleAvatar : gender === "female" ? femaleAvatar : null;

  return (
    <Avatar className={className}>
      {imageSrc && <AvatarImage src={imageSrc} alt="User avatar" />}

      <AvatarFallback className="bg-muted text-muted-foreground">
        <User />
      </AvatarFallback>
    </Avatar>
  );
}
