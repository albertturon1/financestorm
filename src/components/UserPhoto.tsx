import Image from 'next/image';

const UserPhoto = ({ photo, alt }: { photo: string; alt: string }) => (
  <Image
    src={photo}
    alt={alt}
    width={40}
    height={40}
    className="rounded-full"
    priority
  />
);

export default UserPhoto;
