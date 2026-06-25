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
  Home,
  Bell,
  User,
  Heart,
  Repeat2,
  Bookmark,
  Share,
  Settings,
  Search,
  Image,
  MoreHorizontal,
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
      <section className="relative overflow-hidden lg:h-screen lg:min-h-[750px] flex items-center pt-24 pb-16 lg:py-0">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        </div>
        <div className="mx-auto w-full max-w-none px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
            
            {/* Content Column (Left Side) */}
            <div className="lg:col-span-5 flex flex-col items-start text-left">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-muted-foreground">Now in public beta</span>
              </div>
              <h1 className="text-pretty text-4xl font-bold tracking-tight sm:text-5xl lg:text-5xl xl:text-6xl">
                Connect with the world like never before
              </h1>
              <p className="mt-6 text-pretty text-base sm:text-lg text-muted-foreground">
                Synapse is the next-generation social platform where ideas flourish, communities thrive, and meaningful connections happen every day.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4 w-full sm:w-auto">
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
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
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

            {/* Hero Image/Preview Column (Right Side) */}
            <div className="lg:col-span-7 w-full">
              <div className="relative mx-auto w-full max-w-none lg:scale-90 xl:scale-95 lg:origin-right transition-all duration-300">
                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-primary/10">
                  <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <div className="h-3 w-3 rounded-full bg-green-500/80" />
                    <span className="ml-4 text-xs text-muted-foreground">synapse.app/feed</span>
                  </div>
                  <div className="grid grid-cols-12 gap-6 p-6">
                    {/* Sidebar Mockup */}
                    <div className="col-span-3 space-y-6 border-r border-border/60 pr-6 text-left">
                      <div className="flex items-center gap-2.5 px-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary">
                          <Zap className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <span className="font-bold text-base tracking-tight">Synapse</span>
                      </div>
                      <nav className="space-y-1">
                        <div className="flex items-center gap-3 rounded-xl bg-primary/10 px-3 py-2.5 text-sm font-bold text-primary">
                          <Home className="h-4 w-4" />
                          <span>Home</span>
                        </div>
                        <div className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer">
                          <div className="flex items-center gap-3">
                            <Bell className="h-4 w-4" />
                            <span>Notifications</span>
                          </div>
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                            3
                          </span>
                        </div>
                        <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer">
                          <User className="h-4 w-4" />
                          <span>Profile</span>
                        </div>
                        <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer">
                          <Settings className="h-4 w-4" />
                          <span>Settings</span>
                        </div>
                      </nav>
                      
                      <Button className="w-full rounded-xl font-bold py-5 text-sm">
                        New Post
                      </Button>

                      <div className="pt-8 border-t border-border/60 flex items-center gap-3 px-2">
                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xs">
                          AP
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <div className="font-bold text-xs truncate">Abhi Patel</div>
                          <div className="text-[11px] text-muted-foreground truncate">@abhipatel</div>
                        </div>
                      </div>
                    </div>

                    {/* Feed Mockup */}
                    <div className="col-span-9 space-y-4 text-left">
                      {/* Tabs Header */}
                      <div className="border-b border-border/50 pb-2">
                        <span className="relative font-bold text-sm text-foreground pb-2 inline-block">
                          For you
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
                        </span>
                      </div>

                      {/* Compose Box */}
                      <div className="rounded-xl border border-border bg-background p-4 shadow-sm">
                        <div className="flex gap-3">
                          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xs">
                            AP
                          </div>
                          <div className="flex-1">
                            <div className="text-sm text-muted-foreground/60 py-1.5">What's on your mind?</div>
                            <div className="mt-4 flex justify-between items-center border-t border-border/50 pt-3">
                              <div className="flex gap-3 text-muted-foreground">
                                <Image className="h-4 w-4 cursor-pointer hover:text-foreground transition-colors" />
                                <span className="text-xs font-semibold select-none">Media</span>
                              </div>
                              <Button size="sm" className="h-8 text-xs font-bold px-4 rounded-lg">Post</Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Post 1 */}
                      <div className="rounded-xl border border-border bg-background p-4 shadow-sm">
                        <div className="flex gap-3">
                          <div className="h-10 w-10 rounded-full bg-indigo-500/10 flex items-center justify-center font-bold text-indigo-500 text-xs shrink-0">
                            SJ
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-sm text-foreground">Sarah Jenkins</span>
                              <span className="text-xs text-muted-foreground">@sarahj</span>
                              <span className="text-xs text-muted-foreground">·</span>
                              <span className="text-xs text-muted-foreground">2h</span>
                            </div>
                            <p className="mt-2 text-sm text-foreground leading-normal">
                              Just launched the new dark mode design system for Synapse! 🚀 Re-imagined the layout with a sleek glassmorphic feed, tailored color palettes, and smooth animations. What do you all think? Let me know in the comments below!
                            </p>
                            <div className="mt-4 flex justify-between items-center max-w-md text-muted-foreground">
                              <div className="flex items-center gap-1.5 text-xs hover:text-rose-500 transition-colors cursor-pointer">
                                <Heart className="h-4 w-4" />
                                <span>142</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs hover:text-sky-500 transition-colors cursor-pointer">
                                <MessageCircle className="h-4 w-4" />
                                <span>24</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs hover:text-emerald-500 transition-colors cursor-pointer">
                                <Repeat2 className="h-4 w-4" />
                                <span>12</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs hover:text-sky-500 transition-colors cursor-pointer">
                                <Bookmark className="h-4 w-4" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Post 2 */}
                      <div className="rounded-xl border border-border bg-background p-4 shadow-sm">
                        <div className="flex gap-3">
                          <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center font-bold text-emerald-500 text-xs shrink-0">
                            AR
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-sm text-foreground">Alex Rivera</span>
                              <span className="text-xs text-muted-foreground">@alexr</span>
                              <span className="text-xs text-muted-foreground">·</span>
                              <span className="text-xs text-muted-foreground">4h</span>
                            </div>
                            <p className="mt-2 text-sm text-foreground leading-normal">
                              Spent the morning optimizing our Postgres database queries. Performance improved by over 45%! Synapse is now incredibly fast. ⚡️ Next stop: scaling to 1M users.
                            </p>
                            <div className="mt-4 flex justify-between items-center max-w-md text-muted-foreground">
                              <div className="flex items-center gap-1.5 text-xs hover:text-rose-500 transition-colors cursor-pointer">
                                <Heart className="h-4 w-4 text-rose-500 fill-rose-500" />
                                <span className="text-rose-500">87</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs hover:text-sky-500 transition-colors cursor-pointer">
                                <MessageCircle className="h-4 w-4" />
                                <span>8</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs hover:text-emerald-500 transition-colors cursor-pointer">
                                <Repeat2 className="h-4 w-4 text-emerald-500" />
                                <span className="text-emerald-500">3</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs hover:text-sky-500 transition-colors cursor-pointer">
                                <Bookmark className="h-4 w-4 text-sky-500 fill-sky-500" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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
