import profilePic from "./assets/jeffrey_ghinn_profile_picture.jpg";

export default function ProfilePic() {
    return (
        <img 
        src={profilePic} 
        alt="Profile Picture of Jeffrey Ghinn" 
        className="profile-pic"
        />
    )
}