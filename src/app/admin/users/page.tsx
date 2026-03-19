"use client";

import { Role, User } from "@prisma/client";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { toast } from "@/components/ui/Toast";
import UserTable from "@/components/admin/UserTable";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [editing, setEditing] = useState<User | null>(null);
  const [role, setRole] = useState<Role>(Role.USER);
  const [country, setCountry] = useState("");
  const [company, setCompany] = useState("");

  const load = async () => {
    const res = await fetch("/api/users?limit=100");
    const json = (await res.json()) as { success: boolean; data?: { items: User[] }; error?: string };
    if (!json.success || !json.data) {
      toast(json.error ?? "Failed to load users");
      return;
    }
    setUsers(json.data.items);
  };

  useEffect(() => {
    void load();
  }, []);

  const save = async () => {
    if (!editing) return;
    const res = await fetch(`/api/users/${editing.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, country, companyName: company }),
    });
    const json = (await res.json()) as { success: boolean; error?: string };
    if (!json.success) {
      toast(json.error ?? "Failed to save");
      return;
    }
    toast("User updated");
    setEditing(null);
    void load();
  };

  const remove = async (user: User) => {
    if (!confirm(`Delete ${user.email}?`)) return;
    const res = await fetch(`/api/users/${user.id}`, { method: "DELETE" });
    const json = (await res.json()) as { success: boolean; error?: string };
    if (!json.success) {
      toast(json.error ?? "Failed to delete");
      return;
    }
    toast("User deleted");
    void load();
  };

  return (
    <div className="space-y-4">
      <h1 className="font-heading text-4xl">Users</h1>
      <UserTable
        users={users}
        onEdit={(user) => {
          setEditing(user);
          setRole(user.role);
          setCountry(user.country ?? "");
          setCompany(user.companyName ?? "");
        }}
        onDelete={remove}
      />
      <Modal isOpen={Boolean(editing)} onClose={() => setEditing(null)} title="Edit User">
        <div className="space-y-3">
          <p className="text-sm text-zinc-300">{editing?.email}</p>
          <label className="block text-sm">
            Role
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="mt-1 w-full rounded-md border border-white/20 bg-dark-elevated px-3 py-2"
            >
              <option value={Role.USER}>USER</option>
              <option value={Role.ADMIN}>ADMIN</option>
            </select>
          </label>
          <label className="block text-sm">
            Country
            <Input value={country} onChange={(e) => setCountry(e.target.value)} />
          </label>
          <label className="block text-sm">
            Company
            <Input value={company} onChange={(e) => setCompany(e.target.value)} />
          </label>
          <Button onClick={save}>Save</Button>
        </div>
      </Modal>
    </div>
  );
}

