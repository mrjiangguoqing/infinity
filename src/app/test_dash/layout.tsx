'use client';
import Layout from "../components/dashLayout/Layout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}