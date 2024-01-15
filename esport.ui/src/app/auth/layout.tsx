interface LayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <main className="flex bg-theme-main h-full min-h-screen bg-gradient-to-r from-bg-main-from to-bg-main-to">
      <div className="w-8/12" />
      {children}
    </main>
  )
}
