import Markdown from "react-markdown";
import { logs } from "./logs";
import {
  Caption,
  Heading,
  Paragraph,
  SubHeading,
  SubHeading2,
} from "@/components/ui/typography";

export default function DevLogs() {
  return (
    <div className="w-full flex flex-col items-center gap-y-10">
      {logs.map(({ date, title, author, content }) => (
        <div
          className="w-full max-w-2xl text-start border-2 border-border rounded-md"
          key={`${date}-${title}-${author}`}
        >
          <div className="w-full flex justify-between border-b-2 border-border p-4 items-end">
            <div>
              <SubHeading2>{title}</SubHeading2>
              <Caption>{author}</Caption>
            </div>
            <Caption>{date}</Caption>
          </div>
          <div className="px-4 pb-4 pt-2">
            <Markdown
              components={{
                h1: (props) => <Heading>{props.children}</Heading>,
                h2: (props) => <SubHeading>{props.children}</SubHeading>,
                h3: (props) => <SubHeading2>{props.children}</SubHeading2>,
                p: (props) => <Paragraph>{props.children}</Paragraph>,
                a: (props) => (
                  <a
                    {...props}
                    className="text-neon-blue hover:text-neon-purple transition-colors duration-200"
                  />
                ),
              }}
            >
              {content}
            </Markdown>
          </div>
        </div>
      ))}
    </div>
  );
}
