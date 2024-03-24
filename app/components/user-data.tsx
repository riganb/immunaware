"use client";

const UserData = ({ name, email }: { name: string; email: string }) => {
  return (
    <div>
      <div>{name}</div>
      <div>{email}</div>
    </div>
  );
};

export default UserData;
