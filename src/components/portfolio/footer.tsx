
export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 border-t bg-background">
      <div className="container mx-auto px-6 text-center space-y-4">
        <h3 className="text-xl font-bold gradient-text">NİCAT HUSEYNLİ</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Passionate student developer dedicated to solving problems and building innovative technical solutions.
        </p>
        <div className="pt-4 border-t w-full max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground uppercase font-bold tracking-widest">
          <p>© {currentYear} Nicat Huseynli. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
