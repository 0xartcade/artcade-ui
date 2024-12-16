"use client";

import DevLogs from "./dev-logs";
import { SubHeading, Paragraph } from "@/components/ui/typography";
import { motion } from "framer-motion";

export default function DevLogsPage() {
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
            <SubHeading className="font-orbitron text-xl text-white uppercase tracking-widest">
              Development Logs
            </SubHeading>
            <motion.div
              layoutId="sectionUnderline"
              className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-artcade-aqua to-artcade-purple"
            />
          </div>
          <div className="max-w-2xl">
            <Paragraph className="artcade-text">
              Track our progress and latest updates.
            </Paragraph>
          </div>
        </motion.div>

        {/* Dev Logs Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <DevLogs />
        </motion.div>
      </div>
    </div>
  );
}
