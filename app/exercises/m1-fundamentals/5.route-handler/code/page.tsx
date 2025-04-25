"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function RoutePage() {
  interface User {
    id: number;
    name: string;
  }

  const [users, setUsers] = useState<User[] | null>(null);
  const [newUserName, setNewUserName] = useState("");

  const pathname = usePathname();

  useEffect(() => {
    fetch(pathname + "/api")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  if (!users) return <div>Loading...</div>;

  const addUser = () => {
    //
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <div className="flex flex-row gap-3 items-center ">
                  <Button className="h-4">X</Button>
                  <div>{user.name}</div>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <div className="flex flex-row gap-3">
        <Input
          onChange={(e) => setNewUserName(e.target.value)}
          placeholder="Add new user"
        />
        {/* <Button onClick={addUser}>Add new User</Button> */}
      </div>
    </>
  );
}
