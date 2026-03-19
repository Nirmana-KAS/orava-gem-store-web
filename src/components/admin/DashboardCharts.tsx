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
      <Card className="h-80">
        <h3 className="mb-3 text-sm font-semibold">Daily Website Visitors</h3>
        <ResponsiveContainer width="100%" height="90%">
          <LineChart data={props.visitors}>
            <CartesianGrid stroke="#222" />
            <XAxis dataKey="date" tick={{ fill: "#aaa", fontSize: 12 }} />
            <YAxis tick={{ fill: "#aaa", fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#C9A84C" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
      <Card className="h-80">
        <h3 className="mb-3 text-sm font-semibold">Country-wise Users</h3>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={props.countries} layout="vertical">
            <CartesianGrid stroke="#222" />
            <XAxis type="number" tick={{ fill: "#aaa", fontSize: 12 }} />
            <YAxis dataKey="country" type="category" tick={{ fill: "#aaa", fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="count" fill="#C9A84C" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Card className="h-80">
        <h3 className="mb-3 text-sm font-semibold">Inquiries by Type</h3>
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie data={props.inquiriesByType} dataKey="value" nameKey="name" fill="#C9A84C" outerRadius={90} />
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Card>
      <Card className="h-80">
        <h3 className="mb-3 text-sm font-semibold">Meetings by Status</h3>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={props.meetingsByStatus}>
            <CartesianGrid stroke="#222" />
            <XAxis dataKey="name" tick={{ fill: "#aaa", fontSize: 12 }} />
            <YAxis tick={{ fill: "#aaa", fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="value" fill="#C9A84C" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Card className="h-80 lg:col-span-2">
        <h3 className="mb-3 text-sm font-semibold">Monthly Inquiry Trend</h3>
        <ResponsiveContainer width="100%" height="90%">
          <AreaChart data={props.monthlyInquiries}>
            <CartesianGrid stroke="#222" />
            <XAxis dataKey="month" tick={{ fill: "#aaa", fontSize: 12 }} />
            <YAxis tick={{ fill: "#aaa", fontSize: 12 }} />
            <Tooltip />
            <Area type="monotone" dataKey="count" fill="#C9A84C44" stroke="#C9A84C" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

