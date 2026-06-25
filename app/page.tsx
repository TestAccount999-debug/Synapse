import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  MessageCircle,
  Users,
  Zap,
  Shield,
  Globe,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-none items-center justify-between px-6 sm:px-10 lg:px-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Synapse</span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <Link href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Features
            </Link>
            <Link href="#testimonials" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        </div>
        <div className="mx-auto w-full max-w-none px-6 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-none text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-muted-foreground">Now in public beta</span>
            </div>
            <h1 className="text-pretty text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Connect with the world like never before
            </h1>
            <p className="mt-6 text-pretty text-lg text-muted-foreground sm:text-xl">
              Synapse is the next-generation social platform where ideas flourish, communities thrive, and meaningful connections happen every day.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild className="w-full sm:w-auto">
                <Link href="/signup">
                  Start for free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
                <Link href="#features">Learn more</Link>
              </Button>
            </div>
            <div className="mt-10 flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Free to use</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>No ads</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Privacy first</span>
              </div>
            </div>
          </div>

          {/* Hero Image/Preview */}
          <div className="relative mx-auto mt-16 w-full max-w-none">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-primary/10">
              <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
                <span className="ml-4 text-xs text-muted-foreground">synapse.app/feed</span>
              </div>
              <div className="grid grid-cols-12 gap-4 p-4">
                <div className="col-span-3 space-y-3">
                  <div className="h-8 rounded-lg bg-muted" />
                  <div className="h-6 w-3/4 rounded bg-muted" />
                  <div className="h-6 w-1/2 rounded bg-muted" />
                  <div className="h-6 w-2/3 rounded bg-muted" />
                </div>
                <div className="col-span-6 space-y-4">
                  <div className="rounded-xl border border-border bg-background p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/20" />
                      <div className="space-y-1">
                        <div className="h-4 w-24 rounded bg-muted" />
                        <div className="h-3 w-16 rounded bg-muted" />
                      </div>
                    </div>
                    <div className="mt-4 h-32 rounded-lg bg-muted" />
                    <div className="mt-4 flex gap-4">
                      <div className="h-6 w-12 rounded bg-muted" />
                      <div className="h-6 w-12 rounded bg-muted" />
                      <div className="h-6 w-12 rounded bg-muted" />
                    </div>
                  </div>
                  <div className="rounded-xl border border-border bg-background p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-accent/20" />
                      <div className="space-y-1">
                        <div className="h-4 w-20 rounded bg-muted" />
                        <div className="h-3 w-14 rounded bg-muted" />
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="h-4 w-full rounded bg-muted" />
                      <div className="h-4 w-3/4 rounded bg-muted" />
                    </div>
                  </div>
                </div>
                <div className="col-span-3 space-y-3">
                  <div className="h-8 rounded-lg bg-muted" />
                  <div className="rounded-lg border border-border p-3">
                    <div className="h-4 w-20 rounded bg-muted" />
                    <div className="mt-2 space-y-2">
                      <div className="h-3 w-full rounded bg-muted" />
                      <div className="h-3 w-2/3 rounded bg-muted" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-t border-border bg-card/50 py-20 lg:py-32">
        <div className="mx-auto w-full max-w-none px-6 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-none text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to connect</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Built for the modern social experience with features that matter
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: MessageCircle,
                title: "Real-time Messaging",
                description: "Instant messaging with end-to-end encryption. Stay connected with friends and groups seamlessly.",
              },
              {
                icon: Users,
                title: "Communities",
                description: "Join or create communities around your interests. Find your tribe and engage in meaningful discussions.",
              },
              {
                icon: TrendingUp,
                title: "Smart Feed",
                description: "AI-powered feed that learns your preferences. See content that matters to you, not just what's popular.",
              },
              {
                icon: Shield,
                title: "Privacy Controls",
                description: "Granular privacy settings give you complete control over who sees your content and data.",
              },
              {
                icon: Globe,
                title: "Global Reach",
                description: "Connect with people worldwide. Real-time translation breaks down language barriers.",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Built on cutting-edge technology for instant load times and smooth interactions.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-border bg-background p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-t border-border py-20">
        <div className="mx-auto w-full max-w-none px-6 sm:px-10 lg:px-16">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "2M+", label: "Active Users" },
              { value: "150+", label: "Countries" },
              { value: "50M+", label: "Posts Daily" },
              { value: "99.9%", label: "Uptime" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-primary">{stat.value}</div>
                <div className="mt-2 text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="border-t border-border bg-card/50 py-20 lg:py-32">
        <div className="mx-auto w-full max-w-none px-6 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-none text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Loved by millions</h2>
            <p className="mt-4 text-lg text-muted-foreground">See what our community has to say</p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote: "Synapse has completely changed how I connect with people. The communities feature is incredible!",
                author: "Sarah Chen",
                role: "Designer",
                avatar: "SC",
              },
              {
                quote: "Finally a social platform that respects privacy. I feel safe sharing here.",
                author: "Marcus Johnson",
                role: "Developer",
                avatar: "MJ",
              },
              {
                quote: "The smart feed actually shows me what I want to see. No more doomscrolling!",
                author: "Emily Rodriguez",
                role: "Content Creator",
                avatar: "ER",
              },
            ].map((testimonial) => (
              <div key={testimonial.author} className="rounded-2xl border border-border bg-background p-6">
                <p className="text-muted-foreground">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sm font-medium text-primary">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-medium">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border py-20 lg:py-32">
        <div className="mx-auto w-full max-w-none px-6 sm:px-10 lg:px-16">
          <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center sm:px-16">
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-black/10 blur-3xl" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              Ready to join the conversation?
            </h2>
            <p className="mx-auto mt-4 w-full max-w-none text-lg text-primary-foreground/80">
              Sign up today and become part of a growing community of millions.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/signup">
                  Create your account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-12">
        <div className="mx-auto w-full max-w-none px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Zap className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">Synapse</span>
            </div>
            <div className="flex gap-8 text-sm text-muted-foreground">
              <Link href="#" className="transition-colors hover:text-foreground">About</Link>
              <Link href="#" className="transition-colors hover:text-foreground">Privacy</Link>
              <Link href="#" className="transition-colors hover:text-foreground">Terms</Link>
              <Link href="#" className="transition-colors hover:text-foreground">Contact</Link>
            </div>
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Synapse. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
