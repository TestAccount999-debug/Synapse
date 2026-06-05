"use client"

import { useEffect, useState } from "react";
import { Sidebar } from "@/components/social/sidebar";
import { Card } from "@/components/ui/card";
import { Shield, AlertTriangle, MessageSquare, Trash2, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [reports, setReports] = useState<any[]>([]);
  const [feedbackList, setFeedbackList] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"reports" | "feedback">("reports");
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/user/me")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((data) => {
        if (data.role !== "admin") {
          router.push("/feed"); 
        } else {
          setIsAdmin(true);
          fetchDashboardData();
        }
      })
      .catch(() => router.push("/login"));
  }, []);

  const fetchDashboardData = () => {
    setLoading(true);
    Promise.all([
      fetch("/api/reports").then((res) => res.json()),
      fetch("/api/feedback").then((res) => res.json())
    ]).then(([reportsData, feedbackData]) => {
      setReports(Array.isArray(reportsData) ? reportsData : []);
      setFeedbackList(Array.isArray(feedbackData) ? feedbackData : []);
      setLoading(false);
    });
  };

  const handleReportAction = async (reportId: number, action: "deletePost" | "dismiss", postId?: number) => {
    try {
      const url = `/api/reports?id=${reportId}&action=${action}${postId ? `&postId=${postId}` : ''}`;
      const res = await fetch(url, { method: "DELETE" });
      if (res.ok) {
        fetchDashboardData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!isAdmin) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Shield className="h-10 w-10 animate-pulse text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 ml-20 lg:ml-64 justify-center">
        <main className="flex-1 border-r border-border/50 min-h-screen w-full max-w-none p-6">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight">Admin Moderation Portal</h1>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="p-4 flex items-center justify-between border-border bg-card">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Reported Posts</p>
                <h3 className="text-2xl font-bold mt-1">{reports.length}</h3>
              </div>
              <AlertTriangle className="h-8 w-8 text-amber-500 opacity-80" />
            </Card>
            <Card className="p-4 flex items-center justify-between border-border bg-card">
              <div>
                <p className="text-sm font-medium text-muted-foreground">User Feedbacks</p>
                <h3 className="text-2xl font-bold mt-1">{feedbackList.length}</h3>
              </div>
              <MessageSquare className="h-8 w-8 text-sky-500 opacity-80" />
            </Card>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 border-b border-border/50 mb-6">
            <button
              onClick={() => setActiveTab("reports")}
              className={`pb-3 text-sm font-semibold border-b-2 transition-all ${activeTab === "reports" ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`}
            >
              Reports Dashboard
            </button>
            <button
              onClick={() => setActiveTab("feedback")}
              className={`pb-3 text-sm font-semibold border-b-2 transition-all ${activeTab === "feedback" ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`}
            >
              Feedbacks & Issues
            </button>
          </div>

          {loading ? (
            <div className="py-20 text-center text-muted-foreground animate-pulse">Loading dashboard...</div>
          ) : activeTab === "reports" ? (
            <div className="space-y-4">
              {reports.map((report) => (
                <Card key={report.id} className="p-4 border-border bg-card space-y-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border/50 pb-2">
                    <span>Reported by: <strong>@{report.reporter?.name}</strong></span>
                    <span>Reason: <strong className="text-amber-500">{report.reason}</strong></span>
                  </div>
                  
                  {report.post ? (
                    <div className="bg-secondary/10 p-3 rounded-lg border border-border/50">
                      <p className="text-xs font-semibold text-muted-foreground mb-1">Post Author: @{report.post.author?.name}</p>
                      <p className="text-sm">{report.post.content}</p>
                    </div>
                  ) : (
                    <p className="text-sm italic text-muted-foreground">This post was already deleted.</p>
                  )}

                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => handleReportAction(report.id, "dismiss")}
                      className="flex items-center gap-1.5 text-xs py-1.5 px-3 rounded-lg border border-border hover:bg-secondary transition"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Dismiss
                    </button>
                    {report.post && (
                      <button
                        onClick={() => handleReportAction(report.id, "deletePost", report.post.id)}
                        className="flex items-center gap-1.5 text-xs py-1.5 px-3 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 transition"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete Post
                      </button>
                    )}
                  </div>
                </Card>
              ))}
              {reports.length === 0 && <div className="py-12 text-center text-muted-foreground italic">No reported posts.</div>}
            </div>
          ) : (
            <div className="space-y-4">
              {feedbackList.map((feedback) => (
                <Card key={feedback.id} className="p-4 border-border bg-card space-y-2">
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>From: <strong>{feedback.email}</strong></span>
                    <span>{new Date(feedback.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-foreground leading-normal">{feedback.content}</p>
                </Card>
              ))}
              {feedbackList.length === 0 && <div className="py-12 text-center text-muted-foreground italic">No feedbacks received yet.</div>}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
