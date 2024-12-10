import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TwitterIcon, GithubIcon, MessagesSquare } from "lucide-react";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-t border-zinc-800 bg-zinc-950/50 backdrop-blur-sm mt-auto"
    >
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-zinc-400 text-sm">© 2024 Artcade. All rights reserved.</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <TwitterIcon className="w-5 h-5 text-zinc-400" />
            </Button>
            <Button variant="ghost" size="icon">
              <GithubIcon className="w-5 h-5 text-zinc-400" />
            </Button>
            <Button variant="ghost" size="icon">
              <MessagesSquare className="w-5 h-5 text-zinc-400" />
            </Button>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
