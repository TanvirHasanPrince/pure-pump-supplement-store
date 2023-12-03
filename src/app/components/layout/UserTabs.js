import Link from 'next/link';


const UserTabs = ({ isAdmin }) => {
  return (
    <div className="flex justify-center  gap-2 tabs mb-5">
      <Link className="active" href={"/profile"}>
        Profile
      </Link>
      {isAdmin && (
        <>
          <Link href={"/categories"}>Categories</Link>
          <Link href={"/supplements"}>Supplements</Link>
          <Link href={"/accessories"}>Accessories</Link>
          <Link href={"/users"}>Users</Link>
        </>
      )}
    </div>
  );
};

export default UserTabs;