import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground text-center md:text-left">
            <p>© {currentYear} AI Nav. All rights reserved.</p>
          </div>
          
          <div className="flex gap-6 text-sm font-medium text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">
              关于我们
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              免责声明
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              联系方式
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
