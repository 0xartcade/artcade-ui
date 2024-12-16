"use client";

import { withAuth } from "@/lib/auth-context";
import { SubHeading, Paragraph } from "@/components/ui/typography";
import { motion } from "framer-motion";

function SettingsPage() {
  return (
    <div className="page-layout">
      <div className="page-layout-inner">
        {/* Introduction Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center space-y-6"
        >
          <div className="relative">
            <SubHeading className="font-orbitron text-xl text-white uppercase tracking-wider">
              Settings
            </SubHeading>
            <motion.div 
              layoutId="sectionUnderline"
              className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-artcade-aqua to-artcade-purple"
            />
          </div>
          <div className="max-w-2xl">
            <Paragraph className="artcade-text">
              Customize your 0xArtcade experience.
            </Paragraph>
          </div>
        </motion.div>

        {/* Settings Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          {/* Add settings content here */}
        </motion.div>
      </div>
    </div>
  );
}

export default withAuth(SettingsPage);
