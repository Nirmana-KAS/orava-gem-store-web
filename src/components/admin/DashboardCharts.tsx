"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Card from "@/components/ui/Card";

interface DashboardChartsProps {
  visitors: { date: string; count: number }[];
  countries: { country: string; count: number }[];
  inquiriesByType: { name: string; value: number }[];
  meetingsByStatus: { name: string; value: number }[];
  monthlyInquiries: { month: string; count: number }[];
}

export default function DashboardCharts(props: DashboardChartsProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="h-80 border-[#1e2535] bg-[#161b27] text-[#e2e8f0]">
        <h3 className="mb-3 text-sm font-semibold">Daily Website Visitors</h3>
        <ResponsiveContainer width="100%" height="90%">
          <LineChart data={props.visitors}>
            <CartesianGrid stroke="#243145" />
            <XAxis dataKey="date" tick={{ fill: "#94a3b8", fontSize: 12 }} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#3c74ae"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
      <Card className="h-80 border-[#1e2535] bg-[#161b27] text-[#e2e8f0]">
        <h3 className="mb-3 text-sm font-semibold">Country-wise Users</h3>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={props.countries} layout="vertical">
            <CartesianGrid stroke="#243145" />
            <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 12 }} />
            <YAxis
              dataKey="country"
              type="category"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
            />
            <Tooltip />
            <Bar dataKey="count" fill="#3c74ae" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Card className="h-80 border-[#1e2535] bg-[#161b27] text-[#e2e8f0]">
        <h3 className="mb-3 text-sm font-semibold">Inquiries by Type</h3>
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie
              data={props.inquiriesByType}
              dataKey="value"
              nameKey="name"
              fill="#3c74ae"
              outerRadius={90}
            />
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Card>
      <Card className="h-80 border-[#1e2535] bg-[#161b27] text-[#e2e8f0]">
        <h3 className="mb-3 text-sm font-semibold">Meetings by Status</h3>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={props.meetingsByStatus}>
            <CartesianGrid stroke="#243145" />
            <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 12 }} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="value" fill="#8f8b8f" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Card className="h-80 border-[#1e2535] bg-[#161b27] text-[#e2e8f0] lg:col-span-2">
        <h3 className="mb-3 text-sm font-semibold">Monthly Inquiry Trend</h3>
        <ResponsiveContainer width="100%" height="90%">
          <AreaChart data={props.monthlyInquiries}>
            <CartesianGrid stroke="#243145" />
            <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 12 }} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="count"
              fill="#3c74ae44"
              stroke="#3c74ae"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
