import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { projects } from "@/data/projects";

interface CommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CommandMenu = ({ open, onOpenChange }: CommandMenuProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onOpenChange]);

  const run = (action: () => void) => {
    onOpenChange(false);
    setTimeout(action, 80);
  };

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>

        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => run(() => scrollTo("work"))}>
            Work
            <CommandShortcut>↓</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => run(() => scrollTo("info"))}>
            About
          </CommandItem>
          <CommandItem onSelect={() => run(() => scrollTo("contact"))}>
            Contact
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Projects">
          {projects.map((p) => (
            <CommandItem
              key={p.slug}
              onSelect={() => run(() => navigate(`/work/${p.slug}`))}
            >
              {p.title}
              <CommandShortcut>→</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Connect">
          <CommandItem
            onSelect={() => run(() => { window.location.href = "mailto:divitejokashyap@gmail.com"; })}
          >
            Send email
          </CommandItem>
          <CommandItem
            onSelect={() => run(() => window.open("https://www.linkedin.com/in/divitejokashyap/", "_blank"))}
          >
            LinkedIn ↗
          </CommandItem>
          <CommandItem
            onSelect={() => run(() => window.open("/resume.pdf", "_blank"))}
          >
            Download CV ↗
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default CommandMenu;
