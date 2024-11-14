const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen w-full col-start-2">
      {children}
    </div>
  )
}

export default Layout