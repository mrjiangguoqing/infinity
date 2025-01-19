'use client';
import { useSession } from "next-auth/react";


export default function App() {
  //const { data: session, status } = useSession();
  //if (status === "loading")
  return (
    <div>
    </div>
  );
  if (!session) {
    return <div>You need to be logged in to view this page</div>;
  }
}

// <Topbar/>
// <Sidebar/>


